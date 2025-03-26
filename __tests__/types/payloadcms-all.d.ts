declare module 'payload' {
  export interface ServerFunctionClient {
    (args: {
      request: Request;
      params: Record<string, string>;
      query: Record<string, string>;
      cookies: Record<string, string>;
    }): Promise<any>;
  }

  export interface Config {
    collections: any[];
    globals: any[];
    typescript?: {
      outputFile?: string;
    };
  }

  export interface DatabaseAdapter {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
  }
}

declare module '@payloadcms/next' {
  import { Config } from 'payload/config';
  
  export function handleServerFunctions(options: {
    request: Request;
    params: Record<string, string>;
    query: Record<string, string>;
    cookies: Record<string, string>;
    config: Config;
    importMap: Record<string, any>;
  }): Promise<any>;

  export function RootLayout(props: {
    config: Config;
    importMap: Record<string, any>;
    serverFunction: (args: any) => Promise<any>;
    children: React.ReactNode;
  }): JSX.Element;
}

declare module '@payloadcms/richtext-lexical' {
  import { Field } from 'payload/types';
  
  export interface LexicalRichTextField extends Field {
    type: 'richText';
    editor?: {
      allowedFeatures?: string[];
      defaultValue?: any;
    };
  }

  export const lexicalEditor: LexicalRichTextField;
}

declare module '@payloadcms/db-mongodb' {
  interface MongoDBAdapter {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    find(args: any): Promise<any>;
    findOne(args: any): Promise<any>;
    findById(args: any): Promise<any>;
    create(args: any): Promise<any>;
    update(args: any): Promise<any>;
    delete(args: any): Promise<any>;
  }

  export function mongooseAdapter(options: {
    url: string;
    connectOptions?: any;
  }): MongoDBAdapter;
}

// Just export the module declaration for ambient typings
export {}; 