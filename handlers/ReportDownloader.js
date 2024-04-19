// ReportDownloader.js
import ExcelHandler from "./ExcelHandler.js";
import PDFDownloader from "./PDFDownloader.js";
import Report from "../obj/Report.js";
import Logger from "../logger/Logger.js";

class ReportDownloader {
  constructor(excelHandler, pdfDownloader) {
    this.excelHandler = excelHandler;
    this.pdfDownloader = pdfDownloader;
  }

  async downloadReports() {
    const worksheet = await this.excelHandler.readExcel();

    worksheet.eachRow(async (row, rowNumber) => {
      const BRNummer = row.getCell("BRNummer").value;
      const PdfUrlAL = row.getCell("AL").value;
      const PdfUrlAM = row.getCell("AM").value;

      const report = new Report(BRNummer, PdfUrlAL, PdfUrlAM);

      try {
        const pdfData = await this.pdfDownloader.downloadPDF(PdfUrlAL);
        // Gem PDF-fil, opdater status, osv.
        report.status = "Downloadet";
      } catch (error) {
        Logger.logError(
          `Fejl ved download af rapport ${BRNummer}: ${error.message}`
        );
        try {
          const pdfData = await this.pdfDownloader.downloadPDF(PdfUrlAM);
          // Gem PDF-fil, opdater status, osv.
          report.status = "Downloadet";
        } catch (error) {
          Logger.logError(
            `Fejl ved download af rapport ${BRNummer} fra AM: ${error.message}`
          );
          report.status = "Ikke downloadet";
        }
      }

      await this.excelHandler.updateStatus(worksheet, rowNumber, report.status);
    });

    await this.excelHandler.saveExcel(worksheet, "opdateret_metadata.xlsx");
  }
}

export default ReportDownloader;
