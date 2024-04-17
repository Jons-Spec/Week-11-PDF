// PDFDownloader.js
import axios from 'axios';

class PDFDownloader {
    async downloadPDF(url) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
        } catch (error) {
            throw new Error(`Fejl ved download af PDF: ${error.message}`);
        }
    }
}

export default PDFDownloader;
