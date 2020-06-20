import JWT from 'jsonwebtoken';

export default function loginService(password) {
    const { LOGIN_PASS, API_SECRET, JWT_SECRET } = process.env;
    if (password === LOGIN_PASS) {
        const jwt = JWT.sign({ token: API_SECRET }, JWT_SECRET);
        return { jwt };
    }

    return null;
}
