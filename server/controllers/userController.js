require('dotenv').config()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userController = {
    async createUser(req, res) {
        const {name_of_user, username, user_password, bio} = req.body
        const secret = process.env.SECRET
        try {
            let user = await pool.query("SELECT * FROM users WHERE username = $1", [
                username
            ])

            if (user.rows.length > 0) {
                return res.status(401).json('user already exist')
            }

            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(user_password, salt)

            user = await pool.query("INSERT INTO users (name_of_user, username, user_password, bio ) VALUES ($1, $2, $3, $4) RETURNING *", 
                [name_of_user, username, password, bio]
            
            )

            const token = jwt.sign(user.rows[0].user_id, secret)
         
            res.status(201).header('auth-token').send({success: true, message: 'created successfully', user, token})
        } catch (error) {
            res.status(401).send(error)
        }

    },

    async loginUser(req, res) {
        const { username } = req.body
        const secret = process.env.SECRET
        try {
            let user = await pool.query("SELECT * FROM users WHERE username = $1", [username])
            if(user.rows.length === 0) {
                return res.status(401).send('invalid credentials')
            }
            const password = bcrypt.compare(req.body.user_password, user.rows[0].user_password)

            if(!password) return res.status(404).send('invalid password or email')

            const token = jwt.sign(user.rows[0].user_id, secret)

            res.status(201).header('auth-token').send({success: true, message: 'signed successfully', token, user})
       
        } catch (error) {
            res.status(401).send(error.message)
        }
    },


    async getUser(req, res) {
        try {
            const user = await pool.query("SELECT user_id, name_of_user, username, bio, gender, profile_image FROM users WHERE user_id = $1", [req.user])
            res.status(200).send(user.rows[0])
        } catch (error) {
            res.status(404).send(error.message)   
        }
    },
    async getAUser(req, res) {
        try {
            const user = await pool.query("SELECT user_id, name_of_user, username, bio, gender, profile_image FROM users WHERE user_id = $1", [req.params.id])
            res.status(200).send(user.rows[0])
        } catch (error) {
            res.status(404).send(error.message)   
        }
    },

    async getUsers(req, res) {
        try {
            const users = await pool.query("SELECT user_id, name_of_user, username, bio, gender, profile_image FROM users WHERE user_id != $1", [req.user])
            res.status(200).send(users.rows)
        } catch (error) {
            res.status(404).send(error.message)   
        }
    },
    async updateUser(req, res) {
        const {name_of_user, username, profile_image, bio} = req.body
        try {
            const upadatedUser = await pool.query("UPDATE users SET name_of_user = $1, username = $2, bio = $3, profile_image = $4 WHERE user_id = $5 RETURNING *", [name_of_user, username, bio, profile_image, req.user])
            res.status(200).send(upadatedUser.rows)
        } catch (error) {
            res.status(404).send(error.message, 'message')   
        }
    },



    async followUser(req, res){
        try {
            const follwed = await pool.query("SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2", [req.user, req.body.user_id])
            if(follwed.rows.length > 0){
                return res.send('you are already following this user')
            }
            const follow = await pool.query("INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING *;", [req.user, req.body.user_id])
            res.send(follow.rows)
        } catch (error) {
            res.status(400).send(error, 'error')
        }
    },

    async unfollowUser(req, res){
        try {
            const unfollow = await pool.query("DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2;", [req.user, req.body.user_id])
            res.send(unfollow.rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async checkFollow(req, res){
        try {
            const check = await pool.query("SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2", [req.user, req.query.user_id])
            res.send(check.rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    //for my followers
    //SELECT user_id, name_of_user, username FROM users LEFT JOIN follows on users.user_id = follows.follower_id WHERE follows.followed_id = 7;

    //for the people I am following
    //SELECT user_id, name_of_user, username FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE follows.follower_id = 7;
    async followers(req, res) {
        try {
            const followers = await pool.query("SELECT user_id, name_of_user, username FROM users LEFT JOIN follows on users.user_id = follows.follower_id WHERE follows.followed_id = $1;", [req.user])
            res.send(followers.rows)
        } catch (error) {
            res.status(400).send(error.message, 'something happened')
        }
    },

    async following(req, res) {
        try {
            const following = await pool.query("SELECT user_id, name_of_user, username, profile_image FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE follows.follower_id = $1;", [req.user])
            res.send(following.rows)
        } catch (error) {
            res.status(400).send(error.message, 'something happened')
        }
    },

    async AUserFollowers(req, res) {
        try {
            const followers = await pool.query("SELECT user_id, name_of_user, username FROM users LEFT JOIN follows on users.user_id = follows.follower_id WHERE follows.followed_id = $1;", [req.params.id])
            res.send(followers.rows)
        } catch (error) {
            res.status(400).send(error.message, 'something happened')
        }
    },

    async AUserfollowing(req, res) {
        try {
            const following = await pool.query("SELECT user_id, name_of_user, username, profile_image FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE follows.follower_id = $1;", [req.params.id])
            res.send(following.rows)
        } catch (error) {
            res.status(400).send(error.message, 'something happened')
        }
    },


    async searchUsers(req, res){
        try {
            const searchedUsers = await pool.query("SELECT user_id, name_of_user, username, profile_image FROM users WHERE username LIKE $1 ", [`%${req.query.username.toLowerCase()}%`])
            if(req.query.username === ''){
                return 
            }
            res.send(searchedUsers.rows)
        } catch (error) {
            res.status(400).send(error.message, 'something happened')
        }
    }



}




module.exports = {userController}