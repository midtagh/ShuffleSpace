import mongoose from 'mongoose';

const {Schema} = mongoose;

const CustomerSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{ timestamps : true})

export default mongoose.model('CustomerSchema', CustomerSchema, 'Customers')