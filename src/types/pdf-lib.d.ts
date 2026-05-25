declare module "pdf-lib" {
    export class PDFDocument {
        static create(): Promise<PDFDocument>;
        static load(data: Uint8Array | string): Promise<PDFDocument>;
        addPage(pageSize?: [number, number] | { width: number; height: number }): PDFPage;
        embedPng(data: string): Promise<PDFImage>;
        embedJpg(data: string): Promise<PDFImage>;
        save(): Promise<Uint8Array>;
    }

    export class PDFPage {
        drawImage(
            image: PDFImage,
            options: { x: number; y: number; width: number; height: number }
        ): void;
        getWidth(): number;
        getHeight(): number;
    }

    export interface PDFImage {
        scale(factor: number): { width: number; height: number };
    }

    export function degrees(angle: number): number;
    export function rgb(r: number, g: number, b: number): { r: number; g: number; b: number };
}
