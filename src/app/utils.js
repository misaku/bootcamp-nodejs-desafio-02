const saveRedirectSession = (req, res, redir) => {
    req.session.save(function (err) {
        if (err) {
            console.log(err);
        }
        return res.redirect(redir);
    });
};
module.exports = saveRedirectSession;
