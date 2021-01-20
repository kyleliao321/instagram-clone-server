import Knex from 'knex';
import faker from 'faker';
import crypto from 'crypto';
import path from 'path';
import fse from 'fs-extra';
import {
  AccountsTable,
  PostsTable,
  UserPostRelationsTable,
  UserRelationsTable,
  UsersTable
} from '../../constants';

const postImageSrcDirPath = path.join(process.cwd(), 'assets', 'demo', 'post');
const userImageSrcDirPath = path.join(process.cwd(), 'assets', 'demo', 'user');
const imageDesDirPath = path.join(process.cwd(), 'public', 'images', 'demo');

exports.seed = async function (knex: Knex): Promise<void> {
  // CLEANUP DATABASE
  await knex(UserRelationsTable.name).del();
  await knex(UserPostRelationsTable.name).del();
  await knex(PostsTable.name).del();
  await knex(UsersTable.name).del();
  await knex(AccountsTable.name).del();

  // SEEDS IMAGE INTO PUBLIC FOLDER
  seedPostImages();
  seedUserImages();

  // CREATE FAKE USERS ACCOUNTS AND RPOFILES
  const fakeUserMap = makeFakeUsers(50);
  randomlyFollowPlayground(fakeUserMap);

  const fakeUsers = Array.from(fakeUserMap.values());
  const fakeAccounts = fakeUsers.map((u) => {
    return {
      user_id: u.id,
      user_name: u.userName,
      hashed_password: hashPassword(u.password)
    };
  });
  const fakeUserProfiles = fakeUsers.map((u) => {
    return {
      user_id: u.id,
      user_name: u.userName,
      alias: u.name,
      description: u.description,
      image_src: u.imageSrc,
      post_num: u.posts.length,
      follower_num: u.followers.length,
      following_num: u.followings.length
    };
  });

  await knex('accounts_table').insert(fakeAccounts);

  await knex('users_table').insert(fakeUserProfiles);

  // CREATE FAKE POSTS
  const fakePostsGroupByUsers = fakeUsers.map((u) => {
    return u.posts.map((p) => {
      return {
        post_id: p.id,
        location: p.location,
        created_at: parseAsZuluTime(p.createdAt),
        image_src: p.imageSrc,
        description: `here is ${p.location}`,
        posted_user: u.id
      };
    });
  });
  const fakePosts = fakePostsGroupByUsers.reduce((prev, curr) => {
    return prev.concat(curr);
  });

  await knex('posts_table').insert(fakePosts);

  // CREATE FAKE USER RELATIONS
  const fakeRelationsGroupById = fakeUsers.map((u) => {
    return u.followings.map((f) => {
      return {
        follower_id: u.id,
        following_id: f
      };
    });
  });
  const fakeRelations = fakeRelationsGroupById.reduce((prev, curr) => {
    return prev.concat(curr);
  });

  await knex('user_relations_table').insert(fakeRelations);

  // CREATE FAKE USER POST RELATIONS
  const fakePostIds = fakePosts.map((p) => p.post_id);
  const fakeLikedPostGroupByUsers = fakeUsers.map((u) => {
    return randomlyChooseLikePostIds(fakePostIds).map((p) => {
      return {
        user_id: u.id,
        post_id: p
      };
    });
  });
  const fakeLikedPosts = fakeLikedPostGroupByUsers.reduce((prev, curr) => {
    return prev.concat(curr);
  });

  await knex('user_post_relations_table').insert(fakeLikedPosts);
};

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MAKE FAKE DATA ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function seedPostImages() {
  const assets = getPostDemoImages();

  assets.forEach((f) => {
    const src = path.join(postImageSrcDirPath, f);
    const des = path.join(imageDesDirPath, f);
    fse.copySync(src, des);
  });
}

function seedUserImages() {
  const assets = getUserDemoImages();

  assets.forEach((f) => {
    const src = path.join(userImageSrcDirPath, f);
    const des = path.join(imageDesDirPath, f);
    fse.copySync(src, des);
  });
}

