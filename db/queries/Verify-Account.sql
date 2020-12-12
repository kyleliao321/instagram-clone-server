SELECT EXISTS (
    SELECT 
        * 
    FROM 
        account_table
    WHERE
        user_name = $1 AND
        hashed_password = $2
);