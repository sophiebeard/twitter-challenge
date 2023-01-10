import express from 'express';
import Peep from '../models/peep.model.js';
import { check, validationResult } from 'express-validator';
const router = express.Router();

router.route(`/`)
    .post([
        check(`textPeep`).exists().isLength({ max: 280 }).matches(/^[a-zA-Z0-9!?.@_', ]*$/)
    ],
        (req, res) => {
            const errors = validationResult(req);
            const peepToSave = new Peep(req.body);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    'message': 'Invalid peep input data',
                    'error': errors.array()
                });
            }
            peepToSave.save()
                .then(() => res.status(201).json({ 'message': 'Peep successfully peeped!' }))
                .catch(err => res.status(422).json({ 'message': 'Peep upload unsuccessful' }));
        });

export { router as post };