"use strict"

let boton=document.querySelector("#boton");
let input=document.querySelector("#Actividad");
let elementos=document.querySelector(".elementos");
let tarea;

let p=[{}];
let band=false

const pedirDatos=()=>{
    let res=JSON.parse(localStorage.getItem("Actividad")) ;
    p=res;
    if (p!==null){
        for (let i in p) {
            tarea=document.getElementsByClassName("tareas")
            elementos.innerHTML+=`
            <div class="tareas" contenteditable="false">
                ${p[i].valor}
                <div class="iconos">
                    <i class="lapiz fa-solid fa-pencil"></i>
                    <i class="basura fa-solid fa-trash-can"></i>
                    <i class="check fa-solid fa-check"></i>
                </div>
            </div>`;
            if (p[i].chequeo==true) tarea[i].style.background="#9907"
        }
    }else p=[];

}

addEventListener("DOMContentLoaded",()=>{
    pedirDatos()
    let Basura=document.getElementsByClassName("basura");
    let Check=document.getElementsByClassName("check");
    let lapiz=document.getElementsByClassName("lapiz");

    console.log(Check)
    for (let i=0; i < Check.length;i++) { 
        Check[i].addEventListener("click",(e)=>{
            e.preventDefault()
            p[i].chequeo=true; 
            localStorage.setItem("Actividad",JSON.stringify(p));
            elementos.innerHTML=""
            pedirDatos()
        })
        Basura[i].addEventListener("click",(e)=>{
            e.preventDefault()
            p.splice(i,1);
            localStorage.setItem("Actividad",JSON.stringify(p));
            elementos.innerHTML=""
            pedirDatos()
        })
        lapiz[i].addEventListener("click",(e)=>{
            e.preventDefault()
            if (tarea[i].contentEditable == "true") {
                tarea[i].contentEditable = "false";
            } else {
                tarea[i].contentEditable = "true";
            }
            localStorage.setItem("Actividad",JSON.stringify(p));
            elementos.innerHTML=""
            pedirDatos()
        })
    }
})

boton.addEventListener("click",(e)=>{ 
    e.preventDefault();
    p.push(
        {
        valor:input.value,
        chequeo:band
        }
    )
    localStorage.setItem("Actividad",JSON.stringify(p));
    input.value="";
    elementos.innerHTML=""
    pedirDatos();
})
