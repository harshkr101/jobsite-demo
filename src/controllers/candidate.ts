import { Request, Response } from "express";
import { prisma } from "../db/db";
import { JobStatus } from "@prisma/client";

// get available jobs

export const getAvailableJobs = async (req: Request, res: Response) => {
  try {
    // fetch all available jobs
    const jobs = await prisma.job.findMany({
      where: {
        status: JobStatus.AVAILABLE,
      },
    });
    res.status(200).json({
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};

export const applyToJobs = async (req: Request, res: Response) => {
  try {
    const jobId = req.body.jobId;
    const candidateId = req.body.candidateId;

    if (!jobId || !candidateId) {
      res.status(400).json({ error: "Invalid data" });
    }

    // create new job application
    const jobApplication = await prisma.jobApplication.create({
      data: {
        candidateId: candidateId,
        jobId: jobId,
      },
      select: {
        id: true,
      },
    });

    if (!jobApplication) {
      res.status(500).json({
        error: "Unable to create job application",
      });
    }

    //TODO: Add a mailer to notify user and recruiter

    res.status(200).json({
      message: "Job Applied successfully",
      data: {
        applicationId: jobApplication.id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};

// get applied jobs
export const appliedJobs = async (req: Request, res: Response) => {
  const candidateId = req.params.id;
  if (!candidateId) {
    res.status(400).json({
      error: "Invalid Input",
    });
  }
  // fetch all applied jobs
  const appliedJobs = await prisma.user.findMany({
    where: {
      id: candidateId,
    },
    select: {
      applications: true,
    },
  });
  res.status(200).json({
    data: appliedJobs,
  });
};
