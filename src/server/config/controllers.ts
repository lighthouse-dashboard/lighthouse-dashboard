export const parameters = {
    "env": "test",
    "BASIC_PASS": process.env.BASIC_PASS,
    "SECRET": process.env.SECRET,
};

export const services = {
    "controller.project": {
        "file": "../api/project/ProjectController",
        "arguments": [
            "@service.project"
        ]
    },
    "controller.build": {
        "file": "../api/build/BuildController",
        "arguments": [
            "@service.project",
            "@service.build",
            "@service.artifact",
            "@service.dreiguard",
            "@service.dreihouse",
        ]
    },
    "controller.login": {
        "file": "../api/login/LoginController",
        "arguments": [
            "%BASIC_PASS%",
            "%SECRET%"
        ]
    },
    "controller.version": {
        "file": "../api/version/VersionController"
    }
};
