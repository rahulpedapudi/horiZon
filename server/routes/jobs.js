import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        const response = await axios.get('https://remotive.com/api/remote-jobs');

        // Remotive returns all jobs, so we slice them here for performance/display
        const jobs = response.data.jobs ? response.data.jobs.slice(0, parseInt(limit)) : [];

        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

export default router;
