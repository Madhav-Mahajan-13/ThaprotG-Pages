import express from 'express';
import { getUser } from '../middleware';
const {body,validationResult} = require('express-validator');

export const router = express.router();

router.post('/login',userLogin);

router.post('/register',userRegister);

router.