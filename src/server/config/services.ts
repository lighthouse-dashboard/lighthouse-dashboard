export const parameters = {
    "env": "test"
};

export const imports = [
    './controllers'
];

export const services = {
    "service.api": {
        "file": "../service/ApiService",
        "arguments": [
            "%env%"
        ]
    },
    "service.project": {
        "file": "../service/ProjectService",
        "arguments": [
            "@service.api"
        ]
    },
    "service.build": {
        "file": "../service/BuildService",
        "arguments": [
            "@service.api"
        ]
    },
    "service.artifact": {
        "file": "../service/ArtifactService",
        "arguments": [
            "@service.api"
        ]
    }
};
