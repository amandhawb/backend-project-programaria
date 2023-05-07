const express = require("express");
const router = express.Router();
const app = express();
const port = 3333;
const cors = require('cors');

const connectDb = require('./dataBaseConfigs');
const Woman = require('./womanModel');

app.use(express.json());
app.use(cors());
connectDb();

// GET
async function showWomen(request, response) {
    try {
        const womenFromDb = await Woman.find()

        response.json(womenFromDb);
    } catch(error) {
        console.log(error);
    }
}

// POST
async function createWomen(request, response) {
    const newWomen = new Woman({
        name: request.body.name,
        image: request.body.image,
        minibio: request.body.minibio,
        quote: request.body.quote
    });

    try {
        const womanCreated = await newWomen.save();

        response.status(201).json(womanCreated);
    } catch(error) {
        console.log(error);
    }
}

// PATCH
async function editWoman(request, response) {
    try{
        const womanFound = await Woman.findById(request.params.id);

    if (request.body.name) {
        womanFound.name = request.body.name
    }

    if (request.body.image) {
        womanFound.image = request.body.image
    }

    if (request.body.minibio) {
        womanFound.minibio = request.body.minibio
    }

    if (request.body.quote) {
        womanFound.quote = request.body.quote
    }

    const updatedWoman = await womanFound.save();

    response.json(updatedWoman);

    } catch(error) {
        console.log(error);
    }
}

// DELETE
async function deleteWoman(request, response) {
    try {
        await Woman.findByIdAndDelete(request.params.id);
        response.json({ message: 'Sucessfully deleted woman'});
    } catch(error) {
        console.log(error);
    }
}

function showPort() {
    console.log("Runnig on port", port);
}

app.use(router.get('/women', showWomen));
app.use(router.post('/women', createWomen));
app.use(router.patch('/women/:id', editWoman));
app.use(router.delete('/women/:id', deleteWoman));
app.listen(port, showPort);
