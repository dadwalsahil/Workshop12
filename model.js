const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema({
    employeeID :Number,
    employeeName : String,
    employeeRole : String
});

schema.plugin(mongoosePaginate);

var employeeSchema = mongoose.model('Empdata',schema);
module.exports = employeeSchema;


