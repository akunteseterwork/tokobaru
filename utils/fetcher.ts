import { customFetch } from './customFetch';

export async function fetchData(url: string) {
    const res = await fetch(url);
    return res.json();
  }

export async function fetchWithToken(url: string, options: RequestInit = {}) {
  return customFetch(url, options);
}

