const express = require('express')

const router = express.Router()

const {userController} = require('../controllers/userController')

const authorize = require('../middlewares/authorize')

router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.get('/getUser', authorize, userController.getUser)
router.get('/getAUser/:id', userController.getAUser)
router.get('/getUsers',authorize, userController.getUsers)
router.get('/check',authorize, userController.checkFollow)
router.get('/followers',authorize, userController.followers)
router.get('/following',authorize, userController.following)
router.get('/AUserfollowers/:id', userController.AUserFollowers)
router.get('/AUserfollowing/:id', userController.AUserfollowing)
router.get('/searchUser', userController.searchUsers)
router.post('/follow',authorize, userController.followUser)
router.post('/unfollow',authorize, userController.unfollowUser)
router.put('/update',authorize, userController.updateUser)


module.exports = router


