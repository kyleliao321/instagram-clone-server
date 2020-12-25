import Knex from 'knex';

exports.seed = async function (knex: Knex): Promise<void> {
  await knex('accounts_table')
    .del()
    .insert([
      {
        user_id: '4fbc9df6-556e-45f5-928e-1bc39a79317f',
        user_name: 'user_name_1',
        hashed_password:
          '8af12fba418adb3f8824f49f26f1cd0521f25a3b9f53b7adb4a1c8b83cb5cc56' // hashed_password_1
      },
      {
        user_id: 'a471fe7c-f728-4e31-801e-1776e854fb2d',
        user_name: 'user_name_2',
        hashed_password:
          '35ec239c664d17768068ab1753baf8b7407388530302abb2a51a5bb0440b33e2' // hash_password_2
      }
    ]);

  await knex('users_table')
    .del()
    .insert([
      {
        user_id: '4fbc9df6-556e-45f5-928e-1bc39a79317f',
        user_name: 'user_name_1',
        alias: 'alias_1',
        description: 'description_1',
        post_num: 1,
        follower_num: 0,
        following_num: 1
      },
      {
        user_id: 'a471fe7c-f728-4e31-801e-1776e854fb2d',
        user_name: 'user_name_2',
        alias: 'alias_2',
        follower_num: 1
      }
    ]);

  await knex('posts_table')
    .del()
    .insert([
      {
        post_id: 'a727ccd6-bd17-4eaf-a1c7-b14993589c37',
        location: 'location_1',
        created_at: '1999-01-07T20:05:06.000Z',
        image_src: 'IMG_001.jpg',
        description: 'description_1',
        posted_user: '4fbc9df6-556e-45f5-928e-1bc39a79317f'
      }
    ]);

  await knex('user_relations_table').del();

  await knex('user_post_relations_table')
    .del()
    .insert([
      {
        user_id: 'a471fe7c-f728-4e31-801e-1776e854fb2d',
        post_id: 'a727ccd6-bd17-4eaf-a1c7-b14993589c37'
      }
    ]);
};
