export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  
  export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      credentials: 'include'
    });
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  
