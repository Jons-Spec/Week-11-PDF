// main.js
import ReportDownloader from './ReportDownloader.js';
import ExcelHandler from './ExcelHandler.js';
import PDFDownloader from './PDFDownloader.js';
import Logger from './Logger.js';

// Brug af klasserne
const excelHandler = new ExcelHandler('metadata.xlsx');
const pdfDownloader = new PDFDownloader();
const reportDownloader = new ReportDownloader(excelHandler, pdfDownloader);
reportDownloader.downloadReports().catch(error => Logger.logError(`Uventet fejl: ${error.message}`));
