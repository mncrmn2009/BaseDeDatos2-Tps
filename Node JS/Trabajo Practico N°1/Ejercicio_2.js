const fs = require("fs");
let archivo = "datos.txt";
let fecha = new Date();
function formatofecha (){
    let anio = fecha.getFullYear();
    let mes = String(fecha.getMonth() + 1).padStart(2, '0');
    let dia = String(fecha.getDate()).padStart(2, '0');
    let hora = String(fecha.getHours()).padStart(2, '0');
    let minutos = String(fecha.getMinutes()).padStart(2, '0');;
    let seg = String(fecha.getSeconds()).padStart(2, '0');

    return `\n[${anio} - ${mes} - ${dia} - ${hora}:${minutos}:${seg}]`
}
try{
    fs.writeFileSync(archivo,`\nNombre: Nicolas\nEdad: 32\nCarrera: Tec. Programacion`);
    console.log("Archivo creado");
} catch (err){
    console.error("Error escribiendo", err);
}

fs.readFile(archivo,"utf8", (err, data)=>{
    if (err) return console.error("Error leyendo:", err);
  console.log("Contenido:", data);
})

try{
    fs.appendFileSync(archivo,formatofecha());
    console.log("Agregado");
}catch (err){
    console.error("Error al agregar", err);
}


fs.rename(archivo, "informacion.txt", (err)=>{
    if (err) {
    return console.error('Error al renombrar:', err);
  }
  console.log('Archivo renombrado con éxito');
})

setTimeout(()=>{
    fs.unlink("informacion.txt", (err) => {
  if (err) return console.error("Error borrando:", err);
  console.log("Archivo eliminado");
});
}, 10000);