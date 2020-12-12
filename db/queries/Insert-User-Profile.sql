INSERT INTO user_table (
    user_id,
    user_name,
    alias,
    descrip,
    image_src,
    post_num,
    follower_num,
    following_num
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
) RETURNING user_id;