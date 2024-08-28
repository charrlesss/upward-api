import express from "express";
import Authentication, { ValidateToken, logout } from "./Authentication";
import Reference from "./Reference";
import Task from "./Task";
import Reports from "./Reports";
import Template from "./Template";
import Dashboard from "./dashboard";
import MasterAdminUser from "./MasterAdmin/user";
import os from "os";
const router = express.Router();

router.use(Authentication);
let userDetails: any = {};


router.post("/get-user-details", async (req, res) => {
  userDetails = req.body;
  res.send({ message: "successfully" });
});
router.get("/get-user-details", async (req, res) => {
  let DATABASE = userDetails.department  === 'UCSMI' ? "upward_insurance_ucsmi_new" : "upward_insurance_umis_new"
res.send(`[DATABASE]
SERVER:192.168.100.220
USERNAME:root
PASSWORD:charles
DATABASE:${DATABASE}
DEPARTMENT:${userDetails.department}
ACCESS:${userDetails.userAccess}
IS_ADMIN:${userDetails.is_admin === false ? "NO" : "YES"}
    `);
});
router.use(ValidateToken);
router.use(Dashboard);
router.use(Reference);
router.use(Task);
router.use(Reports);
router.use(Template);
router.use(MasterAdminUser);
router.get("/logout", logout);

export default router;
