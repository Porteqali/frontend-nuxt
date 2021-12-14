import googleOauth20 from "passport-google-oauth20";
import passport from "passport";

export default () => {
    passport.use(
        "googleLogin",
        new googleOauth20.Strategy(
            {
                clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
                clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
                callbackURL: "/auth/login/google/callback",
            },
            async (accessToken, refreshToken, profile, callback) => {
                callback(null, profile);
            }
        )
    );
};
