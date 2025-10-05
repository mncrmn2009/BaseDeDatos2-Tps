const fs = require("fs");
try{
    fs.writeFileSync("contactos.json",JSON.stringify([{
        "nombre": "Juan Perez",
        "telefono": "1234556",
        "email": "juan@ejemplo.com"
    }],null,2));
} catch (err){
    console.error("Error al crear el archivo: ", err);
}
function agregarContacto(nombre,telefono,email){
    try{
        const data = fs.readFileSync("contactos.json", "utf8");
        const contactos = JSON.parse(data);
        contactos.push({nombre, telefono, email});
        fs.writeFileSync("contactos.json", JSON.stringify(contactos, null, 2));
        console.log (`Contacto ${nombre} agregado`);
    }catch (err){
        console.error("Error al agregar: ", err);
    }
}
function mostrarContactos(){
    try{
        const data = fs.readFileSync("contactos.json","utf8");
        const contactos = JSON.parse(data);
        console.log("Lista de contactos:");
        contactos.forEach(contacto => {
            console.log(`Nombre: ${contacto.nombre}`);
            console.log(`Telefono: ${contacto.telefono}`);
            console.log(`Email: ${contacto.email}`);
            console.log(`------------`);
        });
    }catch(err){
        console.error("Error al mostrar: ", err);
    }
}
function eliminarContacto(nombre){
    try{
        const data = fs.readFileSync("contactos.json","utf8");
        let contactos = JSON.parse(data);
        const inicialLength= contactos.length;
        contactos = contactos.filter(contacto => contacto.nombre !== nombre);
        if(contactos.length < inicialLength){
            fs.writeFileSync("contactos.json", JSON.stringify(contactos,null,2));
            console.log(`Contacto ${nombre} eliminado`);
        }else{
            console.log(`Contacto ${nombre} no encontrado`);
        }
    }catch(err){
        console.error("Error al eliminar: ", err);
    }
}
agregarContacto('Carlos López', '987-654-3210', 'carlos@example.com');
mostrarContactos();
eliminarContacto('Juan Perez');
mostrarContactos();