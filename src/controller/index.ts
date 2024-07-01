import express from "express";
import Authentication, { ValidateToken, logout } from "./Authentication";
import Reference from "./Reference";
import Task from "./Task";
import Reports from "./Reports";
import Template from "./Template";
import Dashboard from "./dashboard";
import MasterAdminUser from "./MasterAdmin/user";

const router = express.Router();

router.use(Authentication);
router.use(ValidateToken);
router.use(Dashboard);
router.use(Reference);
router.use(Task);
router.use(Reports);
router.use(Template);
router.use(MasterAdminUser);
router.get("/logout", logout);

export default router;
