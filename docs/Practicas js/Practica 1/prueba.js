
// service-worker.js
self.addEventListener("install", (event)=>{
   caches.open("b1").then(cache=>{
      cache.add("practica.html")
   })
})
self.addEventListener("activate", (event)=>{
   console.log("jola")
   caches.keys().then(res=>{
      return Promise.all(res.map(key=>{
        if(key!=="b1"){
          return caches.delete(key)
        }
      }))
    })
})
self.addEventListener("fetch",(e)=>{
   console.log("Bsucando")
   e.responseWith(
      caches.match(e.request).then(res=>{
         if(res){
            return res
         }
         return fetch(e.request)
      })

   )
})
// self.addEventListener("message",(e)=>{
//    console.log(e.data);
//    e.source.postMessage("tamos bien")
// })
