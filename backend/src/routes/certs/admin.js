const admin = require("firebase-admin");

// initalizing admin and adding database //
let serviceAccount = require("../../keys/csc131-5f891cf3314e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// initalizing admin and adding database END //

module.exports.admin = admin;
