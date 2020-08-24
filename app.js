//require necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();
const app = express();

//middleware
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());
app.use(require('./middleware/cors.js').cors)
app.use('/uploads',express.static('uploads'))

app.use('/api',require('./routes'));
//mongoose connection
(async ()=>{
	try {
		await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME || 'e_commerce_db'}`,
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			}
		)
		console.log('connected to mongoose...!');
	} catch(err) {
		console.log(err);
	}
})();
//server listening at port 3001
app.listen(process.env.PORT||3001,()=>{
	console.log(`Server running at http://localhost:${process.env.PORT}`);
})
