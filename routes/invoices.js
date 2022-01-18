const express = require("express");
const controllerInvoices = require("../controllers/invoices.controller");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// FEED USERS FROM SACLIE
router.get("/feedsaint", controllerInvoices.feedInvoicesSafact);

// FEED FROM SAACXC
router.get("/feedsaacxc", controllerInvoices.feedInvoicesSaacxc);

// FEED FROM SAPAGCXC
router.get("/feedsapagcxc", controllerInvoices.feedInvoicesSapagcxc);

module.exports = router;
