import Cookies from 'js-cookie';

interface Props {
    onLogin: (token: string) => void;
    onLogout: () => void;
    API_URL: string;
}


export const handleLoginSubmit = async (
    values: {
      username: string;
      password: string;
    },
    onLogin: any,
    API_URL: string
  ): Promise<void> => {
    const response = await fetch(`${API_URL}/accounts/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.username, password: values.password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      const accessToken: string = data.access;
      const expiresIn: number = data.expires_in; // Assuming the backend returns the expiration time in seconds
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      Cookies.set('access', accessToken);
      Cookies.set('access_expiration', expirationTime.toString());
      Cookies.set('refresh', data.refresh); // Also save the refresh token
      onLogin(accessToken);
    } else {
      console.log('Invalid credentials');
    }
    return;
};

  
export const handleSignupSubmit = async (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    },
    API_URL:string
    ): Promise<void> => {
        try {
        const response = await fetch(`${API_URL}/accounts/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            alert('User registered successfully');
        } else {
            console.log(response);
        }
        } catch (e) {
        console.log(e)
        }
};


export const refreshAccessToken = async (API_URL:string) => {
    const refreshToken = Cookies.get('refresh');
    
    if (refreshToken) {
        try {
        const response = await fetch(`${API_URL}/accounts/token/refresh`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });
    
        if (response.ok) {
            const {access, expires_in} = await response.json();

            const newAccessToken: string = access;
            const expiresIn: number = expires_in; // Assuming the backend returns the expiration time in seconds
            const newExpirationTime = new Date().getTime() + expiresIn * 1000;
            Cookies.set('access', newAccessToken);
            Cookies.set('access_expiration', newExpirationTime.toString());
            return newAccessToken;
        } else {
            console.log('Error refreshing access token:', response.statusText);
            return null;
        }
        } catch (error) {
        console.log('Error refreshing access token:', error);
        return null;
        }
    } else {
        console.log('No refresh token found');
        return null;
    }
};


export const isAccessTokenExpired = (): boolean => {
    const expirationTime = Cookies.get('access_expiration');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      return currentTime > parseInt(expirationTime);
    }
    return true;
};

export const handleLogout = (onLogout:any) => {
    Cookies.remove('access');
    Cookies.remove('access_expiration')
    Cookies.remove('refresh')
    onLogout();
  };