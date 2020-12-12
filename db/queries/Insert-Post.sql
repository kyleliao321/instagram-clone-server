INSERT INTO post_table (
    post_id,
    descrip,
    locat,
    time_stamp,
    image_src,
    belong_user
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
) RETURNING *;