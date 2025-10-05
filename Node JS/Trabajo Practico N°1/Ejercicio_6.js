const fs=require("fs");
if(!fs.existsSync("logs")){
    try{
        fs.mkdirSync("logs");
        console.log("Carpeta Creada");
    }catch(err){
        console.error("Error al crearla:", err);
    }
}

function agregarLogs (){
    const fecha = new Date().toLocaleString();
    const mensaje = `[${fecha}]- Ejecucion exitosa\n`;

    try{
        fs.appendFileSync("logs/app.log",mensaje);
    }catch(err){
        console.error("Error al escribir:", err);
    }

}
function mostrarUltimos5 (){
    try{
        const contenido= fs.readFileSync("logs/app.log","utf8");
        const lineas = contenido.trim().split("\n");
        const ultimas5 = lineas.slice(-5);
        ultimas5.forEach(linea => console.log(linea));
    }catch(err){
        console.error("Error al leer:", err);
    }
}
agregarLogs();
mostrarUltimos5();




/*
Desarrollar un programa en Node.js que cree un directorio llamado `logs` si no existe y dentro de él cree un
 archivo `app.log`.

1. Cada vez que el programa se ejecute, agregar al archivo `app.log` una línea con la fecha, hora y un mensaje de 
'Ejecución exitosa'.
2. Implementar una función que permita leer el archivo `app.log` y mostrar en consola las últimas 5 ejecuciones 
registradas.
const origen = process.argv[2];
const destino = process.argv[3];


  // 3. APPENDFILE
// ---------------------------

// AsÃ­ncrono
fs.appendFile("nuevo.txt", "\nTexto agregado", (err) => {
  if (err) return console.error("Error agregando:", err);
  console.log("Texto agregado (async)");
});

// SincrÃ³nico
try {
  fs.appendFileSync("nuevo-sync.txt", "\nTexto agregado sincronico");
  console.log("Texto agregado (sync)");
} catch (err) {
  console.error("Error agregando:", err);
}*/