export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  
  export async function fetchWithToken(url: string, options: RequestInit = {}): Promise<any> {
    const cookies = document.cookie;
    const headers: HeadersInit = {
      ...options.headers,
      Cookie: cookies,
    };
  
    const headersObject = headers as Record<string, string>;
    const headersString = Object.keys(headersObject)
      .map(key => `${key}: ${headersObject[key]}`)
      .join('\n');
  
    console.log('Headers:', headersString);
  
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: headers,
    });
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  
  
  
