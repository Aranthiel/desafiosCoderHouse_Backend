import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    github_clientID: process.env.GITHUB_CLIENT_ID,
    github_clientSecret: process.env.GITHUB_CLIENT_SECRET,
    github_callbackURL: process.env.GITHUB_CALLBACK_URL,
}