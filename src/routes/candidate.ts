import {
  appliedJobs,
  applyToJobs,
  getAvailableJobs,
} from "../controllers/candidate";
import express from "express";

const router = express.Router();

router.post("/candidate/jobs/apply", applyToJobs as express.RequestHandler);
router.get("/candidate/jobs/:id", appliedJobs as express.RequestHandler);
router.get(
  "/candidate/jobs/available",
  getAvailableJobs as express.RequestHandler
);

export default router;
