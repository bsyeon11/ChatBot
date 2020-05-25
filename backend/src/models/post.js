import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt';

const PostSchema = new Schema({
    symptom: String,
    visitDate: String,
    writtenDate: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;