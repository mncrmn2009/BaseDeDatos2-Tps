import express from "express";
const app = express();
const PORT = 3000;

let contador = 0;
// Middleware global: contar cantidad de peticiones
// TODO: Crear un middleware "contarPeticiones" que escuche todas las peticiuones y vaya sumando 1 al contador
const cantPeticiones = (req, res, next)=>{
    contador ++;
    console.log('Petición recibida a:', req.url);

    console.log(contador);
    next();
}

app.use(cantPeticiones);

// Middleware local (a completar por el alumno)
// TODO: Crear un middleware "validarEdad" que lea req.query.edad
// y verifique que sea un número mayor o igual a 18.
// Si no cumple, responder con status 400 y mensaje "Acceso denegado".

const validarEdad = (req, res, next)=>{
  const edad = Number(req.query.edad);

  // validar que exista y sea número mayor o igual a 18
  if (!edad || isNaN(edad) || edad < 18) {
    return res.status(400).send('Acceso denegado');
  }

  next();
}

// TODO: Ruta principal '/'
app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a la API del TP N°2');
});

// TODO: Crear una ruta '/edad' que use el middleware "validarEdad"
// y devuelva "Acceso permitido" si la edad es válida.

app.get('/edad', validarEdad, (req, res) => {
  res.send('Acceso permitido');
});
// TODO: Crear una ruta '/producto/:id' que reciba un id numérico.
// Si el id no es un número, devolver error 400.
// Si es válido, devolver un mensaje con el id.

app.get('/producto/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('El ID debe ser un número');
  }

  res.send(`Producto con ID: ${id}`);
});


// TODO: Crear una ruta '/promedio' que reciba tres notas por query (n1, n2, n3)
// y devuelva el promedio.
// Si falta alguna nota o no son números, devolver error 400.

app.get('/promedio', (req, res) => {
  const { n1, n2, n3 } = req.query;
  const notas = [n1, n2, n3].map(Number);

  if (notas.some(n => isNaN(n))) {
    return res.status(400).send('Debe enviar tres notas numéricas válidas');
  }

  const promedio = (notas[0] + notas[1] + notas[2]) / 3;
  res.send(`El promedio es: ${promedio.toFixed(2)}`);
});

// TODO: Crear una ruta '/hora' que devuelva la hora actual del servidor.

app.get('/hora', (req, res) => {
  const horaActual = new Date().toLocaleTimeString();
  res.send(`Hora actual del servidor: ${horaActual}`);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
