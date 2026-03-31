// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import * as API from '../../Endpoint/Endpoint';
// // import { setAccessTokenWithExpiry } from './tokenUtils';

// // const axiosInstance = axios.create();

// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const token = Cookies.get('accessToken');
// //     if (token) {
// //       config.headers['Authorization'] = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;
// //       const refreshToken = Cookies.get('refreshToken');

// //       if (!refreshToken) {
// //         Cookies.remove('accessToken');
// //         Cookies.remove('refreshToken');
// //         window.location.href = '/';
// //         return Promise.reject(error);
// //       }

// //       try {
// //         const res = await axios.post(API.REFRESH_TOKEN, { refreshToken });
// //         const { accessToken, refreshToken: newRefreshToken } = res.data;

// //         setAccessTokenWithExpiry(accessToken);

// //         if (newRefreshToken) {
// //           Cookies.set('refreshToken', newRefreshToken, {
// //             expires: 7,
// //             path: '/',
// //             sameSite: 'Lax',
// //           });
// //         }

// //         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
// //         return axiosInstance(originalRequest);
// //       } catch (err) {
// //         Cookies.remove('accessToken');
// //         Cookies.remove('refreshToken');
// //         window.location.href = '/';
// //         return Promise.reject(err);
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosInstance;



// // src/Components/AdminSite/utils/axiosInstance.js
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import * as API from '../../Endpoint/Endpoint';
// import { setAccessTokenWithExpiry } from './tokenUtils';

// // ✅ Add base URL to avoid relative path issues
// const axiosInstance = axios.create({
//     baseURL: API.API_BASE_URL || 'http://localhost:5351/api',
//     timeout: 30000, // 30 seconds
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // ✅ Request interceptor - adds token to every request
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
        
//         // ✅ Debug log (remove in production)
//         console.log(`🔹 [${config.method?.toUpperCase()}] ${config.url}`, {
//             hasToken: !!token,
//             headers: config.headers
//         });
        
//         return config;
//     },
//     (error) => {
//         console.error('❌ Request interceptor error:', error);
//         return Promise.reject(error);
//     }
// );

// // ✅ Response interceptor - handles 401 and token refresh
// axiosInstance.interceptors.response.use(
//     (response) => {
//         console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url} - ${response.status}`);
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // ✅ Handle 401 Unauthorized
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
            
//             const refreshToken = Cookies.get('refreshToken');

//             if (!refreshToken) {
//                 console.warn('⚠️ No refresh token found, redirecting to login');
//                 Cookies.remove('accessToken');
//                 Cookies.remove('refreshToken');
//                 window.location.href = '/';
//                 return Promise.reject(error);
//             }

//             try {
//                 console.log('🔄 Attempting to refresh token...');
                
//                 // ✅ Use full URL for refresh token endpoint
//                 const res = await axios.post(
//                     `${API.API_BASE_URL}/token/refresh-token`,
//                     { refreshToken }
//                 );
                
//                 const { accessToken, refreshToken: newRefreshToken } = res.data;

//                 // ✅ Store new access token
//                 setAccessTokenWithExpiry(accessToken);

//                 // ✅ Store new refresh token if provided
//                 if (newRefreshToken) {
//                     Cookies.set('refreshToken', newRefreshToken, {
//                         expires: 7,
//                         path: '/',
//                         sameSite: 'Lax',
//                         secure: process.env.NODE_ENV === 'production'
//                     });
//                 }

//                 console.log('✅ Token refreshed successfully');

//                 // ✅ Retry original request with new token
//                 originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return axiosInstance(originalRequest);
                
//             } catch (err) {
//                 console.error('❌ Token refresh failed:', err.response?.data || err.message);
//                 Cookies.remove('accessToken');
//                 Cookies.remove('refreshToken');
//                 window.location.href = '/';
//                 return Promise.reject(err);
//             }
//         }

//         console.error(`❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url} - ${error.response?.status}`, 
//             error.response?.data || error.message);
        
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


// src/Components/AdminSite/utils/axiosInstance.js

import axios from 'axios';
import Cookies from 'js-cookie';
import * as API from '../../Endpoint/Endpoint';
import { setAccessTokenWithExpiry } from './tokenUtils';

// ✅ Check if running in production (works in browser)
const isProduction = window.location.protocol === 'https:';

// ✅ Add base URL to avoid relative path issues
const axiosInstance = axios.create({
    baseURL: API.API_BASE_URL || 'http://localhost:5351/api',
    withCredentials: true,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ Request interceptor - adds token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // ✅ Debug log (can be disabled in production)
        if (!isProduction) {
            console.log(`🔹 [${config.method?.toUpperCase()}] ${config.url}`, {
                hasToken: !!token
            });
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// ✅ Response interceptor - handles 401 and token refresh
axiosInstance.interceptors.response.use(
    (response) => {
        if (!isProduction) {
            console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url} - ${response.status}`);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // ✅ Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const refreshToken = Cookies.get('refreshToken');

            if (!refreshToken) {
                console.warn('⚠️ No refresh token found, redirecting to login');
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/';
                return Promise.reject(error);
            }

            try {
                console.log('🔄 Attempting to refresh token...');
                
                // ✅ Use full URL for refresh token endpoint
                const res = await axios.post(
                    `${API.API_BASE_URL}/token/refresh-token`,
                    { refreshToken }
                );
                
                const { accessToken, refreshToken: newRefreshToken } = res.data;

                // ✅ Store new access token
                setAccessTokenWithExpiry(accessToken);

                // ✅ Store new refresh token if provided
                if (newRefreshToken) {
                    Cookies.set('refreshToken', newRefreshToken, {
                        expires: 7,
                        path: '/',
                        sameSite: 'Lax',
                        secure: isProduction // ✅ FIXED: Use isProduction instead of process.env
                    });
                }

                console.log('✅ Token refreshed successfully');

                // ✅ Retry original request with new token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
                
            } catch (err) {
                console.error('❌ Token refresh failed:', err.response?.data || err.message);
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/';
                return Promise.reject(err);
            }
        }

        // ✅ Log other errors
        if (!isProduction) {
            console.error(
                `❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url} - ${error.response?.status}`, 
                error.response?.data || error.message
            );
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
