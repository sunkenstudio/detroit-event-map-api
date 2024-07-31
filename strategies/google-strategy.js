import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { Users } from "../models/users.js";

passport.use(new Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['email']
    }, async (accessToken, refreshToken, profile, done) => {
        let existingUser;
        const email = profile._json.email;
        try{
            existingUser = await Users.findOne({email});
        }
        catch(err){
            return done(err, null);
        }

        try{
            if(!existingUser){
                const newUser = await Users.create({email});
                return done(null, newUser);
            }
            return done(null, existingUser);
        }
        catch(err){
            return done(err, null);
        }
    
    }));
    
// Skip session handling
passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});
