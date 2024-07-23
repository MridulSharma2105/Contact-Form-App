// Importing express module.
const exp = require('express');

// Importing mongoose module.
const mongoose = require('mongoose');
const port = 80;
const app = exp();

// Handling GET requests.
app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    // res.send('Hello World');
    return res.redirect('index.html');
});

// For POST and PUT requests.
app.use(exp.json());
app.use(exp.urlencoded({extended: true}));

// For serving static HTML files.
app.use(exp.static('public'));

// Connecting to the mongoose database. Name of DB for this project is 'projectDB'.
mongoose.connect('mongodb://localhost/projectDB', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

});
let db = mongoose.connection;

app.post('/formFillUp', (req,res) => {
    const name = req.body.name;
    const reason = req.body.reason;
    const email = req.body.email;
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const addressLine  = req.body.addressLine;
    const data = {
        name: name,
        reason: reason,
        email: email,
        phone: phone,
        city: city,
        state: state,
        addressLine: addressLine,
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if(err){
            throw err;
        }
        console.log('Data inserted Successfully');
    });

    return res.redirect('formSubmitted.html');

});

// Starting a server on port 80.
app.listen(port, () =>{
    console.log(`The application started succesfully on port ${port}`);
});
