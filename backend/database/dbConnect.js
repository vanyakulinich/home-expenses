const mongoose = require('mongoose');
const url = require('./config')

mongoose.connect(url, (err)=>{
    if (err) throw err;
    console.log('Successfully connected')
})



module.exports = mongoose;