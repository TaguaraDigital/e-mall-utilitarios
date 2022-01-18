const express = require("express");
const controllerUsers = require("../controllers/users.controller");
const userConversion = require("../middleware/userConversion");
const router = express.Router();

// FEED USERS
router.post("/feed", userConversion, controllerUsers.feed);

// FEED USERS TABLES FROM SAINT
router.get("/feedpaises", controllerUsers.feedpaises);
router.get("/feedestados", controllerUsers.feedestados);
router.get("/feedciudades", controllerUsers.feedciudades);
router.get("/feedmunicipios", controllerUsers.feedmunicipios);
router.get("/feedusuarios", controllerUsers.feedusuarios);
router.get("/feedsaint", controllerUsers.feedsaint);

module.exports = router;
