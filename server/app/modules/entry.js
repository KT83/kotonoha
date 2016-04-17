var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrySchema   = new Schema({
    entry_id : { type: Number, required: true, unique: true },
    headline: String,
    detail: String,
    link: String,
    tags: [String],
    likes: Number
});

module.exports = mongoose.model('Entry', EntrySchema);
