import mongoose from 'mongoose';

const {Schema} = mongoose;

const TimeShiftSchema = new Schema({
    workerId:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    start:{
        type: Date,
    },
    end:{
        type: Date
    }
},{timestamps : true, _id : false})

const ProjectSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timeShifts:{
        type: [TimeShiftSchema]
    }
},{ timestamps : true})

export default mongoose.model('ProjectSchema', ProjectSchema, 'Projects')