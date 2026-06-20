const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

// GET all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST new job
router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const job = new Job({
            title: req.body.title,
            company: req.body.company,
            status: req.body.status
        });

        const savedJob = await job.save();

        res.status(201).json(savedJob);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// UPDATE job
router.put("/:id", async (req, res) => {
    try {

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                company: req.body.company,
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.json(updatedJob);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE job
router.delete("/:id", async (req, res) => {
    try {

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;