SELECT 
    following_id
FROM 
	user_relation_table
WHERE
    follower_id = $1;