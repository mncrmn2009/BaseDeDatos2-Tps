const fs = require ("fs");
const fecha = new Date();

const logFile = "log.txt";

fs.writeFile (logFile,`${fecha} : Inicio del programa`,(err)=>{
    if (err){
        return console.error("Error: ", err);
    }
    console.log ("Archivo escrito");
})
setTimeout(()=> {
    fs.appendFile(logFile,`\n${fecha} : Ejecutando tareas`,(err)=>{
        if (err) return console.error("Error al escribir",err);
    console.log("Tarea agregada");
});
}, 5000);


setTimeout(()=> {
    fs.appendFile(logFile,`\n${fecha} : Tarea Finalizada`,(err)=>{
    if (err) return console.error("Error al escribir",err);
    console.log("Tarea agregada");
});
}, 5000);
