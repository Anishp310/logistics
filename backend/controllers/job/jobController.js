import { validationResult } from 'express-validator';
import { Job } from '../../models/jobModel.js';  // Adjust path as necessary

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { consigneeDetails, consignerDetails, billingDetails, jobInformation, dateAndTime, locationDetails, additionalInformation, productDetails, createdBy } = req.body;

    const newJob = new Job({
      consigneeDetails,
      consignerDetails,
      billingDetails,
      jobInformation,
      dateAndTime,
      locationDetails,
      additionalInformation,
      productDetails,
      createdBy,
    });

    await newJob.save();

    return res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
};

// Update a job by ID
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { consigneeDetails, consignerDetails, billingDetails, jobInformation, dateAndTime, locationDetails, additionalInformation, productDetails, createdBy } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        consigneeDetails,
        consignerDetails,
        billingDetails,
        jobInformation,
        dateAndTime,
        locationDetails,
        additionalInformation,
        productDetails,
        createdBy
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found to update' });
    }

    return res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({ message: 'Failed to update job', error: error.message });
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found to delete' });
    }

    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
};
