import mongoose from 'mongoose';

const peepSchema = new mongoose.Schema({
    namePeep: {
        type: String,
        required: true
    },
    lastNamePeep: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    timePeep: {
        type: Date,
        default: Date.now,
        required: true
    },
    textPeep: {
        type: String,
        required: [true, `No peep found`],
        match: [/^[a-zA-Z0-9!?.@_', ]*$/, `Invalid characters - peeps can only contain letters and numbers`],
        maxlength: [280, `A peep can be a maximum of 280 characters`]
    }
});

const Peep = mongoose.model('Peep', peepSchema);

export default Peep;




