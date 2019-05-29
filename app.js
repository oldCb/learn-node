const express = require('express')
const suggestions = require('google-suggestions')
const weather = require('weather-js')
const app = express()
const port = 3000

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

app.listen(port, function () {
    console.log('Exemple app listening on port ', port)
})