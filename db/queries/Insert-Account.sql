INSERT INTO account_table (
    account_id,
    user_name,
    hashed_password
) VALUES (
    $1,
    $2,
    $3
) RETURNING account_id;