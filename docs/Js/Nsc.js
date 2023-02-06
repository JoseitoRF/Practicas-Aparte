// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvrIm_l87TWMNs12-pn-90zi0XAa7mDCE",
    authDomain: "crud1-c1515.firebaseapp.com",
    projectId: "crud1-c1515",
    storageBucket: "crud1-c1515.appspot.com",
    messagingSenderId: "249888172008",
    appId: "1:249888172008:web:c6fa2f10d1d37b55ae265d",
    measurementId: "G-JZV4WCXRLB"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth()
const store=firebase.firestore();

const email=document.getElementById("email");
const password=document.getElementById("password");
let band,band2;
let Campos=document.getElementById("alerta");
const fragmento=document.createDocumentFragment();

// icono-menu
const toggleMenu=()=>{
    for(let i=0;i<2;i++){
        boton[i].addEventListener("click",  ()=>{
            if( menu[0].classList.contains("desaparece") ){
                menu[0].classList.replace("desaparece","fa-windows");
            }else{
                menu[0].classList.replace("fa-windows","desaparece");
            }
            encabezado.classList.toggle("nav__Encabezado2")
            menu[1].classList.toggle("desaparece")
            menu[1].style.animation="menu 0.1s "
            Sombra.classList.toggle("desaparece")
        })
    }
}
const observador=()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            console.log(user.uid)
            leerDatos(user.uid)
        }else{
            alert("logueate")
        }
    })
}
const leerDatos=(usuarioId)=>{
    store.collection("Usuario").doc(`${usuarioId}`).get()
    .then(doc=>{
        if(doc.exists){
            console.log(doc.data())
            nombre.textContent=doc.data().Nombre +" "+ doc.data().Apellido
        }else{
            console.log("vacio")
        }
    }).catch(e=>{
        console.log(e)
    })
}

const registrarUsuario= async (nombre,apellido,telefono,usuario)=>{
   try{
    let usuarioNuevo=await auth.createUserWithEmailAndPassword (email.value,password.value)
    console.log(usuarioNuevo.user.uid)
    await store.collection("Usuario").doc(`${usuarioNuevo.user.uid}`).set({
            Nombre:nombre,
            Apellido:apellido,
            Telefono:telefono,
            Usuario:usuario,
            Contraseña:password.value,
            Email:email.value
        })
        band=false
   }catch{
    console.log(e.code)
    band=true;
    Campos.innerHTML=" ";
    const alerta=document.createElement("DIV");
    alerta.classList.add("ERROR")
    alerta.textContent=`${e.code}`;
    fragmento.appendChild(alerta)
    Campos.appendChild(fragmento)
   }
    email.value="";
    password.value="";
}
const ingresarUsuario= async()=>{
    let usuario

    await auth.signInWithEmailAndPassword(email.value,password.value)
    .then(res=>{
        console.log(res)
        usuario=res.user.uid 
        observador()
        band2=false
    }).catch(e=>{
        console.log(e.code)
        band2=true
        Campos.innerHTML=" ";
        const alerta=document.createElement("DIV");
        alerta.classList.add("ERROR")
        alerta.textContent=`${e.code}`;
        fragmento.appendChild(alerta)
        Campos.appendChild(fragmento)
    })
    email.value="";
    password.value="";
}
const cerraLogin=()=>{
    auth.signOut()
    .then(res=>{
        location.href="Ingresar.html"
    }).catch(e=>{
        console.log(e.code)
    })
}
// Validador-login
const  validatorLogin = new FormValidator('Login', [
{
    name: 'nombre',
    display: 'Nombre',
    rules: 'required'
},
{
    name: 'apellido',
    display: 'Apellido',
    rules: 'required'
},
{
    name: 'telefono',
    display: 'Telefono',
    rules: 'required| min_length[11]'
},
{
    name: 'email',
    display: 'Correo',
    rules: 'required| min_length[17]'
},
{
    name: 'usuario',
    display: 'Usuario',
    rules: 'required'
},
{
    name: 'password',
    display:'Password',
    rules: 'required| min_length[6]'
}, ], async function(errors, event) {
    Campos.innerHTML=" ";
    if (errors.length > 0) {
        errors.forEach( i => {
            const alerta=document.createElement("DIV");
            alerta.classList.add("ERROR")
            alerta.textContent=i.message;
            fragmento.appendChild(alerta)
        });
    }
    Campos.appendChild(fragmento)
    event.preventDefault()

    if(!(validatorLogin.errors.length>0)){
        if(location.pathname.split("/")[2]=="Registrar.html"){
            alert("FDG")
            await registrarUsuario(nombre.value,apellido.value,telefono.value,usuario.value)
            console.log(band)
            if(band!=true) await (location.href="Ingresar.html");

        }else if(location.pathname.split("/")[2]=="Ingresar.html"){
            await ingresarUsuario()
            if(band2!=true) await (location.href="login-menu.html");
        }
    }
});
validatorLogin.setMessage('required', 'Campo incompleto o incorrecto (%s ).');


