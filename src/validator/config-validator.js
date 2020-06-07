/**
 * Validate object against schema
 * @param {object} schema
 * @param {object} config
 * @return {boolean}
 */
export default function configValidator(schema, config) {
    const { error } = schema.validate(config);
    if (error) {
        throw error;
    }
    return true;
}
