const express = require('express')
const bodyParser = require("body-parser")
const suggestions = require('google-suggestions')
const weather = require('weather-js')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('hello word')
})

app.get('/api/:text', function (req, res) {
    suggestions(req.params.text)
        .then(response => {
            const responseClean = response.map(item => {
                return item.replace('</b>', '')
            })
            res.send(responseClean)
        });
})

app.get('/meteo/:text', function (req, res) {
    weather.find({
        search: req.params.text, 
        degreeType: 'C'
        }, function(err, result) {
        if(err) console.log(err);
        const m = JSON.stringify(result, null, 2)
        console.log(m);
        res.send(m)
    });
})

app.get('/form', function (req, res) {
    res.sendfile('./form.html')
})

app.post('/form', function (req, res) {
    console.log('nom: ' + req.body.nom)
    console.log('prenom: ' + req.body.prenom)
})


app.listen(port, function () {
    console.log('Port: ', port)
})