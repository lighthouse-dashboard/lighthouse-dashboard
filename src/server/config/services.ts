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
            "@service.api",
            "@service.dreihouse",
            "@service.build",
            "@service.artifact"
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
    },
    "service.dreiguard": {
        "file": "../service/DreiguardService",
        "arguments": [
            "@service.artifact",
            "@service.imagereplace",
        ]
    },
    "service.dreihouse": {
        "file": "../service/DreihouseService",
        "arguments": [
            "@service.artifact"
        ]
    },
    "service.imagereplace": {
        "file": "../service/DreiguardImageReplaceService",
        "arguments": []
    }
};
