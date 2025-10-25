import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String ,required: false},
    phone: { type: String ,required: false},
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
