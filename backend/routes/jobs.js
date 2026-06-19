const express = require("express");
const router = express.Router();

let jobs = [];

// GET all jobs
router.get("/", (req, res) => {
    res.json(jobs);
});

// POST new job
router.post("/", (req, res) => {
    const job = {
        id: Date.now(),
        ...req.body
    };

    jobs.push(job);
    res.json(job);
});

// UPDATE job
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    jobs = jobs.map(job =>
        job.id === id ? { ...job, ...req.body } : job
    );

    res.json({
        message: "Job updated"
    });
});

// DELETE job
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    jobs = jobs.filter(job => job.id !== id);

    res.json({
        message: "Job deleted"
    });
});

module.exports = router;