export const parameters = {
    "env": "test",
    "BASIC_PASS": process.env.BASIC_PASS,
    "SECRET": process.env.SECRET,
};

export const services = {
    "controller.project": {
        "file": "../controller/ProjectController",
        "arguments": [
            "@service.project"
        ]
    },
    "controller.build": {
        "file": "../controller/BuildController",
        "arguments": [
            "@service.project",
            "@service.build",
            "@service.artifact",
            "@service.dreiguard",
            "@service.dreihouse",
        ]
    },
    "controller.login": {
        "file": "../controller/LoginController",
        "arguments": [
            "%BASIC_PASS%",
            "%SECRET%"
        ]
    },
    "controller.version": {
        "file": "../controller/VersionController"
    }
};
