export const parameters = {
    "env": "test"
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
        ]
    }
}
