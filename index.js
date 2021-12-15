const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./model");
app.use(express.json());
var mongoosePaginate = require('mongoose-paginate');
const res = require("express/lib/response");



mongoose.connect("mongodb://localhost:27017/Empdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", (connected) => {
    console.log("connection with database");
  });

 
  


app.post('/addempdata' ,async (req , res) => {
    const user = new User({
        employeeID :req.body.employeeID,
        employeeName :req.body.employeeName,
        employeeRole : req.body.employeeRole
          


    });
    let result = await user.save();
    console.log(req.file);
    res.send(result);
    
  });


  const getPagination = (page, size) => {
    const limit = size ? +size : 4;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };



User.findAll = (req, res) => {
    const { page, size , title } = req.query;
    var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
  
    const { limit, offset } = getPagination(page, size);
    User.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        EmpData: data.docs,
        totalPages: data.totalPages,
        
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving Employee Data",
      });
    });
};




app.get('/Allemployees' , User.findAll);

app.get("/sort" ,(req , res) =>{
    try{
    const user = User.find().sort({employeeID:-1})
    .exec()
    .then(user =>{
        res.status(200).json({
            allEmployee:user
        })
    })
}catch(err){
    res.status(500).json({
        error:err
    });
}
})

app.listen(3000);