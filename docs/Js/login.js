let inicio=document.getElementById("Inicio");
let clases=document.getElementById("Clases");
let horario=document.getElementById("Horario");
let administracion=document.getElementById("Administracion");
let salir=document.getElementById("SALIR");

let contenido= document.querySelector(".container__contenido");


let nombre=document.querySelector(".name");

observador()

inicio.addEventListener("click", ()=>{
    let div=document.createElement("DIV");
    let div2=document.createElement("DIV");
    let fragmento=document.createDocumentFragment();
    let fragmento2=document.createDocumentFragment();

    let pendientes=0;
    
    contenido.innerHTML=`<h2>Hola, ${ nombre.textContent}</h2>`;
    if(pendientes==0){
        div.innerHTML=`<h5>Pendiente</h5>
        <p class="no-focus">No tienes tareas asignadas</p>`;
    }
    // else{

    // }
    div2.innerHTML=`<h5>Cronograma</h5>
    <div class=" cajas-azul-claro no-focus">
        <a href="#"> 
            <label>20 min</label>
            Reincripcion Octubre 2021-2022
            <i class="fas fa-arrow-right"></i>
        </a>
    </div>`;
    div.classList.add("seccion");
    div2.classList.add("seccion");
    fragmento.appendChild(div);
    fragmento2.appendChild(div2);

    contenido.appendChild(fragmento);
    contenido.appendChild(fragmento2);
    
})
salir.addEventListener("click",()=>{
    cerraLogin()
})