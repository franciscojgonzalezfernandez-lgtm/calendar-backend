const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

eventSchema.method('toJSON', function () {
    // Convert mongoose document to plain object and normalize ids
    const obj = this.toObject();
    const { __v, _id, ...object } = obj;
    object.id = _id;

    // If the user was populated, convert its _id to id as well
    if (object.user && typeof object.user === 'object') {
        if (object.user._id) {
            object.user.id = object.user._id;
            delete object.user._id;
        }
        // Remove possible __v from populated user
        if (object.user.__v !== undefined) delete object.user.__v;
    }

    return object;
});

module.exports = model('Event', eventSchema);   