export default abstract class Service<TModel> {
  protected baseUrl: string;

  protected constructor(addUrl: string) {
    this.baseUrl = `${process.env.NEXT_PUBLIC_URL_API}/${addUrl}`;
  }

  protected async fetchWithTimeout(
    url: string, 
    options: RequestInit = {}, 
    timeout = 5000
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  public async getAll(): Promise<TModel[]> {
    const response = await this.fetchWithTimeout(this.baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }

  public async getById(id: number): Promise<TModel> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }
}