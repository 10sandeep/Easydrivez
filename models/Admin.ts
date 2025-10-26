// import mongoose, { Schema, Document, Model } from "mongoose";


// interface IAdmin extends Document {
//   username: string;
//   email: string;
//   password: string;
//   img?: string;
//   phone?: string;
// }


// const AdminSchema = new Schema<IAdmin>({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   img: { type: String },
//   phone: { type: String },
// });


// const Admin: Model<IAdmin> =
//   (mongoose.models.Admin as Model<IAdmin>) ||
//   mongoose.model<IAdmin>("Admin", AdminSchema);

// export default Admin;
