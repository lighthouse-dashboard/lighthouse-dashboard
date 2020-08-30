export default function validate(decoded) {
    return { isValid: decoded.token === process.env.API_SECRET };
};
