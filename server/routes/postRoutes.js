const express = require('express')

const router = express.Router()

const {postController} = require('../controllers/postController')

const authorize = require('../middlewares/authorize')

router.post('/createPost', postController.createPost)

router.get('/getPosts', authorize, postController.getPosts)

router.get('/getUserPostsImages', authorize, postController.getUserPostedImages)

router.get('/getAUserPostsImages/:id', postController.getAUserPostedImages)

router.post('/likePost', authorize, postController.likePost)

router.get('/getLikes/:id', postController.getLikes)

module.exports = router


