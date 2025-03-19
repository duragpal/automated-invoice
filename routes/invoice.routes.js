const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");

router.post("/invoices", invoiceController.createInvoice);
router.get("/invoices/pending", invoiceController.getPendingInvoices);

module.exports = router;
