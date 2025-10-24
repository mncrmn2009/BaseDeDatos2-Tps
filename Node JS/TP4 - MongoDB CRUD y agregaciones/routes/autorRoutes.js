import express from "express";
import {Autor} from "../models/autor.js";

const autorRoutes = express.Router()

autorRoutes.get("/", async(req, res)=>{
    try{
        const autores = await Autor.find()
        if(autores.length === 0){
            return res.status(204).json([])
        }
        res.status(200).json(autores)
    } catch (error){
        res.status(400).json ({message: `Error al encontrar ${error}`})
    }
});

export default autorRoutes;