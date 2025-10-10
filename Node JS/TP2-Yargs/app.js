import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config } from "./config.js";

// const argv = yargs(hideBin(process.argv))
//   .option("nombre", {
//     alias: "n",
//     describe: "Tu nombre",
//     demandOption: true,
//     type: "string"
//   })
//   .option("edad", {
//     alias: "e",
//     describe: "Tu edad",
//     demandOption: true,
//     type: "number"
//   })
//   .check((argv)=>{
//     if (!argv.nombre){
//         console.error("El nombre es obligatorio");
//     }
//     if (argv.edad <= 0){
//         console.error("La edad debe ser mayor que 0");
//     }
//     return true;
//   })
//   .parse();

// console.log(`Hola ${argv.nombre}, tenes ${argv.edad} años.`)

const argv = yargs(hideBin(process.argv)) 
  .option("saludo", { 
    alias: "s", 
    describe: "Nombre a saludar", 
    demandOption: true, 
    type: "string" }) 
    .help() 
    .argv;

console.log(`Servidor corriendo en el puerto ${config.port} (modo ${config.mode}): Hola ${argv.saludo}!`);