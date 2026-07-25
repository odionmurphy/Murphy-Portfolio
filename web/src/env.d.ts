declare module "bun";
declare module "bun:sqlite";

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "pdfjs-dist/build/pdf.worker.min.mjs?url";
