export const parameters = {
    "env": "test"
};

export const imports = [
    './controllers'
];

export const services = {
    "service.api": {
        "file": "../Service/ApiService",
        "arguments": [
            "%env%"
        ]
    },
    "service.project": {
        "file": "../Service/ProjectService",
        "arguments": [
            "@service.api",
            "@service.dreihouse",
            "@service.build",
            "@service.artifact"
        ]
    },
    "service.build": {
        "file": "../Service/BuildService",
        "arguments": [
            "@service.api"
        ]
    },
    "service.artifact": {
        "file": "../Service/ArtifactService",
        "arguments": [
            "@service.api"
        ]
    },
    "service.dreiguard": {
        "file": "../Service/DreiguardService",
        "arguments": [
            "@service.artifact",
            "@service.imagereplace",
        ]
    },
    "service.dreihouse": {
        "file": "../Service/DreihouseService",
        "arguments": [
            "@service.artifact"
        ]
    },
    "service.imagereplace": {
        "file": "../Service/DreiguardImageReplaceService",
        "arguments": []
    }
};
