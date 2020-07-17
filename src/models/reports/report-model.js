import mongoose from '../mongoose';

export default mongoose.model('reports', {
    id: String,
    siteId: String,
    createdAt: Date,
    raw: { type: String, default: null },
    values: [{ id: String, value: Number }],
});
