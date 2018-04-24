import {Request} from "hapi";

const md5 = require('md5');
const boom = require('boom');

export default async (req: Request) => {
    const {password} = <any>req.payload;
    if (md5(password) === process.env.BASIC_PASS) {
        return {token: process.env.SECRET};
    }

    return boom.forbidden();
};
