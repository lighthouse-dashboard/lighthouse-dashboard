/**
 * Validate object against schema
 * @param {joi.AnySchema} schema
 * @param {DashboardConfig} config
 * @return {boolean}
 */
export default function configValidator(schema, config) {
    const { error } = schema.validate(config);
    if (error) {
        throw error;
    }
    return true;
}
