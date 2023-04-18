import { Tweet, getTweet } from "react-tweet/api";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

type TweetCache = {
  lastUpdate: Date;
  tweetIds: string[];
  data: Record<string, Tweet>;
};

export const getAllTweetData = async () => {
  const TWEET_RE = /<StaticTweet\sid="[0-9]+"\s\/>/g;

  const docsDirectory = join(process.cwd(), "posts");
  const cachePath = join(process.cwd(), "tweets", "cache.json");

  if (!fs.existsSync(join(process.cwd(), "tweets"))) {
    fs.mkdirSync(join(process.cwd(), "tweets"));
  }

  if (!fs.existsSync(cachePath)) {
    fs.writeFileSync(
      cachePath,
      JSON.stringify({
        lastUpdate: new Date().getTime(),
        tweetIds: [],
        data: [],
      })
    );
  }

  const cache: TweetCache = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
  const prevTweets = new Set(cache?.tweetIds || []);

  const fileNames = fs.readdirSync(docsDirectory);

  const twitterIdSet: Set<string> = new Set();

  fileNames.map(async (fileName) => {
    const fullPath = join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const tweetMatch = content.match(TWEET_RE);

    tweetMatch
      ?.map((mdxTweet) => {
        const id = mdxTweet.match(/[0-9]+/g)![0];
        return id;
      })
      .forEach((tweetId) => {
        twitterIdSet.add(tweetId);
      });
  });

  twitterIdSet.forEach((item) => {
    if (prevTweets.has(item)) {
      twitterIdSet.delete(item);
    }
  });

  const twitterIdList = Array.from(twitterIdSet);

  const getTweetPromises = twitterIdList.map((id) => {
    return getTweet(id);
  });

  const res = await Promise.all(getTweetPromises);

  // Populate the new tweets
  const newTweets = res.filter((item) => item !== undefined) as Tweet[];
  const newTweetIdToData = newTweets.reduce((acc, item) => {
    return {
      ...acc,
      [item.id_str]: item,
    };
  }, {}) as Record<string, Tweet>;

  // Update the cache
  const newCache = {
    lastUpdate: new Date().getTime(),
    // This be an addition, never a subtraction
    tweetIds: Array.from(new Set([...cache.tweetIds, ...twitterIdList])),
    data: {
      ...cache.data,
      ...newTweetIdToData,
    },
  };

  fs.writeFileSync(cachePath, JSON.stringify(newCache));

  return newCache;
};
