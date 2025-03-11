import connectDB from '@/app/config/database';
import User from '@/app/models/User';
import { connect } from 'http2';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();

      // 2 . Check if user exists in database
      const userExisits = await User.findOne({ email: profile.email });
      // 3. If user exists, create user
      if (!userExisits) {
        await User.create({
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        });
      }
      // 4. Return true to allow user
      return true;
    },
    //Session callback function that modifies the session object
    async session({ session }) {
      //1. Get user from database
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      //2. Assign user if from the session
      session.user.id = user._id.toString();
      //3. Return session
      return session;
    },
  },
};

export default authOptions;
