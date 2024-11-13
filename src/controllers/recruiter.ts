import { Request, Response } from "express";
import { prisma } from "../db/db";

// get available jobs

export const createJob = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // create a new job
    const job = await prisma.job.create({
      data: {
        ...data,
      },
    });

    if (!job) {
      res.status(500).json({
        error: "Unable to create job",
      });
    }

    return res.status(200).json({
      message: "Job Created",
      data: {
        jobId: job.id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};

// get applicants
export const getApplicants = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const applicants = await prisma.jobApplication.findMany({
      where: {
        jobId: jobId,
      },
      select: {
        candidateId: true,
      },
    });

    if (!applicants) {
      res.status(500).json({
        error: "Unable to get applicants",
      });
    }
    // get applicants ids in array
    const ids = applicants.map((applicant) => applicant.candidateId);

    res.status(200).json({
      data: ids,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};
