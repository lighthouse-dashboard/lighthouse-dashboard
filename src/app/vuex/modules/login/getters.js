export const isLoggedIn = (state) => state.jwt !== null;
export const jwtData = (state) => JSON.parse(atob(state.jwt.split('.')[1]));