function makeFakePosts(num: number): FakePost[] {
  // maximum post number for give user is 5
  const actualNum = num > 5 ? 5 : num;

  // get demo images names
  const demoImagesNames = getPostDemoImages();

  const fakePostSchema = {
    id: '{{random.uuid}}',
    location: '{{address.country}}',
    createdAt: '{{date.past}}'
  };

  const result = [];

  for (let i = 0; i < actualNum; i++) {
    const fakePost = JSON.parse(faker.fake(JSON.stringify(fakePostSchema)));
    const randomIndex = getRandomInt(0, demoImagesNames.length - 1);
    const randomDemoImage = demoImagesNames[randomIndex];
    result.push({
      ...fakePost,
      imageSrc: randomDemoImage
    });
  }

  return result;
}

function makeFakeUsers(num: number): Map<string, FakeUser> {
  const demoImageNames = getUserDemoImages();

  const fakeUserSchema = {
    id: '{{random.uuid}}',
    userName: '{{internet.userName}}',
    name: '{{name.firstName}}',
    password: '{{internet.password}}',
    description: '{{name.jobDescriptor}}'
  };

  const result = new Map<string, FakeUser>();

  for (let i = 0; i < num; i++) {
    const fakeUser = JSON.parse(faker.fake(JSON.stringify(fakeUserSchema)));
    const randomPostNum = getRandomInt(0, 5);
    const randomIndex = getRandomInt(0, demoImageNames.length - 1);
    const randomDemoImage = demoImageNames[randomIndex];
    result.set(fakeUser.id, {
      ...fakeUser,
      imageSrc: randomDemoImage,
      followers: [],
      followings: [],
      posts: makeFakePosts(randomPostNum)
    });
  }

  // include root use
  const rootUser: FakeUser = {
    id: faker.random.uuid(),
    userName: process.env.DEMO_ROOT_USER_NAME || 'root',
    password: process.env.DEMO_ROOT_USER_PASSWORD || 'root',
    name: process.env.DEMO_ROOT_USER_NAME || 'root',
    description: 'root',
    imageSrc: demoImageNames[0],
    followers: [],
    followings: [],
    posts: []
  };
  result.set(rootUser.id, rootUser);

  return result;
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// HELPER FUNCTIONS ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function getPostDemoImages(): string[] {
  return fse.readdirSync(postImageSrcDirPath).filter((f) => {
    const nameStringArray = f.split('.');

    if (nameStringArray.length <= 1) {
      return false;
    }

    const format = nameStringArray[nameStringArray.length - 1];

    return format === 'jpeg' || format === 'jpg';
  });
}

function getUserDemoImages(): string[] {
  return fse.readdirSync(userImageSrcDirPath).filter((f) => {
    const nameStringArray = f.split('.');

    if (nameStringArray.length <= 1) {
      return false;
    }

    const format = nameStringArray[nameStringArray.length - 1];

    return format === 'jpeg' || format === 'jpg';
  });
}

function randomlyChooseFollowingUserIds(
  users: FakeUser[],
  self: FakeUser
): string[] {
  const followingNums = getRandomInt(5, 10);
  const result: string[] = [];

  while (result.length < followingNums) {
    const randomIndex = getRandomInt(0, users.length - 1);
    const randomUserId = users[randomIndex].id;

    if (randomUserId !== self.id && !result.includes(randomUserId)) {
      result.push(randomUserId);
    }
  }
  return result;
}

function randomlyChooseLikePostIds(posts: string[]): string[] {
  const likePostsNum = getRandomInt(1, 10);
  const result: string[] = [];

  while (result.length < likePostsNum) {
    const randomIndex = getRandomInt(0, posts.length - 1);
    const randomPostId = posts[randomIndex];

    if (!result.includes(randomPostId)) {
      result.push(randomPostId);
    }
  }

  return result;
}

function randomlyFollowPlayground(userMap: Map<string, FakeUser>) {
  const users = Array.from(userMap.values());

  userMap.forEach((user, id) => {
    const followings = randomlyChooseFollowingUserIds(users, user);

    followings.forEach((f) => {
      const followedUser = userMap.get(f);

      if (followedUser !== undefined) {
        followedUser.followers.push(id);
      }
    });

    user.followings = [...followings];
  });
}

function hashPassword(password: string): string {
  const h = crypto.createHash('sha256');
  h.update(password);
  return h.digest().toString('hex');
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseAsZuluTime(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toISOString();
}

type FakeUser = {
  id: string;
  userName: string;
  name: string;
  password: string;
  description: string;
  imageSrc: string;
  followers: string[];
  followings: string[];
  posts: FakePost[];
};

type FakePost = {
  id: string;
  location: string;
  createdAt: string;
  imageSrc: string;
};
