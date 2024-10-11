import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema (
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        grade: { type: String, required: true },
        roll: { type: String, required: true,unique: true },
        email:{type: String, required: true, lowercase: true},
        password:{type: String, required: true}
    },{
        timestamps:true,
        versionKey:false,
    }
)
const studentModel = mongoose.model("students",studentSchema);
export default studentModel;