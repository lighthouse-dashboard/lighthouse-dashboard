import {Request} from "hapi";

const md5 = require('md5');
const boom = require('boom');

export default class LoginController {
    private secret: string;
    private pass: string;

    constructor(pass: string, secret: string) {
        this.pass = pass;
        this.secret = secret;
    }

    public login(req: Request) {
        const {password} = <any>req.payload;
        if (md5(password) === process.env.BASIC_PASS || process.env.BASIC_PASS === null) {
            return {token: process.env.SECRET};
        }

        return boom.forbidden();
    }

}
