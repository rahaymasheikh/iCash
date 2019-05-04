const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


//username and password required for authentication using Passport
const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String

});

UserSchema.plugin(passportLocalMongoose);


//actual data for a users account
const CashSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

mongoose.model('User', UserSchema);
mongoose.model('Cash', CashSchema);


//connect to database
// mongoose.connect('mongodb://localhost/aitFinalTest');
mongoose.connect('mongodb://rahayma:hello786@ds123361.mlab.com:23361/ait_final_project');

