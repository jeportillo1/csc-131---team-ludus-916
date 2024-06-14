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

router.get("/:yearField", (req, res, next) => {
  let yearList = [];
  db.collection("nominations")
    .where("year", "==", Number(req.params.yearField))
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.status(404).json({
          message: "Not a valid term",
          field: req.params.yearField
        });
        return;
      }

      snapshot.forEach(doc => {
        let info = doc.data();
        let data = {
          nominationId: doc.id,
          info
        };
        yearList.push(data);
      });
      res.status(200).json({
        yearList
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.delete("/:yearField", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available"
  });
});

module.exports = router;
