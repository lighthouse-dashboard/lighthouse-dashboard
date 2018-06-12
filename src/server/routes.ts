import {ServerRoute} from "hapi";
import ServiceContainer from 'servicecontainer';

import BuildRoutes from './api/build/routes';
import LoginRoutes from './api/login/routes';
import VersionRoutes from './api/version/routes';
import ProjectRoutes from './api/project/routes';

export default function () {
    const container = ServiceContainer.get();
    if (!container) {
        throw new Error('Container not created');
    }

    let routes: ServerRoute[] = [];
    routes.push(...BuildRoutes(container));
    routes.push(...LoginRoutes(container));
    routes.push(...VersionRoutes(container));
    routes.push(...ProjectRoutes(container));

    routes.concat([
        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '../dist/app',
                    index: ['index.html'],
                },
            },
            options: {
                auth: false,
            },
        },
    ]);

    return routes;
}
