DELETE FROM 
    user_relation_table
WHERE 
    follower_id = $1 
    AND
    following_id = $2;