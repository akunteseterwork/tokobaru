export async function customFetch(url: string, options: RequestInit = {}) {
    const cookies = document.cookie;
    const headers: HeadersInit = {
      ...options.headers,
      Cookie: cookies,
    };
  
    const response = await fetch(url, {
      ...options,
      headers: headers,
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  