export default class Global {
    // static BASE_API_PATH = "http://localhost:8080/api";
    static BASE_API_PATH = "https://admin.glamcode.in/api";
    static BASE_IMG_PATH = "https://admin.glamcode.in/user-uploads/locations/";
    static BASE_APP_PATH = "https://admin.glamcode.in";
};

export const range = (from, to, step) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);