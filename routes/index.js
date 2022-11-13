const { json } = require("body-parser");
var express = require("express");

const mongoClient = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new mongoClient.MongoClient(url);

const database = client.db("myDb");
var collectionGardiens = database.collection("superGardiens");
var collectionMechants = database.collection("superMechant");

var collectionGardiensSquad = database.collection("superGardiensSquad");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Vous etes connecter ...");

    const cursor2 = await collectionMechants.find({});
    const mechants = await cursor2.toArray();

    const cursor = await collectionGardiens.find({});
    const gardiens = await cursor.toArray();

    res.render("index", {
      gardiens,
      mechants,
      title: "Les Supers Gardiens de la Galaxie",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Oppss");
  }
});

router.post("/postGardiens", async function (req, res) {
  var name = req.body.nameGardiens;
  var origin = req.body.origin;
  var secretIdentity = req.body.secretIdentity;
  var powers = req.body.powers;

  console.log("Vous etes dans api/postGardiens");
  try {
    let data = {
      name: name,
      origin: origin,
      secretIdentity: secretIdentity,
      powers: powers,
    };
    console.log(data);

    const result = await collectionGardiens.insertOne(data);
    console.log(result);

    const cursor2 = await collectionMechants.find({});
    const mechants = await cursor2.toArray();

    const cursor = await collectionGardiens.find({});
    const gardiens = await cursor.toArray();

    res.render("index", {
      gardiens,
      mechants,
      title: "Les Supers Gardiens de la Galaxie",
    });
  } catch (err) {
    console.log(err);
    res.send("Error - check console");
  }
});

router.post("/updateGardiens", async function (req, res) {
  var name = req.body.name;
  var origin = req.body.origin;
  var secretIdentity = req.body.secretIdentity;
  var powers = req.body.powers;

  console.log("Vous etes dans api/updateGardiens");
  try {
    let data = {
      name: name,
      origin: origin,
      secretIdentity: secretIdentity,
      powers: powers,
    };
    // console.log(data);

    //TODO --------------------rechercher le bon document
    const cursor = await collectionGardiens.find({ name: name });
    const gardiensTrouver = await cursor.toArray();
    console.log("Recherche du gardiens ------->");

    //on recherche le nom pour modifier le gardiens
    for (let i = 0; i < gardiensTrouver.length; i++) {
      if (gardiensTrouver[i].name == name) {
        console.log("Eureka !!");

        //TODO ----------------------faire la mise a jour sur le document trouver
        const result = await collectionGardiens.updateOne(
          { _id: gardiensTrouver[i]._id },
          [
            {
              $set: {
                origin: origin,
                secretIdentity: secretIdentity,
                powers: powers,
              },
            },
          ]
        );
        //confirmation d'insertion
        console.log(result);
      }
    }

    //recherche dans les base de donnée pour mettre la liste des héroes a jour
    const cursor2 = await collectionMechants.find({});
    const mechants = await cursor2.toArray();

    const cursor3 = await collectionGardiens.find({});
    const gardiens = await cursor3.toArray();

    res.render("index", {
      gardiens,
      mechants,
      title: "Les Supers Gardiens de la Galaxie",
    });
  } catch (err) {
    console.log(err);
    res.send("Error - check console");
  }
});

router.get("/deleteGardiens/:name", async function (req, res) {
  var name = req.params.name;

  console.log("Vous etes dans api/deleteGardiens " + name);

  try {
    // console.log(data);
    //TODO --------------------rechercher le bon document
    const cursor5 = await collectionGardiens.find({});
    var gardiensTrouver = await cursor5.toArray();
    console.log("Recherche du gardiens ------->");

    //on recherche le nom pour modifier le gardiens
    for (let i = 0; i < gardiensTrouver.length; i++) {
      if (gardiensTrouver[i].name == name) {
        console.log("Eureka !! on a trouver : " + gardiensTrouver[i].name);

        //TODO ----------------------supprimer sur le document trouver
        const result = await collectionGardiens.deleteOne({
          _id: gardiensTrouver[i]._id,
        });
        //confirmation d'insertion
        console.log(result);
      }
    }

    //recherche dans les base de donnée pour mettre la liste des héroes a jour
    const cursor2 = await collectionGardiensSquad.find({});
    const gardiens = await cursor2.toArray();

    const cursor3 = await collectionGardiens.find({});
    const gardiensDetail = await cursor3.toArray();

    res.render("gardiens", {
      gardiens,
      gardiensDetail,
      title: "Les Supers Gardiens de la Galaxie",
    });
  } catch (err) {
    console.log(err);
    res.send("Error - check console");
  }
});

module.exports = router;
