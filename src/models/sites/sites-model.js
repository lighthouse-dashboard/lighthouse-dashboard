import mongoose from '../mongoose';

export default mongoose.model('sites', {
    id: String,
    name: String,
    url: String,
    device: String,
    order: Number,
    is_favorite: Boolean,
    last_audit: String,
    is_scheduled: Boolean,
    thumbmail: String,
    disabled: { type: Boolean, default: false },
});
