/**
 * Get infos to store from a git commit object
 * @param {object} commit git commit webhook payload
 * @return {{git_commit: *, message: *}|{}}
 */
export default function getMetaFromCommit(commit) {
    if (!commit) {
        return {};
    }

    const { message, id } = commit;

    return {
        message,
        git_commit: id,
    };
}

/**
 *
 * @param {hapi.Request} request
 */
export function getMetaFromGithubWebhook(request) {
    if (!request.payload) {
        return {};
    }

    // eslint-disable-next-line camelcase
    const { head_commit } = request.payload;
    return getMetaFromCommit(head_commit);
}
