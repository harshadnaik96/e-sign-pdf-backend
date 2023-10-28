import { Request, Response } from 'express';
import multiparty from 'multiparty';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export const sign = async (req: Request, res: Response) => {
  var form = new multiparty.Form();
  try {
    const relativePath = './pdf';
    const directoryPath = path.join(__dirname, '../../../', relativePath);
    if (!fs.existsSync(directoryPath)) {
      try {
        fs.mkdirSync(directoryPath, { recursive: true });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      try {
        res.contentType("application/pdf");
        res.download(
          await signPDF(
            files.pdf[0].path,
            fields.name[0],
            fields.email[0],
            fields.signature[0],
            directoryPath
          )
        );
      } catch (err) {
        console.log('err', err);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const signPDF = async (
  inputPath: string,
  name: string,
  email: string,
  signature: string,
  outputPath: string
): Promise<string> => {
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const signatureFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const jpgImage = await pdfDoc.embedJpg(signature);
  const jpgDims = jpgImage.scale(0.25);

  pages.forEach((page) => {
    const { height } = page.getSize();
    page.drawText(name, {
      x: 10,
      y: height - 20,
      size: 12,
      font: signatureFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(email, {
      x: 10,
      y: height - 40,
      size: 12,
      font: signatureFont,
      color: rgb(0, 0, 0),
    });
    page.drawImage(jpgImage, {
      x: 10,
      y: height - 100,
      width: 60,
      height: 40,
    });
  });

  const modifiedPdfBytes = await pdfDoc.save();
  const fileName = `${outputPath}/${Date.now()}-${name}.pdf`;
  fs.writeFileSync(fileName, modifiedPdfBytes);

  return fileName;
};
