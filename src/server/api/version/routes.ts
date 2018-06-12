import {Request, ServerRoute} from "hapi";
import Container from 'servicecontainer/bin/Container';
import VersionController from './VersionController';
import {HOUR} from '../../config/route-constants';

const joi = require('joi');

export default function (container: Container): ServerRoute[] {
    return [
        {
            method: 'GET',
            path: '/api/version',
            handler: (req: Request) => container.get<VersionController>('controller.version').getVersion(req),
            options: {
                cache: {
                    expiresIn: HOUR,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get the current api version',
                validate: {
                    query: {
                        access_token: joi.string()
                            .description('API Secret. Can also be passed as Bearer token'),
                    },
                },
            },
        },
    ];
}
