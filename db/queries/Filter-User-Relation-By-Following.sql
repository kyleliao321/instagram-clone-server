SELECT 
    follower_id
FROM 
	user_relation_table
WHERE
    following_id = $1;