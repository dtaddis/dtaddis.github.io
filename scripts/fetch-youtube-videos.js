import { mkdir, writeFile } from "node:fs/promises";

const channelUrl = "https://www.youtube.com/@DavidAddis";
const fallbackPath = "src/youtubeVideos.ts";

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function matchFirst(input, pattern) {
  return input.match(pattern)?.[1] ?? "";
}

function findChannelId(channelPage) {
  const patterns = [
    /"channelId":"(UC[^"]+)"/,
    /"externalId":"(UC[^"]+)"/,
    /"browseId":"(UC[^"]+)"/,
    /\\"channelId\\":\\"(UC[^\\]+)\\"/,
    /\\"externalId\\":\\"(UC[^\\]+)\\"/,
    /\\"browseId\\":\\"(UC[^\\]+)\\"/,
  ];

  for (const pattern of patterns) {
    const channelId = matchFirst(channelPage, pattern);
    if (channelId) {
      return channelId;
    }
  }

  return [...new Set(channelPage.match(/UC[a-zA-Z0-9_-]{22}/g) ?? [])][0] ?? "";
}

async function writeVideos(videos) {
  const source = `import type { YouTubeVideo } from "./types";\n\nexport const youtubeVideos: YouTubeVideo[] = ${JSON.stringify(videos, null, 2)};\n`;
  await writeFile(fallbackPath, source, "utf8");
}

try {
  await mkdir("src", { recursive: true });
  const channelPage = await fetch(channelUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`YouTube channel page returned ${response.status}`);
    }
    return response.text();
  });

  const channelId = findChannelId(channelPage);
  if (!channelId) {
    throw new Error("Could not find channel id for @DavidAddis");
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const feed = await fetch(feedUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`YouTube feed returned ${response.status}`);
    }
    return response.text();
  });

  const entries = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 3);
  const videos = entries.map((entry) => {
    const xml = entry[1];
    const id = matchFirst(xml, /<yt:videoId>(.*?)<\/yt:videoId>/);
    return {
      id,
      title: decodeEntities(matchFirst(xml, /<title>([\s\S]*?)<\/title>/)),
      url: `https://www.youtube.com/watch?v=${id}`,
      published: matchFirst(xml, /<published>(.*?)<\/published>/),
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  });

  await writeVideos(videos);
  console.log(`Fetched ${videos.length} YouTube videos.`);
} catch (error) {
  console.warn(`YouTube video fetch failed: ${error.message}`);
  await writeVideos([]);
}
