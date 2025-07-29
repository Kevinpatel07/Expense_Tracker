import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:7390/api'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = localStorage.getItem('refreshtoken');

            if (!refreshToken) {
                console.warn("No refresh token found.");
                return Promise.reject(error);
            }

            try {
                const res = await axios.post('/refresh-token', {
                    refreshtoken: refreshToken
                });

                const newaccesstoken = res.data.newAccessToken
                localStorage.setItem('accesstoken', newaccesstoken)

                originalRequest.headers.Authorization = `Bearer ${newaccesstoken}`;
                return axiosInstance(originalRequest);

            } catch (error) {
                console.error("Refresh token invalid or expired. Please login again.");
                localStorage.removeItem("accesstoken");
                localStorage.removeItem("refreshtoken");
                window.location.href = "/LogIn";
            }
        }
        return Promise.reject(error);
    }
)

export default api