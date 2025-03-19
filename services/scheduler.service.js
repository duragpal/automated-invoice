const cron = require("node-cron");
const winston = require("winston");
const invoiceService = require("./invoice.service");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "invoice-processing.log" }),
  ],
});

class SchedulerService {
  initializeInvoiceProcessing() {
    // Run every hour
    cron.schedule("0 * * * *", async () => {
      logger.info("Starting invoice processing job");

      try {
        const result = await invoiceService.processPendingInvoices();
        logger.info("Invoice processing completed", { result });
      } catch (error) {
        logger.error("Invoice processing failed", { error: error.message });
      }
    });

    logger.info("Invoice processing scheduler initialized");
  }
}

module.exports = new SchedulerService();
