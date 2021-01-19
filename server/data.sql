CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    name_of_user VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    user_password VARCHAR NOT NULL,
    bio Text,
    gender VARCHAR(10),
    website VARCHAR(100),
    profile_image VARCHAR DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id BIGSERIAL NOT NULL PRIMARY KEY,
    created_by BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    post_image VARCHAR NOT NULL,
    post_description TEXT ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    like_id BIGSERIAL NOT NULL PRIMARY KEY,
    postliked_id BIGINT REFERENCES posts(post_id) ON DELETE CASCADE NOT NULL ,
    userthatliked_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL ,
    username TEXT 
);

CREATE TABLE follows(
    follow_id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    followed_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
);

INSERT INTO follows (follower_id, followed_id) VALUES (4, 5);


UPDATE students SET isAdmin = TRUE WHERE id = 1;

select post_id, post_description, like_id, postliked_id from posts LEFT JOIN likes on posts.post_id = likes.postliked_id;

select user_id, username, profile_image, post_id, post_image, post_description, posts.created_at as time_of_creation from users LEFT JOIN posts on users.user_id = posts.created_by JOIN follows on users.user_id = follows.followed_id  WHERE follows.follower_id = 6;
select answer, grade, remark, date_answered, answers.id, subject, questions, assignments.id as id_assignment, name_of_student, age_of_student, students.id as id_students from answers left join students on answers.student_id = students.id left join assignments on answers.assignment_id = assignments.id;
select answer, answers.id, subject, questions, assignments.id as id_assignment, students.id as id_students from answers left join students on answers.student_id = students.id left join assignments on answers.assignment_id = assignments.id WHERE


SELECT c1.postliked_id, c2.userthatliked_id FROM likes c1 JOIN likes c2 ON c1.postliked_id = c2.userthatliked_id