export default function colorPreference() {
    const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferDark ? 'dark' : 'light';
}
