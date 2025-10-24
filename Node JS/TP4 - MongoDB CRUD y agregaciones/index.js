import express from 'express';
import mongoose from 'mongoose';
import { Autor } from './models/autor.js';
import { Libro } from './models/libro.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tienda_libros')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


// CRUD AUTORES


app.post('/autores', async (req, res) => {
  try {
    const autor = await Autor.create(req.body);
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/autores', async (req, res) => {
  const autores = await Autor.find();
  res.json(autores);
});

app.put('/autores/:id', async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/autores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Libro.deleteMany({ author_id: id });
    await Autor.findByIdAndDelete(id);
    res.json({ mensaje: 'Autor y sus libros eliminados' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// CRUD LIBROS


app.post('/libros', async (req, res) => {
  try {
    const libro = await Libro.create(req.body);
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/libros', async (req, res) => {
  const libros = await Libro.find().populate('author_id', 'nombre');
  res.json(libros);
});

app.put('/libros/:id', async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/libros/:id', async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// AGREGACIONES


app.get('/stats/promedio-paginas', async (req, res) => {
  const resultado = await Libro.aggregate([
    { $group: { _id: "$author_id", promedio_paginas: { $avg: "$paginas" } } },
    {
      $lookup: {
        from: "autors",
        localField: "_id",
        foreignField: "_id",
        as: "autor"
      }
    },
    { $unwind: "$autor" },
    {
      $project: {
        _id: 0,
        autor: "$autor.nombre",
        promedio_paginas: { $round: ["$promedio_paginas", 2] }
      }
    }
  ]);
  res.json(resultado);
});

app.get('/stats/libros-por-autor', async (req, res) => {
  const resultado = await Libro.aggregate([
    { $group: { _id: "$author_id", cantidad_libros: { $sum: 1 } } },
    {
      $lookup: {
        from: "autors",
        localField: "_id",
        foreignField: "_id",
        as: "autor"
      }
    },
    { $unwind: "$autor" },
    {
      $project: {
        _id: 0,
        autor: "$autor.nombre",
        cantidad_libros: 1
      }
    }
  ]);
  res.json(resultado);
});


// Servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
