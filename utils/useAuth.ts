import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const useAuth = (): boolean => {
  const [cookies] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAccessToken = () => {
      if (cookies.access_token) {
        const decodedToken = jwtDecode(cookies.access_token) as JwtPayload;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp <= currentTime) {
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyAccessToken();
  }, [cookies.access_token]);

  return isAuthenticated;
};

export default useAuth;
