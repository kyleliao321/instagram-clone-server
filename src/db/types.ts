import Knex from 'knex';

declare module 'knex/types/tables' {
  interface User {
    user_id: string;
    user_name: string;
    alias: string;
    description: string | null;
    imageSrc: string | null;
    post_num: number;
    follower_num: number;
    following_num: number;
  }

  interface Account {
    user_id: string;
    user_name: string;
    hashed_password: string;
  }

  interface Post {
    post_id: string;
    location: string | null;
    description: string | null;
    created_at: string;
    image_src: string;
    posted_id: string;
  }

  interface UserRelation {
    follower_id: string;
    following_id: string;
  }

  interface UserPostRelation {
    user_id: string;
    post_id: string;
  }

  interface Tables {
    users: User;
    users_table: Knex.CompositeTableType<
      User,
      Pick<User, 'user_id' | 'user_name' | 'alias'> &
        Partial<Omit<User, 'user_id' | 'user_name' | 'alias'>>,
      Partial<Omit<User, 'user_id'>>
    >;

    accounts: Account;
    accounts_table: Knex.CompositeTableType<
      Account,
      Account,
      Partial<Omit<Account, 'user_id'>>
    >;

    posts: Post;
    posts_table: Knex.CompositeTableType<
      Post,
      Pick<Post, 'post_id' | 'image_src' | 'created_at' | 'posted_id'> &
        Partial<Pick<Post, 'location' | 'description'>>,
      Partial<Omit<Post, 'post_id'>>
    >;

    user_relations: UserRelation;
    user_relations_table: Knex.CompositeTableType<UserRelation>;

    user_post_relations: UserPostRelation;
    user_post_relations_table: Knex.CompositeTableType<UserPostRelation>;
  }
}
