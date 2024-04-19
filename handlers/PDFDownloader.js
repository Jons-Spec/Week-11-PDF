// PDFDownloader.js
import axios from "axios";
import fs from "fs";
import path from "path";

class PDFDownloader {
  constructor(downloadFolderPath) {
    this.downloadFolderPath = downloadFolderPath;
  }

  async downloadPDFs(pdfUrls) {
    const downloads = pdfUrls.map(async (pdfUrl, index) => {
      try {
        const response = await axios.get(pdfUrl, {
          responseType: "arraybuffer",
        });
        const pdfData = response.data;
        const fileName = `${index}.pdf`;
        const filePath = path.join(this.downloadFolderPath, fileName);
        await this.savePDF(pdfData, filePath);
        return fileName;
      } catch (error) {
        throw new Error(`Fejl ved download af PDF ${index}: ${error.message}`);
      }
    });

    return Promise.all(downloads);
  }

  async savePDF(pdfData, filePath) {
    try {
      await fs.promises.mkdir(this.downloadFolderPath, { recursive: true });
      await fs.promises.writeFile(filePath, pdfData);
    } catch (error) {
      throw new Error(`Fejl ved gemning af PDF: ${error.message}`);
    }
  }
}

export default PDFDownloader;
