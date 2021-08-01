const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//app
const app = express();

// database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log('database connected'))
	.catch((error) => console.log(error.message));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

//routes
app.get('/api', (req, res) => {
	res.json({
		data: 'hello motherfucker',
	});
});

//port
const port = process.env.PORT || 8000;

app.listen(port, console.log(`server is running on port ${port}`));
