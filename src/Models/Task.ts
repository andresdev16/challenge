import { Schema, model, Document } from 'mongoose'

export interface ITask extends Document {
    userId: string;
    name: string;
    details: string;
    date: Date;
    state: string;
    important: boolean;
}

const taskSchema = new Schema<ITask>({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 4

    },
    details: {
        type: String,
        default: null,
        min: 4
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',      
    },
    important: {
        type: Boolean,
        default: false,

    }
}, {
    timestamps: true
})

export default model<ITask>('Task', taskSchema);