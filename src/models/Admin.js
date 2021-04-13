import { Schema, model } from 'mongoose';
import { hash, genSalt } from 'bcryptjs';
import bcrypt, { genSaltSync, hashSync } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { IAdmin } from './classes/admin';
const adminSchema = new Schema({
  name: { type: String, required: true, minlength: 5 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  dob: {
    type: String,
  },
  verfied: {
    type: Boolean,
  },
  addresses: [
    {
      landmark: String,
      country: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      address: { type: String, required: true },
      geoLocation: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true,
        },
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
  ],
    usersInBlock: [{ type: Schema.Types.ObjectId }],
});

adminSchema.pre<IAdmin>('save', function (next) {
  var user = this;
  let hashh;
  if (!user.isModified('password')) return next();
  let salt = genSaltSync(10);
  let hash = hashSync(user.password, salt);
  user.password = hash;
  //console.log(user);
  next();
});

adminSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

// adminSchema.pre('save', (next) => {
//   const admin: IAdmin | any=this;
//   if (!admin.isModified('password')) return next();
//   genSalt(10)
//     .then((salt) => {
//       hash(admin.password, salt)
//         .then((pwd) => {
//           admin.password = pwd;
//         })
//         .catch((e) => next(e));
//     })
//     .catch((e) => next(e));
// });
export const Admin = model<IAdmin>('Admin', adminSchema);
