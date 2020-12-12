SELECT
    post_id,
    descrip,
    locat,
    time_stamp,
    image_src,
    belong_user
FROM
    post_table
WHERE
    post_id = $1;