"use strict";

// main.js
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("prueba.js")

  // console.log(navigator.serviceWorker)

  navigator.serviceWorker.ready.then((registration) => {
      // console.log(registration)
      registration.active.postMessage("Hi service worker");
    });

  navigator.serviceWorker.addEventListener("message", (e) => {
      // event is a MessageEvent object
      console.log(`The service worker sent me a message: ${e.data}`);
  });
  
}else{
  console.log("noo")
}

const obtenerFecha=(dias)=>{
  let fecha=new Date();
  let  newFecha=(fecha.setTime(fecha.getTime()+dias*1000*60*60*24));
  return  new Date(newFecha).toUTCString();
}
const crearCookie=(valor,exp)=>{
  let time=obtenerFecha(exp);
  document.cookie=`${valor};expires=${time}`
}

const leerCookie=(nameCookie)=>{
  let cookies=document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie=cookies[i].trim();
    if(cookie.startsWith(nameCookie)){
        return cookie.split("=")[1];
    }
  }
  return "No se encontro la cookie"
  
}
const borrarCookie=(nameCookie)=>{
  let cookies=document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      let cookie=cookies[i].trim()
      if( cookie.startsWith(nameCookie)){
        return document.cookie=`${cookie};max-age=0`
      }
  }
  return "No se encontro la cookie"
}

console.log(obtenerFecha(2))


