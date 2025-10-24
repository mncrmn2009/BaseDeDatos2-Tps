import mongoose from "mongoose";

const autorModel = new mongoose.Schema(
    {
        nombre:{type:String, required:true},
        fecha_nacimiento:{type:Number, required:true}
    },
    {
        collection:"Autor"
    }
)

export const Autor = mongoose.model("Autor",autorModel)