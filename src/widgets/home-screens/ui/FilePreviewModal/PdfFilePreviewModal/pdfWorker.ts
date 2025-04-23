import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export interface TextAnnotation {
    page: number;
    x: number;
    y: number;
    text: string;
    maxWidth: number;
    fontColor: string;
    fontSize: number;
    fontWeight: "regular" | "bold";
    pdfX: number;
    pdfY: number;
    pdfFontSize: number;
}

export interface SaveAnnotationsPayload {
    pdfArrayBuffer: ArrayBuffer;
    drawCanvasesData: string[];
    textAnnotations: TextAnnotation[];
    originalDimensions: Array<{ width: number; height: number }>;
    regularFontUrl: string;
    boldFontUrl: string;
}

export interface WorkerMessage {
    type: "saveAnnotations";
    payload: SaveAnnotationsPayload;
}

export interface SuccessResponse {
    status: "success";
    pdfBlob: Uint8Array;
}

export interface ErrorResponse {
    status: "error";
    error: string;
}

self.addEventListener("message", async (e: MessageEvent<WorkerMessage>) => {
    const { type, payload } = e.data;
    if (type === "saveAnnotations") {
        try {
            const {
                pdfArrayBuffer,
                drawCanvasesData,
                textAnnotations,
                originalDimensions,
                regularFontUrl,
                boldFontUrl,
            } = payload;

            const pdfDoc = await PDFDocument.load(new Uint8Array(pdfArrayBuffer));

            (pdfDoc as any).registerFontkit(fontkit);

            const fontRegularBytes = await fetch(regularFontUrl).then((res) =>
                res.arrayBuffer()
            );
            const fontBoldBytes = await fetch(boldFontUrl).then((res) =>
                res.arrayBuffer()
            );
            const customFontRegular = await (pdfDoc as any).embedFont(fontRegularBytes);
            const customFontBold = await (pdfDoc as any).embedFont(fontBoldBytes);

            for (let i = 0; i < drawCanvasesData.length; i++) {
                const dataUrl = drawCanvasesData[i];
                if (!dataUrl || !dataUrl.startsWith("data:image/png")) continue;
                const img = await pdfDoc.embedPng(dataUrl);
                const page = (pdfDoc as any).getPage(i);
                const dims = originalDimensions[i];

                page.drawImage(img, {
                    x: 0,
                    y: 0,
                    width: dims.width,
                    height: dims.height,
                });
            }

            function hexToRgb(hex: string): { r: number; g: number; b: number } {
                const validHex = /^#[0-9A-F]{6}$/i.test(hex) ? hex : "#000000";
                return {
                    r: parseInt(validHex.slice(1, 3), 16) / 255,
                    g: parseInt(validHex.slice(3, 5), 16) / 255,
                    b: parseInt(validHex.slice(5, 7), 16) / 255,
                };
            }

            for (const ann of textAnnotations) {
                const page = (pdfDoc as any).getPage(ann.page);
                const { r, g, b } = hexToRgb(ann.fontColor);
                const font = ann.fontWeight === "bold" ? customFontBold : customFontRegular;

                page.drawText(ann.text, {
                    x: ann.pdfX,
                    y: ann.pdfY - 25,
                    size: ann.fontSize + 5,
                    color: rgb(r, g, b),
                    font: font,
                    maxWidth: ann.maxWidth,
                    fontWeight: ann.fontWeight,
                });
            }

            const bytes = await pdfDoc.save();
            const response: SuccessResponse = { status: "success", pdfBlob: bytes };
            (self as any).postMessage(response);
        } catch (error) {
            const errMsg =
                error instanceof Error ? error.message : String(error);
            const response: ErrorResponse = { status: "error", error: errMsg };
            (self as any).postMessage(response);
        }
    }
});