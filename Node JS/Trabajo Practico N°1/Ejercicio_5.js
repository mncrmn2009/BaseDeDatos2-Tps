const fs= require("fs");
const origen = process.argv[2];
const destino = process.argv[3];

if (!origen || !destino) {
    console.error("Debes especificar un archivo de origen y uno de destino.");
    process.exit(1);
}

function copiadoOrigenDestino (origen, destino){
    try{
        if(fs.existsSync(origen)){
            const Aorigen= fs.readFileSync(origen,"utf8");
            fs.writeFileSync(destino,Aorigen);

            console.log("Copiado exitoso");
        }else{
            console.error("No existe el archivo");
        }
    }catch(err){
        console.error("Error al verificar: ", err);
    }
}
copiadoOrigenDestino(origen,destino);
