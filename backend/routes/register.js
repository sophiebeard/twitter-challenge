import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user.model.js';
const router = express.Router();

router.route('/')
    .post([
        check(`namePeep`).exists().isLength({ min: 2 }).matches(/^[a-z]+$/i),
        check(`lastNamePeep`).exists().isLength({ min: 2 }).matches(/^[a-z]+$/i),
        check(`username`).exists().matches(/^[a-z0-9]+$/i),
        check(`email`).exists().isEmail().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        check(`password`).exists().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ],
        (req, res) => {
            const errors = validationResult(req);
            const { email } = req.body;
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    'message': 'Invalid registration data',
                    'error': errors.array()
                });
            }
            User.findOne({ email }, (err, user) => {
                if (user) {
                    res.send({ message: `This email has already been registered. Login instead.` })
                }
                else {
                    const registerUser = new User(req.body);
                    registerUser.save()
                        .then(() => res.status(201).json({
                            'user': user,
                            'message': 'User registration successful'
                        }))
                        .catch(err => res.status(422).json({
                            'error': err.message,
                            'message': 'Failure to register new user'
                        }));
                }
            });
        });

export { router as register };
