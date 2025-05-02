import 'pdfjs-dist';

declare module 'pdfjs-dist' {
    interface GlobalWorkerOptions {
        disableWorker?: boolean;
    }
    interface PDFSource {
        disableWorker?: boolean;
    }
}
