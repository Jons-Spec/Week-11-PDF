// main.js
import ReportDownloader from "./handlers/ReportDownloader.js";
import ExcelHandler from "./handlers/ExcelHandler.js";
import PDFDownloader from "./handlers/PDFDownloader.js";
import Logger from "./logger/Logger.js";

// Brug af klasserne
const excelHandler = new ExcelHandler("Metadata2006_2016.xlsx");
const pdfDownloader = new PDFDownloader("downloaded_PDFs");
const reportDownloader = new ReportDownloader(excelHandler, pdfDownloader);
reportDownloader
  .downloadReports()
  .catch((error) => Logger.logError(`Uventet fejl: ${error.message}`));
