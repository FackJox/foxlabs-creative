declare module 'payload' {
  export function buildConfig(config: any): any;
  
  const payload: {
    buildConfig: typeof buildConfig;
  };
  
  export default payload;
}
