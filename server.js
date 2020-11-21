if (process.env.NODE_ENV !=='production') {
    require('dotenv').config()
}

const express = require('express')
//activate the app portion of express
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

/*  EJS is mostly useful whenever you have to output HTML with a lot of javascript 
    if you’re dealing with generating dynamic contents or offering something that has 
    to do with real-time updates.   */

/*  Express uses jade as its default template engine,so we would have to tell it to 
    use ejs instead with the following line to your app.js file in the root folder of your projects    */ 

/*  all files in which ejs syntax are used in must be saved with a .ejs extension and located 
    in the views folder in the root directory of the project.     */

/*  by default express is configured to look for template files to render in any directory called views. 
    If you’re not comfortable with this, you can always change that by including the following line in your app.js file.

    app.set("views","./yourcustomname");
    */
//set view engine
app.set('view engine','ejs')

//set where users are coming from
app.set('views',__dirname + '/views')

//Hook up express layouts
app.set('layouts','/layouts/layout');

app.use(expressLayouts)
//Tell where you are putting JS files, images, css etc.
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection

db.on('error', error=> console.log(error));
db.once('open', () => console.log("Connected to Mongoose"));

//Hook router to view. Otherwise there won't be any view
app.use(indexRouter);

//Listen
app.listen(process.env.PORT || 3000);

//To run--> npm run devStart
