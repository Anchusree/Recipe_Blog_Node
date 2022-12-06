const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types 

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    description:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String,
        required:'This field is required'
    },
    instructions:{
        type:String,
        required:'This field is required'
    },
    ingredients:{
        type:Array,
        required:'This field is required'
    },
    category:{
        type:String,
        enum:['Thai','American','Chineese','Indian','Mexican','Italian'],
        required:'This field is required'
    },
    image:{
        type:String,
        required:'This field is required'
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})
recipeSchema.index({name:'text',description:'text'})
// recipeSchema.index({'$**': 'text'})

module.exports = mongoose.model('Recipe',recipeSchema)