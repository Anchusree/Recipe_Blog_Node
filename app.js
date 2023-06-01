const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express();
const env = require('dotenv')
const path = require('path')
const routes = require('./server/routes/recipeRoutes');
const fileUpload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const port = process.env.PORT || 4001
env.config()


app.use(express.urlencoded({extended:true}))
app.use(express.static('public')) //img/image.jpg
app.use(expressLayouts)
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}));

app.use(function(req, res, next) {
  res.locals.userId = req.session.userId;
  res.locals.userName = req.session.username;
  next();
});

app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')
app.use('/',routes)
require('./server/models/Category');
require('./server/models/Recipe');
require('./server/models/User')



app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    mongoose.connect(`${process.env.MONGOURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
})