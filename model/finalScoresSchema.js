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
    }
},
{
    timestamps:true
})

model.export.User = mongoose.model('User',finalScoresSchema);