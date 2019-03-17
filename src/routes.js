// IMPORTS -------------------------------------------------------------------------------------------------------------
const express = require("express");
const multerConfig = require("./config/multer");

// CONTROLLERS IMPORTS -------------------------------------------------------------------------------------------------
const UserController = require("./app/controllers/UserController");
const AppointmentController = require("./app/controllers/AppointmentController");
const AvaliableController = require("./app/controllers/AvaliableController");
const SessionController = require("./app/controllers/SessionController");
const FileController = require("./app/controllers/FileController");
const DashboardController = require("./app/controllers/DashboardController");
const ListController = require("./app/controllers/ListController");

// MEDDLEWARES IMPORTS -------------------------------------------------------------------------------------------------
const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");
const upload = require("multer")(multerConfig);

// INICIANDO ROTAS -----------------------------------------------------------------------------------------------------
const routes = express.Router();

// ROTAS MIDDLEWARES ---------------------------------------------------------------------------------------------------
routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash("success");
    res.locals.flashError = req.flash("error");
    return next();
});
routes.use("/app", authMiddleware);

// ROTAS GETS ----------------------------------------------------------------------------------------------------------
routes.get("/file/:file", FileController.show);
routes.get("/", guestMiddleware, SessionController.create);
routes.get("/app/appointments/new/:provider", AppointmentController.create);
routes.get("/app/avaliable/:provider", AvaliableController.index);
routes.get("/app/logout", SessionController.destroy);
routes.get("/signup", guestMiddleware, UserController.create);
routes.get("/app/dashboard", DashboardController.index);
routes.get("/app/list", ListController.index);
routes.get("/app/list/:date", ListController.filter);

// ROTAS POSTS ---------------------------------------------------------------------------------------------------------
routes.post("/app/appointments/new/:provider", AppointmentController.store);
routes.post("/signin", SessionController.store);
routes.post("/signup", upload.single("avatar"), UserController.store);

// EXPORTANDO ROTAS ----------------------------------------------------------------------------------------------------
module.exports = routes;
