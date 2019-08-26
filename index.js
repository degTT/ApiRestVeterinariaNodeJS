const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
//const {username , password} = functions.config().mongo;
const mongooseConfig = { useNewUrlParser: true };
//const mongoUri = `mongodb+srv://${username}:${password}@cluster0-y4ofz.mongodb.net/veterinaria?retryWrites=true&w=majority`;
const mongoUri = `mongodb+srv://Dbravo:diego1995@cluster0-y4ofz.mongodb.net/veterinaria?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, mongooseConfig);

const app = express();
const Pets = require('./Pets');

const createServer = () => {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/pets',async (request, response) => {
        const result = await  Pets.find({}).exec();
       response.send(result);
    });

    app.post('/pets', async (request, response) => {
        const { body } = request;
        const pet = new Pets(JSON.parse(body));
        await  pet.save();
        response.send(pet._id);
    });

    app.get('/pets/:id/dar-alta', async (request, response) => {
       const { id } = request.params;
       await Pets.deleteOne({_id: id}).exec();
       response.sendStatus(204);
    });
    return app;
};

 exports.api = functions.https.onRequest(createServer());