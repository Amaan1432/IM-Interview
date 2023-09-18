const mongoose= require('mongoose')

const finalScoresSchema= new mongoose.Schema({
    dsa:{
        type:Number,
        required : true,
    },
    webD:{
        type:Number,
        required : true,
    },
    react :{
        type:Number,
        required : true,
    },
    students:{
        type: mongoose.Types.ObjectId,
        ref: 'Students'
    }
},
{
    timestamps:true
})

module.exports.Scores = mongoose.model('Scores',finalScoresSchema);