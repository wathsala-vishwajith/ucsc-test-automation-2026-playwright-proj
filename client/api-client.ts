import { APIRequestContext, APIResponse } from '@playwright/test';

export class APIClient {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setAuthToken(token: string): void {
    this.token = token;
  }

  private getAuthHeaders(): { [key: string]: string } {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async get(path: string, headers: { [key: string]: string } = {}): Promise<APIResponse> {
    const combinedHeaders = { ...this.getAuthHeaders(), ...headers };
    return this.request.get(path, { headers: combinedHeaders });
  }

  async post(path: string, data: any, headers: { [key: string]: string } = {}): Promise<APIResponse> {
    const combinedHeaders = { ...this.getAuthHeaders(), ...headers };
    return this.request.post(path, { data, headers: combinedHeaders });
  }

  async put(path: string, data: any, headers: { [key: string]: string } = {}): Promise<APIResponse> {
    const combinedHeaders = { ...this.getAuthHeaders(), ...headers };
    return this.request.put(path, { data, headers: combinedHeaders });
  }

  async delete(path: string, headers: { [key: string]: string } = {}): Promise<APIResponse> {
    const combinedHeaders = { ...this.getAuthHeaders(), ...headers };
    return this.request.delete(path, { headers: combinedHeaders });
  }
}
