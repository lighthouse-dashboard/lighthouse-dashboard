import {Request} from "hapi";

require('dotenv').config();

export default {
    allowQueryToken: true,
    validate: async (request: Request, token: string) => {
        const isValid = token === process.env.SECRET;

        const credentials = { token };
        const artifacts = { };

        return { isValid, credentials, artifacts };
    }
};
