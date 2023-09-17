const mogoose= require('mogoose')

const finalScoresSchema= new mogoose.Schema({
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

model.export.Scores = mongoose.model('Scores',finalScoresSchema);