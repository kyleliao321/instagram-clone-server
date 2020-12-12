UPDATE 
    user_table
SET
    user_id = $1,
    user_name = $2,
    alias = $3,
    descrip = $4,
    image_src = $5,
    post_num = $6,
    follower_num = $7,
    following_num = $8
WHERE 
    user_id = $9
RETURNING
    user_id;