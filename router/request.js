const express = require("express");
const router = express.Router();
const controller = require("../controller/request");

router.post("/sendRequest", controller.sendRequest);
router.get("/getRequest", controller.getRequest);
router.put("/xacNhanYeuCau", controller.xacNhanYeuCau);
router.put("/tuChoiYeuCau", controller.tuChoiYeuCau);
router.get("/getRequestObject", controller.getRequestObject);

module.exports = router;
