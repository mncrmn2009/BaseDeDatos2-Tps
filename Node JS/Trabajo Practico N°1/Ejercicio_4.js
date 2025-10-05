const fs = require("fs");
const archivo = process.argv[2];
const palabra = process.argv[3];

function contadorPalabras (archivo, palabra){
    try{
        const data = fs.readFileSync(archivo, "utf8");
        let contador = 0;

        const palabras = data.toLowerCase().split(" ");

        for(let i=0; i < palabras.length; i++){
            const palabraSinSignos = palabras[i].replace(/[.,;!?¿¡]/g, "");
            if (palabraSinSignos === palabra.toLowerCase()){
                contador ++;
            }
        }
        console.log(`La cantidad de veces que aparece la palabra ${palabra} es de ${contador}`);
    }catch(err){
        console.error("Error algo paso", err);
    }
}
contadorPalabras(archivo,palabra);