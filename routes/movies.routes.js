const express = require("express");
const { restart } = require("nodemon");
const Movie = require("../models/Movies.js");
const createError = require('../utils/errors/create-errors.js');

const moviesRouter = express.Router();

//Endpoint GET getAll
moviesRouter.get("/", async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});

//Endpoint GET byId
moviesRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        if (movie) {
            return res.status(200).json(movie);
        } else {
           next(createError('No existe una pelicula con ese id', 404));
        }      
    } catch (err) {
        next(err);
    }
});

//Endpoint GET byTitle
moviesRouter.get('/title/:title', async (req, res, next) => {
    const title = req.params.title;
    try {
        const titleMovie = await Movie.find({title
        }, {
            title:1,
            _id:0 
        });
        if (title) {
            return res.status(200).json(titleMovie);
        } else {
           next(createError('No existe una pelicula con ese título', 404));
        }      
    } catch (err) {
        next(err);
    }
});

//Endpoint GET byGenre
moviesRouter.get('/genre/:genre', async (req, res) => {
	const genre = req.params.genre;

	try {
		const movieByGenre = await Movie.find({genre
        }, {
            title:1,
            genre:1,
            _id:0 
        });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//Endpoint GET year
moviesRouter.get("/year/:year", async (req, res, next) => {
    const year = req.params.year;
    try {
        const movies = await Movie.find({
            year: { $gt: year } 
        }, {
            title:1,
            year:1,
            _id:0     
        });
        return res.status(200).json(movies);    
    } catch (err) {
        next(err);
    }
});

//Endpoint POST create
moviesRouter.post('/', async (req, res, next) =>{
    try{
        const newMovie = new Movie({ ...req.body });
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (err) {
        next(err);
    }
});

//Endpoint PUT update
moviesRouter.put('/:id', async (req,res,next) => {
    try {
        const id = req.params.id;
        const modifiedMovie = new Movie({ ...req.body });
        modifiedMovie._id = id;
        const movieUpdated = await Movie.findByIdAndUpdate(
            id,
            modifiedMovie,
            { new: true }
        );
        return res.status(200).json(movieUpdated);
    } catch (err) {
        next(err);
    }
});


//Endpoint DELETE
moviesRouter.delete('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Película eliminada correctamente');
    } catch (err) {
        next(err);
    }
});







module.exports = moviesRouter;