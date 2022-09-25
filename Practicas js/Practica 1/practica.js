"use strict";

let zona=document.querySelector(".zona-entrega");

const EstiloCss=(elemento,color)=>{
    elemento.style.color=color;
    elemento.style.border=`6px dashed ${color}`;

}
zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    EstiloCss(e.target,"#000")
})
zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    EstiloCss(e.target,"#777")
})
zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    let archivo=e.dataTransfer.files[0];
    let lector=new FileReader();
    lector.readAsDataURL(archivo)
    let url=URL.createObjectURL(archivo)
    lector.addEventListener("progress",(e)=>{
        let carga=Math.round(e.loaded/archivo.size*100)
        zona.textContent=`${carga}%`
        
        document.querySelector(".barra").style.width=`${carga}%`
    })
    lector.addEventListener("load",()=>{
        let fragmento=document.createDocumentFragment()
        let div=document.createElement("DIV")
        let img=document.createElement("IMG")
        div.classList.add("imagenes");
        img.setAttribute("src",url)
        div.appendChild(img)
        fragmento.appendChild(div)
        document.querySelector(".grid-container").appendChild(fragmento)
    })
})

