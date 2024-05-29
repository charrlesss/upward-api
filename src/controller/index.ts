import express from "express";
import Authentication, { ValidateToken, dbURL, logout } from "./Authentication";
import Reference from "./Reference";
import Task from "./Task";
import Reports from "./Reports";
import Template from "./Template";
import Dashboard from "./dashboard";

export let __DB_URL = "";

const router = express.Router();

router.use(Authentication);
router.use(ValidateToken);
router.use((req, res, next) => {
  const dbURLKey = req.cookies["db-k-d"];
  const URL = dbURL.filter((itm) => itm.key === dbURLKey);
  __DB_URL = URL[0].url;
  next();
});
router.use(Dashboard);
router.use(Reference);
router.use(Task);
router.use(Reports);
router.use(Template);
router.get("/logout", logout);

export default router;
