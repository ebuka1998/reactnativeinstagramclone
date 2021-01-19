const pool = require('../db/index')

const postController = {
    async createPost(req, res){
        const {post_image, created_by, post_description} = req.body

        try {
            const post = await pool.query("INSERT INTO posts (post_image, created_by, post_description) VALUES ($1, $2, $3) RETURNING *",[
                post_image, created_by, post_description
            ])

            res.status(201).send({message: 'post created successfully', post})
        } catch (error) {
            res.send(error, 'something went wrong')
        }
    },

    async getPosts(req, res) {
        try {
            const posts = await pool.query(
                "SELECT user_id, username, profile_image, post_id, post_image, likescount, post_description, posts.created_at as time_of_creation from users LEFT JOIN posts on users.user_id = posts.created_by JOIN follows on users.user_id = follows.followed_id  WHERE follows.follower_id = $1;", [req.user]
            )

            if (posts.rows.length < 0) {
                return res.status(401).json('no posts at this time')
            }

            res.status(200).send(posts)
        } catch (error) {
            res.status(404).send(error.message)
        }
    },
   
    async getUserPostedImages(req, res) {
        try {
            const postImages = await pool.query("SELECT post_id, post_image from posts WHERE created_by = $1", [req.user])
            if (postImages.rows.length < 0) {
                return res.status(401).json('no posts at this time')
            }
            res.send(postImages.rows)
        } catch (error) {
            res.status(404).send(error.message)
        }
    },
    
    async getAUserPostedImages(req, res) {
        try {
            const postImages = await pool.query("SELECT post_id, post_image from posts WHERE created_by = $1", [req.params.id])
            if (postImages.rows.length < 0) {
                return res.status(401).json('no posts at this time')
            }
            res.send(postImages.rows)
        } catch (error) {
            res.status(404).send(error.message)
        }
    },

    async likePost(req, res) {
        const {post_id, user_id, username} = req.body
        try {
            const likes = await pool.query("SELECT postliked_id, userthatliked_id FROM likes WHERE postliked_id = $1 AND userthatliked_id = $2;", [post_id, user_id])

            if (likes.rows.length > 0){
                return res.send('you have liked this post')
            }

            await pool.query("update posts set likescount = likescount + 1 where post_id = $1;", [post_id])

            const like = await pool.query("INSERT INTO likes (postliked_id, userthatliked_id, username) VALUES ($1, $2, $3) RETURNING *;", [post_id, user_id, username])
            
            res.status(201).send({message: 'post liked', like})
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async getLikes(req, res) {
        try {
            const likes = await pool.query("SELECT * FROM likes WHERE postliked_id = $1;", [req.params.id])
            res.status(200).send(likes.rows)
        } catch (error) {
            res.status(400).send(error.message)  
        }
    }
}


module.exports = {postController}

