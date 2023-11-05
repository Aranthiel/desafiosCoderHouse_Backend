import passport from "passport";
import { userManagerMongoose } from "./services/usersM.manager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

//https://www.npmjs.com/package/passport

// passport-local
passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                console.log('ejecutando passport.use signup desde passport.js')
                const allReadyExist = await userManagerMongoose.findUserByEmail(email);
                if (allReadyExist) {
                    console.log('allReadyExist en passport.js')
                    return done(null, false);
                }
                const hashedPassword = await hashData(password);
                const newUser = await userManagerMongoose.createUser({
                    ...req.body,
                    password: hashedPassword,
                });
                
                done(null, newUser);
            } catch (error) {
            done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
        usernameField: "email",
        },
        async (email, password, done) => {
            try {
                console.log('ejecutando passport.use login desde passport.js')
                const userByEmail = await userManagerMongoose.findUserByEmail(email);
                if (!userByEmail) {
                    console.log('!userByEmail en passport.js')
                return done(null, false);
                }
                const isValid = await compareData(password, userByEmail.password);
                if (!isValid) {
                    console.log('!isValid en passport.js')
                return done(null, false);
                }
                
                done(null, userByEmail);
            } catch (error) {
                done(error);
            }
        }
    )
); 

//serializeUser
//metodo interno de passport
//recupera el usuario y se queda solamente con el id
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

//deserializeUser
//metodo interno de passport
//con el id recupera la informacion del usuario
passport.deserializeUser(async function(id, done) {
    //mi codigo
    try {
        const user = await userManagerMongoose.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
});



