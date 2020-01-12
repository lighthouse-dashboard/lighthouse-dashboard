export const COLOR_PREFER_DARK = (typeof window === 'undefined') ? false : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
export default COLOR_PREFER_DARK;
