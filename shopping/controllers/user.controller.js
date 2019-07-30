module.exports.signup = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup.view.hbs', { 
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}
module.exports.profile = function(req, res, next) {
    res.render('user/profile.view.hbs');
}
module.exports.signin = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin.view.hbs', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}
module.exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports.notLoggedIn = function(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}
module.exports.url = function(req, res, next) {
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
}