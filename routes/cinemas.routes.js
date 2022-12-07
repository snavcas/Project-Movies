const express = require('express');
const Cinema = require ('../models/Cinemas.js');
const createError = require('../utils/errors/create-errors.js');

const cinemasRouter = express.Router();

//Endpoint GET all
cinemasRouter.get('/', async (req, res, next) => {
    try{
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    }catch (err) {
        next(err);
    }

});

//Endpoint POST create
cinemasRouter.post('/', async (req, res, next) =>{
    try{
        const newCinema = new Cinema({ ...req.body });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

//Endpoint DELETE
cinemasRouter.delete('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        await Cinema.findByIdAndDelete(id);
        return res.status(200).json('Cine eliminado correctamente');
    } catch (err) {
        next(err);
    }
});

//Endpoint Relacionar las películas con los cines con PUT add movie
cinemasRouter.put('/add-movie', async (req,res,next) => {
    try {
        const {cinemaId, movieId} = req.body;
        if (!cinemaId) {
           return next (createError('Se necesita un id de cine para poder añadir la película', 500));
        }
        if(!movieId) {
            return next (createError('Se necesita un id de película para añadirla', 500));
        }
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            {$push: { movies: movieId}},
            {new: true}
        );
        return res.status(200).json(updatedCinema);
    } catch (err) {
        next(err);
    }
}); 



module.exports = cinemasRouter;