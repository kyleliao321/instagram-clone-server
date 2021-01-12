type ITable = {
  name: string;
  columns: Record<string, string>;
};

export const UsersTable: ITable = Object.freeze({
  name: 'users_table',

  columns: {
    userId: 'user_id',
    userName: 'user_name',
    alias: 'alias',
    description: 'description',
    imageSrc: 'image_src',
    postNum: 'post_num',
    followerNum: 'follower_num',
    followingNum: 'following_num'
  }
});

export const PostsTable: ITable = Object.freeze({
  name: 'posts_table',

  columns: Object.freeze({
    postId: 'post_id',
    location: 'location',
    description: 'description',
    createdAt: 'created_at',
    imageSrc: 'image_src',
    postedUser: 'posted_user'
  })
});

export const AccountsTable: ITable = Object.freeze({
  name: 'accounts_table',

  columns: Object.freeze({
    userId: 'user_id',
    userName: 'user_name',
    hashedPassword: 'hashed_password'
  })
});

export const UserRelationsTable: ITable = Object.freeze({
  name: 'user_relations_table',

  columns: Object.freeze({
    followerId: 'follower_id',
    followingId: 'following_id'
  })
});

export const UserPostRelationsTable: ITable = Object.freeze({
  name: 'user_post_relations_table',

  columns: Object.freeze({
    userId: 'user_id',
    postId: 'post_id'
  })
});
