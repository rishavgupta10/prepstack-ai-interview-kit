import { PDFParse } from "pdf-parse";

export class PdfService {
  async extractText(filePath: string): Promise<string> {
    const parser = new PDFParse({ url: filePath });
    const result = await parser.getText();
    return result.text;
  }
}