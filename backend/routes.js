// import router= express.Router
const Sequelize = require('sequelize')
const router = express.Router();
const { Users, Contacts } = require('./sequelize')
var jwt = require('jsonwebtoken');


//create a user
router.post('/users', async (req, res) => {
    // try{
    console.log(req);

    const data = await Users.findOne({ where: { email: req.body.email } }).then((data) => {
        if (data) {
            console.log("data: " + data);
            res.status(403).send("email already exists");
            console.log(res);

        }
        else {
            // console.log("else part");

            //    try{
            Users.create(req.body)
                .then(users => res.json(users)).catch(error => {
                    console.log("MESSAGE: " + JSON.stringify(error.parent.code));
                    if(error.parent.code==22001)
                    res.status(403).send("too long characters");
                })
        }
    }).catch(error => {
        
            console.log(JSON.stringify(error.message));
        res.status(403).send(JSON.stringify(error.message))
        
        
    })

})



router.post('/users/login', async (req, res) => {
    const data = await Users.findOne({ where: { email: req.body.email } }).catch(error => {
        console.log(error); res => res.body;
        res.status(403).send(JSON.stringify(error.message));
    });

    if (data) {
        console.log("username response: " + req);

        const data1 = await Users.findOne({ where: Sequelize.and({ email: req.body.email }, { password: req.body.password }), attributes: ['id'] }).catch(error => { console.log(error);res.status(403).send(JSON.stringify(error.message)); });
        if (data1) {
            console.log(data1);

            res.status(200).send(data1);

        }
        else {
            res.status(401).send("incorrect password");
            // console.log("password fail response: "+res);

        }
    }
    else {
        res.status(401).send("incorrect username");
        // let temp= JSON.stringify(res);
        // console.log("username fail response: "+res);

    }
})

router.post('/users/home1', (req, res) => {
    console.log('UserIduser: ' + req);

    Users.findOne({ where: { id: req.body.userid }, attributes: ['id', 'name', 'email', 'phone'] }).then(users => res.json(users)).catch(error => {console.log(error);res.status(403).send(JSON.stringify(error.message));});

})

//to create contacts
router.post('/contacts', async (req, res) => {

    const data = await Contacts.findOne({ where: { number1: req.body.number1 } }).catch(error => {console.log(error);res.status(403).send(JSON.stringify(error.message));});

    if (data) {
        console.log(data, 'DATA');
        res.status(403).send("number already exists");
        console.log("res:" + res);
    }
    else {
        console.log("DATA is not there");
        Contacts.create(req.path)
            .then(contacts => res.json(contacts)).catch(error => {
                // if(error.path=='email')
                {
                    console.log(error);res.status(403).send(JSON.stringify(error.message));
                }
            })

    }


})

// get contacts of a user
router.post('/contacts/get', (req, res) => {
    Contacts.findAll({ where: { userid: req.body.userid } }).then(contacts => res.json(contacts)).catch(error => {console.log(error);res.status(403).send(JSON.stringify(error.message));})
})

//to update contact
router.put('/contacts', (req, res) => {
    console.log(req.body);

    Contacts.update({ name: req.body.name, email: req.body.email, number1: req.body.number1 }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(error => { res.status(403).send(JSON.stringify(error.message)); })
})

//to delete contact
router.delete('/contacts', (req, res) => {
    console.log("delete contact");
    console.log(req.query.id);
    Contacts.destroy({ where: { id: req.query.id } }).then(() => res.sendStatus(200)).catch(error => {console.log(error);res.status(403).send(JSON.stringify(error.message));});
})

module.exports = router;