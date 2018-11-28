export const parameters = {
    'env': 'test',
    'BASIC_PASS': process.env.BASIC_PASS || '21232f297a57a5a743894a0e4a801fc3',
    'SECRET': process.env.SECRET || 'MYKV626FMzunTrUw4h',
};

export const services = {
    'controller.project': {
        'file': '../api/project/ProjectController',
        'arguments': [
            '@service.project',
        ],
    },

    'controller.build': {
        'file': '../api/build/BuildController',
        'arguments': [
            '@service.project',
            '@service.build',
            '@service.artifact',
            '@service.dreiguard',
            '@service.dreihouse',
        ],
    },

    'controller.login': {
        'file': '../api/login/LoginController',
        'arguments': [
            '%BASIC_PASS%',
            '%SECRET%',
        ],
    },

    'controller.version': {
        'file': '../api/version/VersionController',
    },
};
