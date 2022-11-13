var express = require("express");

const mongoClient = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new mongoClient.MongoClient(url);

const database = client.db("myDb");
var collectionGardiens = database.collection("superGardiens");
var collectionGardiensSquad = database.collection("superGardiensSquad");

var dao = require("../modules/accesData.js");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Vous etes connecter aux Super Gardiens de la Galaxie...");

    const cursor = await collectionGardiensSquad.find({});
    const gardiens = await cursor.toArray();

    const cursor2 = await collectionGardiens.find({});
    const gardiensDetail = await cursor2.toArray();

    res.render("gardiens", {
      gardiens,
      gardiensDetail,
      title: "Les Supers Gardiens de la Galaxie",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("erreur");
  }
});

router.get(
  "/update/:name/:origin/:secretIdentity/:powers",
  async function (req, res, next) {
    try {
      console.log("Vous etes connecter update avec le nom " + req.params.name);
      res.render("updateForms", {
        nameCourant: req.params.name,
        // titre: dao.rech(req.params.name),
        origin: req.params.origin,
        secretIdentity: req.params.secretIdentity,
        powers: req.params.powers,
        title: "Update des Supers Gardiens de la Galaxie",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("erreur");
    }
  }
);



module.exports = router;
