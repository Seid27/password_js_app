const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);

});


console.log(process.env.DATABASE);
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex :true,
    useFindAndModify: false 
});

mongoose.promise = global.promise;
mongoose.connection
.on('connected',()=>{
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
})
.on('error',(err)=>{
    console.log(`Connection error: ${err.message}`);
})

