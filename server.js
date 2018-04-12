var express = require("express");
var jwt = require('jwt-simple');
var app = express();
var router = express.Router();
var path = __dirname + '/public/';
var fs = require('fs');
var firebase = require("firebase");
var admin = require("firebase-admin");
var https = require('https');
var session = require('express-session');


var serviceAccount = require("./serviceAccountKey.json");
var bodyParser = require('body-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fais-ma-vaisselle-53e05.firebaseio.com"
});

var config = {
    apiKey: "AIzaSyDiuJrSmfcFoIlME4IRWFtzH836tkWtgwQ",
    authDomain: "fais-ma-vaisselle-53e05.firebaseapp.com",
    databaseURL: "https://fais-ma-vaisselle-53e05.firebaseio.com",
    projectId: "fais-ma-vaisselle-53e05",
    storageBucket: "fais-ma-vaisselle-53e05.appspot.com",
    messagingSenderId: "120939869444"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(photoURL);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

router.use(function (req, res, next) {
    //console.log("/" + req.method);
    next();
});

router.post('/tokensignin', function (req, res) {
    var mode = req.body.mode;
    switch (mode) {
        case 'google':
            signInWithGoogle(req, res);
            break;
        case 'facebook':
            signInWithFacebook(req, res);
            res.redirect('/signed');
            break;
        default:
            console.log('Sorry, we are out of ' + expr + '.');
    }
});

router.get('/signed', function (req, res) {
    res.status(200).send('User logged in');
});

function signInWithFacebook(req, res) {
    console.log("signInWithFacebook");
}

function signInWithGoogle(req, res) {
    console.log("signInWithGoogle");
    var id_token = req.body.idtoken;
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    // Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential)
        .then(function (user) {
            
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error);
        });
}


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery-easing/dist')); // redirect JS jQuery

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-social'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use(express.static(path));
app.use(express.static(path + 'js/'));
app.use("/", router);


https.createServer({
    key: fs.readFileSync('newkey.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(3333);
