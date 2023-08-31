export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  
  export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const cookies = document.cookie;
    const headers = {
      ...options.headers,
      Cookie: cookies,
    };
    console.log(' ini header '+ headers)
  
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
  
  
