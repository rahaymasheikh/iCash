//Passport code throughout the file used for authentication from passport documentation: http://www.passportjs.org/docs/authenticate/

require('animejs');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const parser = require('body-parser');

require( './db' );
const mongoose = require('mongoose');

const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

app.set('view engine', 'hbs');
const staticPath = path.resolve(__dirname, 'public');

app.use(express.static(staticPath));
app.use(parser.urlencoded({"extended":false}));
app.use((req, res, next) => {
    console.log(req.method, req.path, '\n=======\n', 'req.query:', req.query, '\n', 'req.body:', req.body);
    next();});

const Cash = mongoose.model('Cash');
const User = mongoose.model('User');


const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));

// app.use((req, res, next) => {
//     // now you can use {{user}} in your template!
//     res.locals.user = req.session.user;
//     next();
// });

app.use(passport.initialize());
app.use(passport.session());
//tell local strategy to use plugin version of authenticate
passport.use(new passportLocal(User.authenticate()));

//responsible for reading data from the session and encoding/decoding it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// ===============================================================


function createDate(enteredDate){
    let year;
    let month;
    let day;
    let date;
    return function () {
        year = String(enteredDate.getUTCFullYear());
        month = String(enteredDate.getUTCMonth() + 1);
        day = String(enteredDate.getUTCDate());

        date = month + "/" + day  + "/" + year + " ";
        return date;

    }
}

let currentBalance;

app.get('/', (req, res) => {
  res.render('homepage')
});


app.get('/account', function (req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    else
        res.redirect('/login')
},
    (req, res) => {
        Cash.find({ }, function(err, cashFound) {
            if (err){
                console.log('Oops!', err);
            }
            else{
                let result = [];

                currentBalance = 0.00;

                for(const i in cashFound){

                    if(req.user.id == cashFound[i].user){
                        result.push(cashFound[i])
                    }

                }

                // console.log(result)
                 result.map(function(element) {
                    // console.log(element.amount)
                    currentBalance += element.amount;

                     element.fixedDate = createDate(element.date)

                });

                // console.log(result)
                res.render('index', {'found': result, balance: currentBalance });
            }

        });

});

app.get('/account/myCash/add', function (req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    else
        res.redirect('/login')
    }, (req, res) => {
        res.render('add');
});

app.post('/account/myCash/add', (req, res) => {

    if (req.body !== null){

        console.log(req.user);
        new Cash({
            // user: User._id,
            user: req.user.id,
            amount: req.body.amount,
            date: req.body.date,
        }).save(function(err) {
            if (err) {
                console.log('Oops!', err);
            }
            res.redirect('/account');
        });
    }

});

app.get('/account/myCash/subtract', function (req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    else
        res.redirect('/login')
}, (req, res) => {
        res.render('subtract');
});

app.post('/account/myCash/subtract', (req, res) => {

    if (req.body !== null){

        new Cash({
            // user: User._id,
            user: req.user.id,
            amount: -req.body.amount,
            date: req.body.date,
        }).save(function(err) {
            if (err) {
                console.log('Oops!', err);
            }
            res.redirect('/account');
        });
    }
});


app.post('/account/myCash/subtract', (req, res) => {

    if (req.body !== null){

        new Cash({
            // user: User._id,
            user: req.user.id,
            amount: -req.body.amount,
            date: req.body.date,
        }).save(function(err) {
            if (err) {
                console.log('Oops!', err);
            }
            res.redirect('/account');
        });
    }
});

app.get('/account/myCash/filter',function (req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    else
        res.redirect('/login')
}, (req, res) => {
        res.render('filter');
});

app.post('/account/myCash/filter', (req, res) => {

    if (req.body !== null){
        let filteredAmounts = [];
        Cash.find({ }, function(err, cashFound) {
            if (err){
                console.log('Oops!', err);
            }
            else{
                for(const i in cashFound){

                    if(req.user.id == cashFound[i].user){
                        filteredAmounts.push(cashFound[i])
                    }
                }
                filteredAmounts.forEach(function(element){
                    element.fixedDate = createDate(element.date)
                });


                let filtered = filteredAmounts.filter(item => item.amount >= Number(req.body.start_amount) && item.amount <= Number(req.body.end_amount));
                // console.log(filtered);
                res.render('filtered-results', {'filtered': filtered});
            }

        });

    }
});



app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', (req, res) => {

    //dont save the password to the user
    const newUser =  new User({_id: new mongoose.Types.ObjectId(), username: req.body.username,});
    User.register( newUser ,req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.render('register', {message: 'there was an error in creating your account...try again.'})
        }
        else{
            passport.authenticate('local', (req, res) =>{
                res.redirect('/account')
            });

            res.redirect('/account')
        }

    });

});

app.get('/login', (req, res) => {

    res.render('login')
});



app.post('/login', passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
}),  (req, res) => {

});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



// app.listen(32542);
// app.listen(process.env.PORT, process.env.IP);

app.listen(process.env.PORT || 32542);