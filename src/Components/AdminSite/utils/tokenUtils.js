import Cookies from 'js-cookie';

export const setAccessTokenWithExpiry = (accessToken) => {
  try {
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    const now = new Date().getTime();
    const minutes = (expiryTime - now) / (60 * 1000);

    //console.log(`Access token expires in ~${Math.round(minutes)} minutes`);

    Cookies.set('accessToken', accessToken, {
      expires: minutes / 1440,
      path: '/',
      sameSite: 'Lax',
    });
  } catch (err) {
    console.error('Token parsing failed. Using fallback 15 mins.', err);
    Cookies.set('accessToken', accessToken, {
      expires: 1 / 96,
      path: '/',
      sameSite: 'Lax',
    });
  }
};
