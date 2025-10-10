require("dotenv").config();

const port= process.env.port;
const mode= process.env.mode;

console.log(`Servidor iniciado en el puerto ${port} en modo ${mode}`);

//--env-file=.env