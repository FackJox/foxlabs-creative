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
  import { DatabaseAdapter } from 'payload/database';
  
  export interface MongoDBAdapter extends DatabaseAdapter {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
  }

  export function mongooseAdapter(options: {
    mongoURL: string;
    connectOptions?: any;
  }): MongoDBAdapter;
} 