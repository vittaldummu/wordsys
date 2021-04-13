import { Mongoose, Schema, Types, model } from 'mongoose';
import { Imessage } from './classes/message';
const messageSchema: Schema = new Schema({
  messageId: { type: Types.ObjectId },
  messageText: { type: String, required: true },
  // messageAttachments:[
  //   {
  //     type: String
  //   }
  // ],
  sender: { type: Types.ObjectId, required: true },
  receiver: { type: Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  // edited: {type: Boolean},
  // editAt: {type: Date},
  // deleted: {type: Boolean},
  // deletedAt: {type: Date}
});

const chatSchema: Schema = new Schema(
  {
    chatId: { type: String }, //(a)dminId-(b)uyer  || (a)dmin - (s)eller || (b)uyer - (s)eller
    members: [
      {
        user1: { type: Types.ObjectId },
        user2: { type: Types.ObjectId },
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

//save message
messageSchema.pre('save', function (next) {
  let message = this;
  console.log('message saved', this);
  next();
});

//save chat
chatSchema.pre('save', function (next) {
  let chat = this;
  console.log('chat saved', this);
  next();
});

export const Message = model<Imessage>('message', messageSchema);
export const Chat = model('chat', chatSchema);
