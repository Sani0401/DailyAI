import mongoose, { Types } from "mongoose";

const AdminSchema = mongoose.Schema({
    email: {type: String, required: true},
    passsword: {type:String, required: true},
})

const Admin = mongoose.model("Admin", AdminSchema);


export default Admin;
