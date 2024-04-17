// ExcelHandler.js
import Excel from 'exceljs';

class ExcelHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readExcel() {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        return workbook.getWorksheet('Sheet1');
    }

    async updateStatus(worksheet, rowNumber, status) {
        const statusCell = worksheet.getCell(`AT${rowNumber}`);
        statusCell.value = status;
    }

    async saveExcel(workbook, filePath) {
        await workbook.xlsx.writeFile(filePath);
    }
}

export default ExcelHandler;
