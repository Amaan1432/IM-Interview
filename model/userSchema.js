const mogoose= require('mogoose')

const userSchema= new mogoose.Schema({
    email:{
        type:String,
        required : true,
        unique : true
    },
    name:{
        type:String,
        required : true,
    },
    password :{
        type:String,
        required : true,
    }
},
{
    timestamps:true
})

model.export.User = mongoose.model('User',userSchema);