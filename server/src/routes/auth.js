import express from 'express';
// import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', (req, res) => res.json({ msg: 'Register logic goes here' }));
router.post('/login', (req, res) => res.json({ msg: 'Login logic goes here' }));

export default router;
