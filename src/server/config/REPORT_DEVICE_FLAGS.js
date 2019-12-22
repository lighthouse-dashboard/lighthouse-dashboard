export const DEVICES = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
};


export const DEVICE_DESKTOP_FLAGS = {
    emulatedFormFactor: 'desktop',
    throttlingMethod: 'provided',
};

export const DEVICE_MOBILE_FLAGS = {
    emulatedFormFactor: 'mobile',
    // throttlingMethod: 'provided',
};

export const DEVICE_CONFIG = {
    [DEVICES.DESKTOP]: DEVICE_DESKTOP_FLAGS,
    [DEVICES.MOBILE]: DEVICE_MOBILE_FLAGS,
};
