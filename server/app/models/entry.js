var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var EntrySchema   = new Schema({
    //entry_id : { type: Number, required: true, unique: true },
    headline: String,
    detail: String,
    link: String,
    tags: [String],
    likes: Number
});

EntrySchema.plugin(autoIncrement.plugin, { model: 'Entry', field: 'entry_id' });

module.exports = mongoose.model('Entry', EntrySchema);
