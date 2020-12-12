SELECT 
    user_id,
    user_name,
    alias,
    descrip,
    image_src,
    post_num,
    follower_num,
    following_num
FROM 
    user_table
WHERE 
    user_id = $1;