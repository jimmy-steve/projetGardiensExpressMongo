var express = require("express");

const mongoClient = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new mongoClient.MongoClient(url);

const database = client.db("myDb");
var collectionMechants = database.collection("superMechant");
var collectionMechantsSquad = database.collection("superMechantSquad");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log(
      "Vous etes connecter aux details des  Super Méchants de la Galaxie..."
    );

    const cursor = await collectionMechants.find({});
    const mechantsDetail = await cursor.toArray();

    const cursor2 = await collectionMechantsSquad.find({});
    const mechants = await cursor2.toArray();

    res.render("mechants", {
      mechants,
      mechantsDetail,
      title: "Les Supers Méchants de la Galaxie",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("erreur");
  }
});

module.exports = router;
