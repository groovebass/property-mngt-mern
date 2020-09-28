require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./server/config/key"); 


const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./server/routes/users'));
app.use('/api/product', require('./server/routes/product'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// app.get('/', (req, res) => { res.send('Hello from Express!')});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000 

app.listen(port, () => {
  console.log(`Server Running at ${port}`) 
  
}); 