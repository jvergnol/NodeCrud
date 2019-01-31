var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:root@localhost:5432/test';
var db = pgp(connectionString);

// add query functions
function getAllUsers(req, res, next) {
  db.any('select u.name as user, o.name as organization, a.address as address from users as u join organizations as o on u.organization_id = o.id join addresses as a on o.id = a.organization_id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('select u.name as user, o.name as organization, a.address as address from users as u join organizations as o on u.organization_id = o.id join addresses as a on o.id = a.organization_id where u.id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllOrganizations(req, res, next) {
  db.any('select  o.name as organization, a.address as address from organizations as o  join addresses as a on o.id = a.organization_id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL organizations'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getSingleOrganization(req, res, next) {
    var organizationID = parseInt(req.params.id);
    db.one('select o.name as organization, a.address as address from organizations as o  join addresses as a on o.id = a.organization_id where o.id = $1', organizationID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllAddresses(req, res, next) {
  db.any('select  a.address as address from addresses as a' )
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL organizations'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getSingleAddress(req, res, next) {
    var addressID = parseInt(req.params.id);
    db.one('select a.address as address from addresses as a  where a.id = $1', addressID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createUser(req, res, next) {
  console.log(req.body.name);
  db.none('insert into users(name, organization_id) values (${name}, ${organization_id})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateUser(req, res, next) {
      var userID = parseInt(req.params.id);
      console.log(req.body.name);
      let name = req.body.name
  db.none("update users set name='"+name+"' where id="+userID)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteOrganization(req, res, next) {
  var organizationId = parseInt(req.params.id);
  db.result('delete from organizations where id = $1', organizationId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} organization`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  getAllOrganizations: getAllOrganizations,
  deleteOrganization: deleteOrganization,
  getSingleOrganization: getSingleOrganization,
  getAllAddresses: getAllAddresses,
  getSingleAddress: getSingleAddress,
};
