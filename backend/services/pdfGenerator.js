import PDFDocument from "pdfkit";

export function generatePDF(content, res) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=job-description.pdf"
  );

  doc.pipe(res);

  content.split("\n").forEach(line => {
    if (line.trim() === "") {
      doc.moveDown();
    } else {
      doc.text(line, { lineGap: 4 });
    }
  });

  doc.end();
}
