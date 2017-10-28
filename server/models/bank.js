var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bankSchema = new Schema({
    name: { type: String },
    address: { type: String },
    contact: { type: String },
    email: { type: String },
    pleas: [
        {
            bloodGrp: { type: String, enum: [ "O+ve", "O-ve", "B+ve", "B-ve", "AB+ve", "AB-ve", "A+ve", "A-ve" ] },
            bloodQuantity: { type: String },
            content: { type: String },
            dueDate: { type: String },
            isOver: { type: Boolean }
        }        
    ] 
});

var bankSchema = mongoose.model('bank', bankSchema);

module.exports = bankSchema;