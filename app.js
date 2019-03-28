// INIT
const port = 3000;

var express = require('express');
var mongoose = require('mongoose');
// var path = require('path');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
    dest: __dirname + '/uploads'
});
// DB
mongoose.connect("mongodb://localhost:27017/foodlabs", { useNewUrlParser: true });
// MODELS
require('./models/Recipe');
require('./models/Type');
require('./models/Ingredient');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/', require('./routes/recipes'));
app.use('/types', require('./routes/types'));
app.use('/ingredients', require('./routes/ingredients'));

app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Application started successfully');
app.listen(port);