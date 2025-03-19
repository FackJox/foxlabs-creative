// Mock Response implementation for Jest
// This is needed because JSDOM doesn't fully implement Response and other Web API features

class MockResponse {
  body: any;
  status: number;
  statusText: string;
  headers: Map<string, string>;
  type: string;
  url: string;
  ok: boolean;

  constructor(body: any, init: ResponseInit = {}) {
    this.body = typeof body === 'string' ? body : JSON.stringify(body);
    this.status = init.status || 200;
    this.statusText = init.statusText || '';
    this.headers = new Map(Object.entries(init.headers || {}));
    this.type = 'default';
    this.url = '';
    this.ok = this.status >= 200 && this.status < 300;
  }

  json() {
    return Promise.resolve(JSON.parse(this.body));
  }

  text() {
    return Promise.resolve(this.body);
  }

  clone() {
    return new MockResponse(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: Object.fromEntries(this.headers)
    });
  }

  arrayBuffer() {
    return Promise.resolve(new TextEncoder().encode(this.body).buffer);
  }

  blob() {
    return Promise.resolve(new Blob([this.body]));
  }

  formData() {
    const formData = new FormData();
    try {
      const data = JSON.parse(this.body);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    } catch (e) {
      // Handle if body is not JSON
    }
    return Promise.resolve(formData);
  }
}

export function setupMockResponse() {
  if (typeof global.Response === 'undefined') {
    global.Response = MockResponse as any;
  }

  if (typeof global.Headers === 'undefined') {
    global.Headers = class Headers extends Map {
      append(name: string, value: string) {
        this.set(name, value);
      }
      delete(name: string) {
        super.delete(name);
      }
      get(name: string) {
        return super.get(name) || null;
      }
      has(name: string) {
        return super.has(name);
      }
      set(name: string, value: string) {
        super.set(name, value);
        return this;
      }
    } as any;
  }

  if (typeof global.Request === 'undefined') {
    global.Request = class Request {
      url: string;
      method: string;
      headers: Headers;
      body: any;
      constructor(input: string, init: any = {}) {
        this.url = input;
        this.method = init.method || 'GET';
        this.headers = new Headers(init.headers || {});
        this.body = init.body || null;
      }
    } as any;
  }
} 