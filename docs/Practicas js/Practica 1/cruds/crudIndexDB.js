"use strict";

// let zona=document.querySelector(".zona-entrega");

// const EstiloCss=(elemento,color)=>{
//     elemento.style.color=color;
//     elemento.style.border=`6px dashed ${color}`;

// }
// zona.addEventListener("dragover",(e)=>{
//     e.preventDefault();
//     EstiloCss(e.target,"#000")
// })
// zona.addEventListener("dragleave",(e)=>{
//     e.preventDefault();
//     EstiloCss(e.target,"#777")
// })
// zona.addEventListener("drop",(e)=>{
//     e.preventDefault();
//     let archivo=e.dataTransfer.files[0];
//     let lector=new FileReader();
//     lector.readAsDataURL(archivo)
//     let url=URL.createObjectURL(archivo)
//     lector.addEventListener("progress",(e)=>{
//         let carga=Math.round(e.loaded/archivo.size*100)
//         zona.textContent=`${carga}%`
        
//         document.querySelector(".barra").style.width=`${carga}%`
//     })
//     lector.addEventListener("load",()=>{
//         let fragmento=document.createDocumentFragment()
//         let div=document.createElement("DIV")
//         let img=document.createElement("IMG")
//         div.classList.add("imagenes");
//         img.setAttribute("src",url)
//         div.appendChild(img)
//         fragmento.appendChild(div)
//         document.querySelector(".grid-container").appendChild(fragmento)
//     })
// })

let Add=document.getElementById("ADD")
let plantilla=document.querySelector(".Actividades");

const IDB_Request=indexedDB.open("db_jose",1);

IDB_Request.addEventListener("upgradeneeded",()=>{
    const res=IDB_Request.result;
    res.createObjectStore("nombres",{
        autoIncrement:true
    })
})

IDB_Request.addEventListener("success",()=>{
    LeerActividad()
})

const EnviarActividad=(valor)=>{
    if(valor.textLength >0){
        TransaccionIDB("readwrite").add({nombre:valor.value})
        IDB_Request.result.transaction("nombres","readwrite").addEventListener("complete",()=>{
            plantilla.innerHTML=""
            LeerActividad()
        })
    }else plantilla.innerHTML+='<div class="Actividad" style="background-color: #e558">Campo vacio por favor ingrese</div>'

}

const fragmento=document.createDocumentFragment();
const LeerActividad=()=>{
    const lectura=TransaccionIDB("readonly").openCursor()

    lectura.addEventListener("success",()=>{
        if(lectura.result){
            let id=lectura.result.key;
            let valor =lectura.result.value.nombre;
            fragmento.appendChild(pintarActividad(id,valor))
            lectura.result.continue()
        }else plantilla.appendChild(fragmento)
    })

}
const EliminarActividad=(id)=>{
    TransaccionIDB("readwrite").delete(id)
}

const ModificarActividad=(id,actividad)=>{
    TransaccionIDB("readwrite").put({nombre:actividad},id);
}
const pintarActividad=(id,valor)=>{
    const div1=document.createElement("DIV")
    const div2=document.createElement("DIV")
    const i1=document.createElement("I")
    const i2=document.createElement("I")
    const i3=document.createElement("I")

    div1.classList.add("Actividad");
    div2.classList.add("botones");

    i1.setAttribute("id","lapiz")
    i1.classList.add("fas");
    i1.classList.add("fa-pencil");

    i2.setAttribute("id","basura")
    i2.classList.add("fas");
    i2.classList.add("fa-trash");

    i3.setAttribute("id","visto")
    i3.classList.add("fas");
    i3.classList.add("fa-check");

    div2.appendChild(i1)
    div2.appendChild(i2)

    div2.appendChild(i3)
    div1.textContent=valor;
    div1.appendChild(div2)

    i1.addEventListener("click",(e)=>{
        div1.setAttribute("contenteditable","true")
        div1.setAttribute("spellcheck","false")
    })

    i2.addEventListener("click",(e)=>{
        EliminarActividad(id);
        plantilla.innerHTML=""
        LeerActividad()
    })

    i3.addEventListener("click",(e)=>{
        div1.removeAttribute("contenteditable")
        ModificarActividad(id,div1.textContent)
        plantilla.innerHTML=""
        LeerActividad()
    })
    return div1;
}

const TransaccionIDB=(mode)=>{
    const res=IDB_Request.result;
    const transaccion=res.transaction("nombres",mode)
    const transaccionFinalizada=transaccion.objectStore("nombres")
    return transaccionFinalizada;
}
Add.addEventListener("click",(e)=>{
    e.preventDefault()
    let valorActividades=document.getElementById("Actividad")
    console.log(valorActividades)
    EnviarActividad(valorActividades);
})
