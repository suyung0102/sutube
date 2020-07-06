import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "SuTuBe";
    res.locals.routes = routes;
    next();
};