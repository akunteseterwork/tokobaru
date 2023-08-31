export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  
  export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      credentials: 'include'
    });
    console.log('log from response fetchwithtoken :'+ response)
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    console.log('log from data fetchwithtoken :'+ data)
    return data;
  }
  
