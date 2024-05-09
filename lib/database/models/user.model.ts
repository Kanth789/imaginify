import { Document, Schema, model, models } from "mongoose";

export interface User extends Document {
    email: string;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
    planId: number;
    creditBalance: number;
    clerkId:string
}
  

const UserSchema = new Schema({
    clerkId:{ type: String, required: true,unique:true  },
  email: { type: String, required: true,unique:true },
  username: { type: String, required: true,unique:true  },
  photo: { type: String, required: true,unique:true  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  planId: { type: Number, required: true  },
  creditBalance:  { type: Number, default:10 }
  
});


const User = models?.User || model('User',UserSchema)

export default User