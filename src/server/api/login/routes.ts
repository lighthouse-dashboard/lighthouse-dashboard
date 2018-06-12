import {Request, ServerRoute} from "hapi";

import LoginController from './LoginController';
import Container from 'servicecontainer/bin/Container';

const joi = require('joi');

export default function (container: Container): ServerRoute[] {
    return [
        {
            method: 'POST',
            path: '/auth/login',
            handler: (req: Request) => container.get<LoginController>('controller.login').login(req),
            options: {
                auth: false,
                validate: {
                    payload: {
                        password: joi.string().min(6)
                            .max(32)
                            .required()
                            .description('Password'),
                    },
                },
            },
        },
    ];
}
