const invoiceService = require("../services/invoice.service");

class InvoiceController {
  async createInvoice(req, res) {
    try {
      const invoice = await invoiceService.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPendingInvoices(req, res) {
    try {
      const invoices = await Invoice.find({ status: "PENDING" });
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InvoiceController();
