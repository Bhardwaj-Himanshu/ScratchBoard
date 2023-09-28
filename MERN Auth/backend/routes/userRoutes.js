import express from 'express' //inorder to use express router
const router = express.Router();
import { authUser, logoutUser, registerUser, showProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,showProfile).put(protect,updateUserProfile);
// router.get('/profile',showProfile);
// router.put('/profile',updateUserProfile);

export default router;