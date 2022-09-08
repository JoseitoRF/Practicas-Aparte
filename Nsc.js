let boton=document.getElementsByClassName("boton");
let menu=document.getElementsByClassName("menu");
let encabezado= document.querySelector(".nav__Encabezado");

toggleMenu=()=>{
    for(let i=0;i<2;i++){
        boton[i].addEventListener("click",  ()=>{
            if( menu[0].classList.contains("desaparece") ){
                menu[0].classList.replace("desaparece","fa-windows");
            }else{
                menu[0].classList.replace("fa-windows","desaparece");
            }
            encabezado.classList.toggle("nav__Encabezado2")
            menu[1].classList.toggle("desaparece")
        })
    }
}
toggleMenu()