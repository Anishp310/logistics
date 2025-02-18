import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../../controllers/job/jobController.js';
import { validateJob } from '../../utils/validateJob.js';

const router = express.Router();

router.post('/jobs', validateJob, createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', validateJob, updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;
