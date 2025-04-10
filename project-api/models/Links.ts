import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortCodeUrl: {
        type: String,
        required: true,
    }
})

const Link = mongoose.model('link', LinkSchema);
export default Link;
