import { createJob, getApplicants } from "../controllers/recruiter";
import express from "express";

const router = express.Router();

router.post("/recruiter/jobs/create", createJob as express.RequestHandler);
router.get(
  "/recruiter/applicants/:jobId",
  getApplicants as express.RequestHandler
);

export default router;
