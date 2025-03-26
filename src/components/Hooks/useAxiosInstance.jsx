import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://note-nest-server-seven.vercel.app',
});

const useAxiosInstance = () => {
    return instance;
};

export default useAxiosInstance;