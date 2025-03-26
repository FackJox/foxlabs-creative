declare module 'sharp' {
  export default class Sharp {
    constructor(input?: string | Buffer);
    resize(width?: number, height?: number, options?: any): Sharp;
    toBuffer(): Promise<Buffer>;
    toFile(output: string): Promise<{ info: any }>;
  }
} 