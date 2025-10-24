import express from "express";
const app = express();
const PORT = 4000;

//Agregar un middleware que registre la fecha, el metodo, la url
const logHTTPMethod = (req, res, next)=>{
    console.log(`${new Date().toLocaleDateString()} - ${req.method} - ${req.url}`);
    next();
};

app.use(logHTTPMethod);
//Crear una ruta principal "/" que devuelva un mensaje de bienvenida.

app.get("/",(req, res)=>{
    res.status(200).send("Bienvenido a la API rest");
});

//Crear una ruta con parametro en la URL, por ejemplo "/saludo/:nombre"
//Debe devolver un saludo personalizado

app.get("/saludo/:nombre", (req,res)=>{
    const {nombre} = req.params;
    res.status(200).send(`Hola, ${nombre}`);
});

//Crear una ruta "/suma" que reciba num1 y num2 por query string y devuelva la suma
//Validar los parametros
//Ej: /suma?num1=10&num2=5

app.get("/suma",(req,res)=>{
    const {num1 , num2} = req.query;
    if(!num1 || !num2){
        res.status(400).send("El parametro num1 o num2 esta faltando");
    }

    const n1 = parseInt(num1);
    const n2 = parseInt(num2);

    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send("Ingrese numeros validos");
    }

    res.status(200).send(`El resultado de la suma es ${n1 + n2}`);
});

//Crear una ruta extra, por ejemplo "/fecha", que devuelva la fecha actual

app.get("/fecha", (req,res)=>{
    res.status(200).send(`Hoy es ${new Date().toLocaleDateString()}`)
});

//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});