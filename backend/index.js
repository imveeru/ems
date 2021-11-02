const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());

var urlencodedParser = bodyparser.urlencoded({ extended: false }) ;

const port = 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));

//firebase config
var admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("./login-81303-firebase-adminsdk-ilhhy-1685ad1570.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-81303-default-rtdb.asia-southeast1.firebasedatabase.app"
});

//add a new user
app.post('/addUser',urlencodedParser,(req,res) => {
    getAuth()
    .createUser({
        email: req.body.username+"@cb.students.amrita.edu",
        password: req.body.password,
    })
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        res.send({uid:userRecord.uid})
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
        res.status(401).json(error)
    });
})




