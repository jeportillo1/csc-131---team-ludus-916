const express = require("express");
const router = express.Router();

// initalizing admin and adding database //
const { admin } = require("./certs/admin");
let db = admin.firestore();
// initalizing admin and adding database END //

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.get("/", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available"
  });
});

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.post("/", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available"
  });
});

// get all the documents within a given entity
router.get("/:entityField", (req, res, next) => {
  let entityList = [];
  db.collection("nominations")
    .where("entity", "==", req.params.entityField)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.status(404).json({
          message: "Not a valid term",
          field: req.params.entityField
        });
        return;
      }

      snapshot.forEach(doc => {
        let info = doc.data();
        let data = {
          nominationId: doc.id,
          info
        };
        entityList.push(data);
      });
      res.status(200).json({
        entityList
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.delete("/:entityField", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available"
  });
});

module.exports = router;
