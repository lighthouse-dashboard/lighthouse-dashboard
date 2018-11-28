import {Request} from 'hapi';

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
        const {password} = req.payload as any;
        if (md5(password) === this.pass || this.pass === '') {
            return {token: this.secret};
        }

        return boom.forbidden();
    }

}
