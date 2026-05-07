export type SiteLink = {
  label: string;
  href: string;
};

export type Game = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  tags: string[];
  links: SiteLink[];
};

export type UnityAsset = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const siteData = {
  name: "David Addis",
  role: "Software engineer, game developer, guitarist",
  portrait: "/images/david-addis.jpg",
  bio:
    "Hello, I'm David Addis, a software engineer from London. I love technology, building new and exciting things, videogames, photography, playing guitar, dancing, and occasionally teaching dance.",
  contact: {
    label: "Contact David",
    subject: "Hello from davidaddis.com",
    parts: ["dtaddis", "+github", "gmail", "com"],
  },
  links: {
    unityAssets: "https://assetstore.unity.com/publishers/126206",
    bandcamp: "https://iamthemanicwhale.bandcamp.com/",
    youtube: "https://www.youtube.com/@DavidAddis",
    youtubeChannelId: "UCIblnJ0mWIZ4QHJaB1p-BLg",
    youtubeUploadsPlaylist: "UUIblnJ0mWIZ4QHJaB1p-BLg",
  },
  games: [
    {
      title: "Home Detective",
      eyebrow: "Mixed reality detective VR",
      description:
        "A room-scale mystery game where crime scenes unfold around the player's own living room on Meta Quest, with an immersive VR edition on Steam.",
      image: "/images/games/home-detective.jpg",
      tags: ["VR", "Detective", "Puzzle"],
      links: [
        {
          label: "Meta",
          href: "https://www.meta.com/en-gb/experiences/home-detective/6123516891014614/",
        },
        {
          label: "Steam",
          href: "https://store.steampowered.com/app/2758950/Home_Detective_VR__Immersive_Edition/",
        },
      ],
    },
    {
      title: "Going Loco",
      eyebrow: "VR transport puzzler",
      description:
        "A colourful traffic-based VR puzzle game about repairing road and rail routes with spare bits of infrastructure.",
      image: "/images/games/going-loco.jpg",
      tags: ["VR", "Strategy", "Simulation"],
      links: [
        {
          label: "Meta",
          href: "https://www.meta.com/en-gb/experiences/going-loco/7178858828899298/",
        },
        {
          label: "Steam",
          href: "https://store.steampowered.com/app/2907340/Going_Loco/",
        },
      ],
    },
    {
      title: "Miasma: Citizens of Free Thought",
      eyebrow: "Turn-based tactics",
      description:
        "A rebuilt release of the cult Xbox Live Indie strategy game, set in a dystopian future of rebellion and tactical combat.",
      image: "/images/games/miasma.jpg",
      tags: ["Strategy", "RPG", "Tactics"],
      links: [
        {
          label: "Steam",
          href: "https://store.steampowered.com/app/1771340/Miasma_Citizens_of_Free_Thought/",
        },
      ],
    },
    {
      title: "Miasma 2: Freedom Uprising",
      eyebrow: "Strategy RPG sequel",
      description:
        "A follow-up tactical adventure with choice-driven storytelling, restored for modern systems and Steam features.",
      image: "/images/games/miasma-2.jpg",
      tags: ["Strategy", "RPG", "Sci-fi"],
      links: [
        {
          label: "Steam",
          href: "https://store.steampowered.com/app/1765980/Miasma_2_Freedom_Uprising/",
        },
      ],
    },
  ] satisfies Game[],
  unityAssets: [
    {
      title: "Simple Offline Text-to-Speech",
      description:
        "Generate speech from text locally in Unity using Unity Inference, with no web service or account required.",
      image: "/images/assets/simple-offline-tts.jpg",
      href: "https://assetstore.unity.com/packages/tools/ai-ml-integration/simple-offline-text-to-speech-tts-339958",
    },
    {
      title: "Simple Offline Speech Recognition",
      description:
        "Transcribe microphone input, raw audio, or AudioClips inside Unity with local Whisper-based speech recognition.",
      image: "/images/assets/simple-offline-stt.jpg",
      href: "https://assetstore.unity.com/packages/tools/ai-ml-integration/simple-offline-speech-recognition-stt-352942",
    },
    {
      title: "Simple Offline LLM",
      description:
        "Run local language models through Unity Inference for offline AI characters, tools, and experiments.",
      image: "/images/assets/simple-offline-llm.jpg",
      href: "https://assetstore.unity.com/packages/tools/ai-ml-integration/simple-offline-llm-353768",
    },
  ] satisfies UnityAsset[],
  musicImages: [
    "/images/music/manic-whale-album-1.jpg",
    "/images/music/manic-whale-album-2.jpg",
    "/images/music/manic-whale-album-3.jpg",
  ],
};
