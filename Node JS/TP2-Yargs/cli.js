import yargs from "yargs";
import {hideBin} from "yargs/helpers"
import { suma , resta, multiplicacion, division} from "./math.js"
import { readFile } from 'fs/promises';

const argv = yargs(hideBin(process.argv))
    .command({
        command:"saludar",
        describe: "Saluda al usuario utilizando el nombre",
        builder: (yargs)=>
            yargs
                .option("nombre",{
                    alias: "n",
                    describe: "nombre a saludar",
                    demandOption: true,
                    type: "string"
                })
                .check((argv)=>{
                    if(argv.nombre === ""){
                        throw new Error ("El nombre no puede estar vacio")
                    }
                    return true
                }),
        handler:(argv)=>{
            console.log(`Te saludo desde la CLI, un gusto ${argv.nombre}`)
        }
    })
    .command({
        command: "despedir",
        describe:"Se despide al usuario utilizando el nombre",
        builder: (yargs)=>
            yargs
                .option("nombre",{
                    alias: "n",
                    describe: "nombre para despedirse",
                    demandOption: true,
                    type: "string"
                })
                .check((argv)=>{
                    if(argv.nombre === ""){
                        throw new Error ("El nombre no puede estar vacio")
                    }
                    return true
                }),
        handler: (argv)=>{
            console.log(`Gracias por utilizar CLI, nos vemos ${argv.nombre}`)
        }
    })
    .command({
        command: "calcular",
        describe: "Realiza operaciones matematicas",
        builder: (yargs)=>
            yargs
                .option("operacion",{
                    alias: "op",
                    describe: "operacion matematica",
                    demandOption: true,
                    type: "string",
                    choices: ["suma", "resta", "multiplicacion", "division"],
                    coerce: (op)=> op.toLowerCase()
                })
                .option("n1",{
                    describe: "primer numero",
                    demandOption:true,
                    type: "number"
                })
                .option("n2",{
                    describe: "segundo numero",
                    demandOption:true,
                    type: "number"
                })
                .check((argv)=>{
                    if(isNaN(argv.n1)|| isNaN(argv.n2)){
                        throw new Error ("n1 y n2 deben ser numeros")
                    }
                    if (argv.operacion === "division" && argv.n2 === 0){
                        throw new Error ("No se puede dividir por cero")
                    }
                    return true
                }),
        handler: (argv)=>{
            let resultado;
            switch (argv.operacion) {
                case "suma":
                    resultado = suma(argv.n1, argv.n2);
                    break;
                case "resta":
                    resultado = resta(argv.n1, argv.n2);
                    break;
                case "multiplicacion":
                    resultado = multiplicacion(argv.n1, argv.n2);
                    break;
                case "division":
                    resultado = division(argv.n1, argv.n2);
                    break;
                default:
                    console.log ("Tenes que elegir una operacion")
                    break;
            }

            console.log (`Resultado es: ${resultado}`)
        },
    })
    .demandCommand(1, "Debes proporcionar un comando")
    .command({
        command: "leer-json",
        describe: "Leer y mostrar contenido de archivo JSON",
        builder: (yargs)=>
            yargs
                .option("archivo",{
                    alias: "a",
                    describe: "archivo para leer",
                    demandOption: true,
                    type: "string"
                })
                .check ((argv)=>{
                    //endsWith si la terminacion no es json
                    if (!argv.archivo.endsWith(".json")){
                        throw new Error ("El archivo debe ser un archivo .json")
                    }
                    return true;
                }),
        handler: async(argv)=>{
            try{
                const contenido = await readFile (argv.archivo, "utf8");
                const data = JSON.parse(contenido);
                console.log("Contenido del archivo:\n", data);
            }catch (error){
                console.error("Error al leer el archivo", error.message);
            }
        },
    })
    .help()
    .parse();