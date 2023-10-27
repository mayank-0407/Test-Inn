const { Router } = require("express");
const signUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const Reset  = require("../controllers/reset");
// const checkReset  = require("../controllers/checkReset");

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/auth", auth);
router.post("/reset", Reset);
// router.get("/reset/:id", checkReset);

module.exports = router;
