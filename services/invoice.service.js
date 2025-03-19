const Invoice = require("../models/invoice.model");

class InvoiceService {
  async createInvoice(invoiceData) {
    try {
      const invoice = new Invoice(invoiceData);
      return await invoice.save();
    } catch (error) {
      throw new Error(`Error creating invoice: ${error.message}`);
    }
  }

  async processPendingInvoices() {
    try {
      // Find all pending invoices that are due
      const pendingInvoices = await Invoice.find({
        status: "PENDING",
        dueDate: { $lte: new Date() },
        processingAttempts: { $lt: 3 },
      });

      for (const invoice of pendingInvoices) {
        await this.processInvoice(invoice);
      }

      return `Processed ${pendingInvoices.length} invoices`;
    } catch (error) {
      throw new Error(`Error processing pending invoices: ${error.message}`);
    }
  }

  async processInvoice(invoice) {
    try {
      // Update status to processing
      invoice.status = "PROCESSING";
      invoice.lastProcessedAt = new Date();
      invoice.processingAttempts += 1;
      await invoice.save();

      // Simulate payment processing
      await this.simulatePaymentProcessing(invoice);

      // Update status to completed
      invoice.status = "COMPLETED";
      await invoice.save();
    } catch (error) {
      invoice.status = "FAILED";
      await invoice.save();
      throw error;
    }
  }

  async simulatePaymentProcessing(invoice) {
    // Simulate an API call to payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }
}

module.exports = new InvoiceService();
