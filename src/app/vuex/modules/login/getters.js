export const jwtData = (state) => JSON.parse(atob(state.jwt.split('.')[1]));
