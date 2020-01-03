export default {
    jwt: localStorage.getItem('JWT') || null,
    isLoggedIn: localStorage.getItem('JWT') !== null || false,
};
