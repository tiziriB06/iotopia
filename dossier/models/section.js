const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
    type_sct: { type: String, required: true },
    img_sct: { type: String },
    description_sct: { type: String }
}, { timestamps: true });  

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
