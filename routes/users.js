import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();


router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send('Hello user, you are authenticated')
    next()
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send('You are logged in and you can delete your account')
    next()
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send('Hello admin, you are logged in')
    next()
})


router.put("/:id", updateUser);
router.delete("/:id", deleteUser) 
router.get('/:id', getUser)
router.get('/', getUsers)

export default router;