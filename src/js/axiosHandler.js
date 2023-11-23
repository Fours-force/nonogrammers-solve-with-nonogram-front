import axios from 'axios';
import { storeToRefs } from 'pinia';

axios.defaults.withCredentials = true;

export function setupAxiosInterceptors(store){
    
    const { user } = storeToRefs(store);

    // Request Interceptor
    axios.interceptors.request.use((config) => {
        
        // 변수 설정
        const isLoggedIn = (null === user.value) ? false : true ;// 로그인 여부
        const publicApiPaths = import.meta.env.VITE_PUBLIC_API_PATHS.split(','); // 로그인이 필요하지 않은 API 목록
        const isPublicApiPath = publicApiPaths.includes(new URL(config.url).pathname); // 로그인이 필요하지 않은 API 여부

        // 조건 만족 시, 헤더에 Authorization 추가
        if (isLoggedIn && !isPublicApiPath)
            config.headers['Authorization'] = `Bearer ${user.value.token}`;
        return config;

    }, (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    });


    // Response Interceptor
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {

        const errResStatus = error.response.status;
        if ( errResStatus === 401 || errResStatus === 403) {
            alert("권한이 없습니다. 로그아웃 되었습니다. 다시 로그인해주세요.")
            store.logout();
        }
        return Promise.reject(error);
    });
}