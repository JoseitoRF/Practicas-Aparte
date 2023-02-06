"use strict";

let contador=0;

const procesaEntrada=(entrada)=>{
    if(entrada[0].isIntersecting) Lectura(2);
}

const opciones={
    threshold:[0.75]
}
const observador=new IntersectionObserver(procesaEntrada,opciones);

const fragmento=document.createDocumentFragment();

const Lectura=async(num)=>{
    const consulta=await fetch("https://reqres.in/api/users");
    const res=await consulta.json();
    const consulta2= await fetch("prueba.txt");
    const res2= await consulta2.json();
    for(let i=0;i<num;i++){
        if(res.data[contador]!=undefined){
            let nombreCompleto=`${res.data[contador].first_name} ${res.data[contador].last_name}`
            let imgPerfil=res.data[contador].avatar;
            const nuevaPublicacion=creaElementos(nombreCompleto,imgPerfil,res2.contenido[contador].contenido)
            fragmento.appendChild(nuevaPublicacion);
            contador++;
            if( i==num-1) observador.observe(nuevaPublicacion);
        }
        else {
            if (document.querySelector(".Actividades").lastElementChild.id!="noMas"){
                let noMas=document.createElement("H3");
                noMas.textContent="No hay mas publicaciones";
                noMas.id="noMas";
                fragmento.appendChild(noMas);
                break;
            }
        }
    }
    document.querySelector(".Actividades").appendChild(fragmento);
}

const creaElementos=(nombre,img,contenido)=>{
    const container=document.createElement("DIV");
    const encabezado=document.createElement("DIV");
    const contenidos=document.createElement("DIV");
    const comentarios=document.createElement("DIV");

    const img_perfil=document.createElement("DIV");

    const IMG=document.createElement("IMG");
    const Nombre=document.createElement("H3");
    const comentario=document.createElement("INPUT");
    const boton=document.createElement("INPUT");

    IMG.src=`${img}`
    img_perfil.appendChild(IMG)
    img_perfil.classList.add("img_Perfil")
    Nombre.textContent=nombre;

    encabezado.appendChild(img_perfil)
    encabezado.appendChild(Nombre)
    encabezado.classList.add("encabezado")

    contenidos.textContent=contenido;
    contenidos.classList.add("contenido")

    comentarios.appendChild(comentario)
    comentarios.classList.add("comentarios")
    boton.type="submit";
    boton.value="comentar";
    comentarios.appendChild(boton)

    container.appendChild(encabezado)
    container.appendChild(contenidos);
    container.appendChild(comentarios)
    container.classList.add("publicacion")

    return container;
}
Lectura(2)