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
