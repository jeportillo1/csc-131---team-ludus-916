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
    message: "This is not a available",
  });
});

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.post("/", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available",
  });
});

router.get("/:winnerField", (req, res, next) => {
  let winnerList = [];
  let val = true;
  if (req.params.winnerField === "false") val = false;
  db.collection("nominations")
    .where("winner", "==", val)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        res.status(404).json({
          message: "Not a valid term",
          field: req.params.winnerField,
        });
        return;
      }

      snapshot.forEach((doc) => {
        let info = doc.data();
        let data = {
          nominationId: doc.id,
          info,
        };
        winnerList.push(data);
      });
      res.status(200).json({
        winnerList,
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

// I dont think this is needed but we will provide a respone
// with the proper code like 502 or something
router.delete("/:winnerField", (req, res, next) => {
  res.status(404).json({
    message: "This is not a available",
  });
});

module.exports = router;
