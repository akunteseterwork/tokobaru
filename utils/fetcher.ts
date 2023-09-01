export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const token = getAccessTokenFromCookie();
    if (!token) {
      throw new Error('Access token not found in cookie');
    }
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
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
  
  function getAccessTokenFromCookie() {
    const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith('access_token='));
    if (cookie) {
      return cookie.split('=')[1];
    }
    return null;
  }
  
  export const fetchHeroSectionData = async () => {
    const productsData = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/products?per_page=1000`);
    const productsCount = productsData?.data.products.length || 0;
    const randomProductIndex = Math.floor(Math.random() * productsCount);
    const currentDisplayedProduct = productsData?.data.products[randomProductIndex];
    return currentDisplayedProduct;
  };
  
