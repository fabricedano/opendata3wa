
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;

const User = require('./models/User.models')


module.exports = function(passport) {
    //Stratégie Locale
    // ----

    const LocalStrategyConfig = {
        usernameField: 'email', // en fonction du name="" du champs input type text
        passwordField: 'pwd1', // en fonction du name="" du champs input type password
    }

    passport.use(new LocalStrategy(LocalStrategyConfig, (email, password, done) => {
        // On vérifie ici les identifiants de notre utilisateur        
        /*
        	Si ils sont bons, on redonne la main à "passport" avec cette ligne :
        
                done(null, user);

            En cas de problème, on redonnera la main à "passport" avec :
            
            	done(null, false, {message: err.message});
        */
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    // Invocation du handler done() de `passport` à la manière d'une erreur --> le middleware `passport.authenticate` répondra avec une erreur
                    done(null, false, {message: 'Adresse email invalide!'})
                    return Promise.reject() // fait également échouer notre chaîne de Promesses JS
                }
                return user;
            })
            .then(user => User.verifyPass(password, user))
            .then(user => {
                // Si on est arrivé jusqu'ici sans erreur, c'est que les identifiants semblent valides.
                // ---> Fin de l'authentification, on transmet l'objet 'user' à la méthode done() de passport, et le middleware `passport.authenticate` répondra avec une nouvelle session user
                done(null, user);
            })
            .catch(err => {
                if (err)
                    done(null, false, {message: err.message});
            });
    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });
}
