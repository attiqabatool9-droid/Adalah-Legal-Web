import axios from 'axios';

// Yahan wo port number likhna jis pe tumhara backend server chal raha hai (e.g., 5000, 8000)
const API = axios.create({
  baseURL: 'http://localhost:5000', 
});

// ============================================
// UPDATE: Request Interceptor (Token Bhejna)
// ============================================
// Ye code check karega ke agar User Login hai (Token hai),
// to wo Token har request ke saath Backend ko bhej dega.
API.interceptors.request.use((req) => {
  console.log(`[API Request] ${req.method?.toUpperCase()} ${req.url}`);
  
  // First check if token exists directly
  let token = localStorage.getItem('token');
  
  // If not, check if it's stored inside userInfo
  if (!token) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const userData = JSON.parse(userInfo);
        token = userData.token;
      } catch (e) {
        console.log("Error parsing userInfo:", e);
      }
    }
  }
  
  // Add token to headers
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log(`[API] ${req.method?.toUpperCase()} ${req.url} - Token attached`);
  } else {
    console.warn(`[API] ${req.method?.toUpperCase()} ${req.url} - NO TOKEN`);
  }
  
  return req;
});

// Response Interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('[API Error]', error.config?.url, error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;