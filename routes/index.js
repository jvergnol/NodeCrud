var express = require('express');
var router = express.Router();

var db = require('../server/db');
var express = require('express')
var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()

router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getSingleUser);
router.post('/api/users',jsonParser, db.createUser);
router.put('/api/users/:id',jsonParser, db.updateUser);

router.get('/api/organizations', db.getAllOrganizations);
router.get('/api/organizations/:id', db.getSingleOrganization);
router.delete('/api/organizations/:id', db.deleteOrganization);

router.get('/api/addresses', db.getAllAddresses);
router.get('/api/addresses/:id', db.getSingleAddress);

module.exports = router;
