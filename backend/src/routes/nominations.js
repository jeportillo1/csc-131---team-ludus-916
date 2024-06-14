const express = require("express");
const router = express.Router();

// initalizing admin and adding database //
const { admin } = require("./certs/admin");
let db = admin.firestore();
// initalizing admin and adding database END //

// get all documents in the entire db
router.get("/", (req, res, next) => {
  let nomination = db.collection("nominations");
  let nominationList = [];
  nomination
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let info = doc.data();
        let data = {
          nominationId: doc.id,
          info,
        };
        nominationList.push(data);
      });
      res.status(200).json({
        nominationList,
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
  console.log(nominationList);
});

// add a document to the data base
router.post("/", (req, res, next) => {
  const nomination = {
    category: req.body.category,
    entity: req.body.entity,
    winner: Boolean(req.body.winner),
    year: Number(req.body.year),
  };
  db.collection("nominations").doc().set(nomination);
  res.status(200).json({
    message: "nomination added",
    info: nomination,
  });
});

// getting a nomination given a know ID
router.get("/:nominationField", (req, res, next) => {
  db.collection("nominations")
    .doc(req.params.nominationField)
    .get()
    .then((snapshot) => {
      let data = snapshot._fieldsProto;
      data.category = data.category.stringValue;
      data.entity = data.entity.stringValue;
      data.winner = data.winner.booleanValue;
      data.year = data.year.integerValue;
      res.status(200).json({
        nominationID: snapshot.id,
        data,
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
      res.status(404).json({
        message: "Document dose not exsist",
      });
    });
});

// delete a document given proper info
router.delete("/", (req, res, next) => {
  db.collection("nominations")
    .where("category", "==", req.body.category)
    .where("entity", "==", req.body.entity)
    .where("winner", "==", req.body.winner)
    .where("year", "==", req.body.year)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        res.status(404).json({ message: "invalid data" });
        return;
      }
      snapshot.forEach((doc) => {
        db.collection("nominations")
          .doc(doc.id)
          .delete()
          .then(() => {
            res.status(200).json({
              message: "document deleted",
              document: doc.id,
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

// remove a document from the database
router.delete("/:nominationField", (req, res, next) => {
  db.collection("nominations")
    .doc(req.params.nominationField)
    .delete()
    .then(() => {
      res.status(200).json({
        message: "document deleted",
        document: req.params.nominationField,
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

module.exports = router;
