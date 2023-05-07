const express = require("express");
const router = express.Router();

const app = express();
const port = 3333;

function showTime(request, response) {
    const date = new Date();
    const time = date.toLocaleTimeString('pt-BR');
    response.send(time);
}

function showPort() {
    console.log("Server created and running on port", port);
}

app.use(router.get('/time', showTime));
app.listen(port, showPort);
