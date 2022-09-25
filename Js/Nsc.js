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


// Validador-login
const validatorLogin = new FormValidator('Login', [{
    name: 'usuario',
    display: 'Usuario',
    rules: 'required'
},  
{
    name: 'password',
    display:'Password',
    rules: 'required| min_length[6]'
}, ], function(errors, event) {
    let formulario=document.getElementById("Login");
    if (errors.length > 0) {
        errors.forEach( i => {
            formulario.innerHTML+=`<div class="ERROR">${i.message}</div>`;
        });
        formulario.innerHTML=""
    }
});
validatorLogin.setMessage('required', 'Campo incompleto o incorrecto (%s ).');
