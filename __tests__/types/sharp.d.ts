declare module 'sharp' {
  interface Sharp {
    metadata(): Promise<{
      width: number;
      height: number;
      format: string;
      size: number;
      orientation?: number;
    }>;
    resize(width?: number, height?: number, options?: object): Sharp;
    toBuffer(): Promise<Buffer>;
    toFile(output: string): Promise<{ info: any }>;
  }
}

// Just export the module declaration for ambient typings
export {}; 