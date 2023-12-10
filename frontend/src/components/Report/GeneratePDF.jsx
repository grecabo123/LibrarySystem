import html2pdf from 'html2pdf.js';

const GeneratePDF = (htmlContent, fileName) => {
  const pdfOptions = {
    margin: 10,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().from(htmlContent).set(pdfOptions).save();
};

export default GeneratePDF;