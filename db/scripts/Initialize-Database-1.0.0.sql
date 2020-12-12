CREATE TABLE IF NOT EXISTS user_table(
    user_id VARCHAR(36) PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    alias VARCHAR(30) NOT NULL,
    descrip VARCHAR(250),
    image_src VARCHAR(250),
    post_num INT NOT NULL,
    follower_num INT NOT NULL,
    following_num INT NOT NULL
);

CREATE TABLE IF NOT EXISTS account_table(
    account_id VARCHAR(36) PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    hashed_password VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS post_table(
    post_id VARCHAR(36) PRIMARY KEY,
    descrip VARCHAR(250),
    locat VARCHAR(250),
    time_stamp TIMESTAMP NOT NULL,
    image_src VARCHAR(250) NOT NULL,
    belong_user VARCHAR(36) NOT NULL,
    FOREIGN KEY (belong_user)
        REFERENCES user (user_id)
);

CREATE TABLE IF NOT EXISTS user_relation_table(
    follower_id VARCHAR(36) NOT NULL,
    following_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (follower_id, following_id)
);

CREATE TABLE IF NOT EXISTS user_post_relation_table(
    user_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (user_id, post_id)
);