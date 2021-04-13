import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  dob: string;
  verified: boolean;
  adresses: [
    {
      place: string;
      apartment: string;
      location: string;
      landmark?: string;
      city: string;
      state: string;
      pinCode: string;
      geoLocation: {
        type: string;
        coordinates: [number];
      };
    }
  ];
  comparePassword(password: String): Boolean;
  superAdmin: boolean;
   usersInBlock: [ObjectId];
}
