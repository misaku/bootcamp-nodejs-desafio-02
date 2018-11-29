const { User } = require("../models");

const saveRedirectSession = require("../utils");

class SessionController {
    create (req, res) {
        return res.render("auth/signin");
    }

    async store (req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash("error", "Usuário não encontrado");
            return saveRedirectSession(req, res, "/");
        }
        if (!await user.checkPassword(password)) {
            req.flash("error", "Senha Invalida");
            return saveRedirectSession(req, res, "/");
        }
        req.session.user = user;
        return saveRedirectSession(req, res, "/app/dashboard");
    }

    destroy (req, res) {
        req.session.destroy(() => {
            res.clearCookie("root");
            res.redirect("/");
        });
    }
}

module.exports = new SessionController();
