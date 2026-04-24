import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ msg: 'Get all bookings logic here' }));
router.post('/', (req, res) => res.json({ msg: 'Create booking logic here' }));

export default router;
