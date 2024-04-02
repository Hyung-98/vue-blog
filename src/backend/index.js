const express = require('express');
const app = express();
const port = 3000;

const weather = {
    weather: '맑음',
    temp: 8,
    temp_max: 10,
    temp_min: 1,
};

app.get('http://api.openweathermap.org/data/2.5/weather?q=Soul&units=metric&appid=ef1b61f053005d0d9bb57ff7b99d678e', (req, res) => {
    res.send(weather);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});