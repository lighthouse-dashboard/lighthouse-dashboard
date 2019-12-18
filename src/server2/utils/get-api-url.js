export default function getApiUrl(path, token = process.env.CIRCLE_TOKEN) {
    return `https://circleci.com/api/v1.1${ path }?circle-token=${ token }`
}
