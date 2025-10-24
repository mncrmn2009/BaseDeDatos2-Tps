import mongoose from "mongoose";

const libroModel = new mongoose.Schema(
    {
        titulo:{type:String, required:true},
        paginas:{type:Number, required:true},
        categorias:{type:[String], required:true},
        author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true }
    },
    {
        collection:"Libro"
    }
)

export const libro = mongoose.model("Libro",libroModel)