const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
router.post("/signIn", controller.signIn);
router.post("/signUp", controller.signUp);
router.post("/congTien", controller.congTien);
router.post("/truTien", controller.truTien);
router.post("/kiemTraSoTien", controller.kiemTraSoTien);

router.put("/dongTaiKhoan", controller.dongTaiKhoan);
router.put("/moTaiKhoan", controller.moTaiKhoan);
router.get("/getUser", controller.getUser);
module.exports = router;
