const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read
app.get('/honapok', (req, res) => {
	fs.readFile('./data/honapok.json' , (err, file) => {
		res.send(JSON.parse(file));
  });
});

// Read by (name)
app.get('/honapok/:egyediAzonosito', (req, res) => {
	const name = req.params.egyediAzonosito;

	fs.readFile('./data/honapok.json', (err, file) => {
		const honapok = JSON.parse(file);
		const honapByName = honapok.find(honap => honap.name === name);

		if(!honapByName) {
			res.status(404);
			res.send({error: `name: ${name} not found`});
			return;
		}
		
		res.send(honapByName)
	});
});

// Create
app.post('/honapok', bodyParser.json(), (req, res) => {
	const newHonap = {
		name: req.body.name,
		evszak: req.body.evszak,
		photoUrl: req.body.photoUrl,
		leiras: req.body.leiras
	};

	fs.readFile('./data/honapok.json' , (err, file) => {
		const honapok = JSON.parse(file);
		honapok.push(newHonap);
		fs.writeFile('./data/honapok.json', JSON.stringify(honapok), (err) => {
			res.send(newHonap);
		})
	})
});

// Update
app.put('/honapok/:egyediAzonosito', (req, res) => {
	const name = req.params.egyediAzonosito;

	fs.readFile('./data/honapok.json', (err, file) => {
		const honapok = JSON.parse(file);
		const honapIndexByName = honapok.findIndex(honap => honap.name === name);

		if(honapIndexByName === -1) {
			res.status(404);
			res.send({error: `name: ${name} not found`});
			return;
		}

		const updatedHonap = {
		name: req.body.name,
		evszak: req.body.evszak,
		photoUrl: req.body.photoUrl,
		leiras: req.body.leiras
		};

		honapok[honapIndexByName] = updatedHonap;
		fs.writeFile('./data/honapok.json', JSON.stringify(honapok), () => {
			res.send(updatedHonap);
		});
	});
});

// Delete
app.delete('/honapok/:egyediAzonosito', (req, res) => {
	const name = req.params.egyediAzonosito;

	fs.readFile('./data/honapok.json', (err, file) => {
		const honapok = JSON.parse(file);
		const honapIndexByName= honapok.findIndex(honap => honap.name === name);
		console.log(honapIndexByName);
		

		if(honapIndexByName === -1) {
			res.status(404);
			res.send({error: `name: ${name} not found`});
			return;
		}

		products.splice(honapIndexByName, 1);
		fs.writeFile('./data/honapok.json', JSON.stringify(honapok), () => {
			res.send({name: name});
		});
	});
});

app.listen(9000);