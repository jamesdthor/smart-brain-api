const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// knex is used to speak to SQL
const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'jamesthorderson',
		password : '',
		database : 'smart-brain'
	}
});

const app = express();

// bodyParser is used to read JSON 
// data received in the body of a request

app.use(bodyParser.json());
app.use(cors())

// Beginning of Routing -->
app.get('/', (req, res) => { res.send(database.users) })

//  Below is one way of routing the request with a double function in the Signin.js page
app.post('/signin', signin.handleSignin(db, bcrypt))

// Below is the other way of routing the request by having req res called here and db bcrypt called later
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

// End of routing, listen info below -->

app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})























