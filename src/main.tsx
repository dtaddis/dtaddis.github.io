import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Box,
  Check,
  Copy,
  Gamepad2,
  Guitar,
  Mail,
  Play,
  Youtube,
} from "lucide-react";
import { siteData, type SiteLink } from "./siteData";
import "./styles.css";

function externalLinkProps(label: string) {
  return {
    "aria-label": `${label} opens in a new tab`,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

function buildEmailAddress() {
  const [name, tag, domain, tld] = siteData.contact.parts;
  return `${name}${tag}@${domain}.${tld}`;
}

function buildGmailCompose() {
  const address = encodeURIComponent(buildEmailAddress());
  const subject = encodeURIComponent(siteData.contact.subject);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${address}&su=${subject}`;
}

function LinkButton({
  link,
  variant = "secondary",
}: {
  link: SiteLink;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      className={`button button-${variant}`}
      href={link.href}
      {...externalLinkProps(link.label)}
    >
      <span>{link.label}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.2} />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  );
}

type YouTubeFeedItem = {
  guid: string;
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
};

type FeedState =
  | { status: "loading"; videos: YouTubeFeedItem[] }
  | { status: "ready"; videos: YouTubeFeedItem[] }
  | { status: "error"; videos: YouTubeFeedItem[] };

const youtubeFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${siteData.links.youtubeChannelId}`;
const youtubeFeedProxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(youtubeFeedUrl)}`;

function useYouTubeFeed() {
  const [feed, setFeed] = useState<FeedState>({ status: "loading", videos: [] });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVideos() {
      try {
        const response = await fetch(youtubeFeedProxyUrl, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Feed request failed: ${response.status}`);
        }
        const payload = (await response.json()) as {
          status?: string;
          items?: YouTubeFeedItem[];
        };
        if (payload.status !== "ok" || !payload.items?.length) {
          throw new Error("Feed returned no videos");
        }
        setFeed({ status: "ready", videos: payload.items.slice(0, 3) });
      } catch (error) {
        if (!controller.signal.aborted) {
          setFeed({ status: "error", videos: [] });
        }
      }
    }

    fetchVideos();
    return () => controller.abort();
  }, []);

  return feed;
}

function ContactActions() {
  const [copied, setCopied] = useState(false);
  const email = buildEmailAddress();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy email address", email);
    }
  }

  return (
    <div className="contact-actions">
      <a
        className="button button-primary"
        href={buildGmailCompose()}
        {...externalLinkProps(siteData.contact.label)}
      >
        <Mail aria-hidden="true" size={18} strokeWidth={2.2} />
        <span>{siteData.contact.label}</span>
      </a>
      <button className="button button-secondary" type="button" onClick={copyEmail}>
        {copied ? (
          <Check aria-hidden="true" size={18} strokeWidth={2.2} />
        ) : (
          <Copy aria-hidden="true" size={18} strokeWidth={2.2} />
        )}
        <span>{copied ? "Email copied" : "Copy email"}</span>
      </button>
    </div>
  );
}

function YouTubeSection() {
  const feed = useYouTubeFeed();

  return (
    <section className="content-band youtube-band" id="youtube">
      <SectionHeading
        eyebrow="YouTube"
        title="Recent videos"
        description="The latest videos from my YouTube channel."
      />
      {feed.status === "ready" ? (
        <div className="video-grid">
          {feed.videos.map((video) => (
            <a
              className="video-card"
              href={video.link}
              key={video.guid}
              {...externalLinkProps(video.title)}
            >
              <img src={video.thumbnail} alt="" loading="lazy" />
              <div>
                <span>
                  <Play aria-hidden="true" size={15} fill="currentColor" />
                  {new Date(video.pubDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <h3>{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="youtube-embed">
          <iframe
            title="Latest videos from David Addis on YouTube"
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${siteData.links.youtubeUploadsPlaylist}&listType=playlist`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      <LinkButton
        variant="primary"
        link={{ label: "Visit YouTube channel", href: siteData.links.youtube }}
      />
    </section>
  );
}

function App() {
  return (
    <main>
      <header className="hero">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#games">Games</a>
          <a href="#assets">Unity Assets</a>
          <a href="#music">Music</a>
          <a href="#youtube">YouTube</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteData.role}</p>
            <h1>{siteData.name}</h1>
            <p className="bio">{siteData.bio}</p>
            <div className="hero-actions">
              <ContactActions />
              <a className="button button-secondary" href="#games">
                <Gamepad2 aria-hidden="true" size={18} strokeWidth={2.2} />
                <span>Explore work</span>
              </a>
            </div>
          </div>

          <figure className="portrait-wrap">
            <img src={siteData.portrait} alt="David Addis sitting on a bench beside a sculpture at night" />
          </figure>
        </div>
      </header>

      <section className="content-band" id="games">
        <SectionHeading
          eyebrow="Game development"
          title="Games for VR, Steam, and strategy players"
          description="Solo projects and restored releases spanning mixed reality mysteries, compact VR puzzles, and tactical sci-fi strategy."
        />
        <div className="game-grid">
          {siteData.games.map((game) => (
            <article className="game-card" key={game.title}>
              <img className="game-image" src={game.image} alt="" loading="lazy" />
              <div>
                <p>{game.eyebrow}</p>
                <h3>{game.title}</h3>
                <span>{game.description}</span>
              </div>
              <ul className="tag-list" aria-label={`${game.title} tags`}>
                {game.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="card-actions">
                {game.links.map((link) => (
                  <LinkButton key={link.href} link={link} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band assets-band" id="assets">
        <SectionHeading
          eyebrow="Unity Asset Store"
          title="Local AI tools for Unity"
          description="Easy-to-use, practical AI packages designed to run locally in Unity projects without web services, accounts, or avoidable integration fuss."
        />
        <div className="asset-grid">
          {siteData.unityAssets.map((asset) => (
            <a
              className="asset-card"
              href={asset.href}
              key={asset.href}
              {...externalLinkProps(asset.title)}
            >
              <img src={asset.image} alt="" loading="lazy" />
              <div>
                <p className="eyebrow">Unity asset</p>
                <h3>{asset.title}</h3>
                <span>{asset.description}</span>
              </div>
            </a>
          ))}
        </div>
        <LinkButton
          variant="primary"
          link={{ label: "View all Unity assets", href: siteData.links.unityAssets }}
        />
      </section>

      <section className="music-strip" id="music">
        <div className="music-copy">
          <div className="icon-mark">
            <Guitar aria-hidden="true" size={22} strokeWidth={2.1} />
          </div>
          <p className="eyebrow">Music</p>
          <h2>I Am the Manic Whale</h2>
          <p>
            Progressive rock from Reading and London, with David on guitars and
            vocals.
          </p>
          <LinkButton
            variant="primary"
            link={{ label: "Listen on Bandcamp", href: siteData.links.bandcamp }}
          />
        </div>
        <div className="album-stack" aria-hidden="true">
          {siteData.musicImages.map((image) => (
            <img src={image} alt="" key={image} loading="lazy" />
          ))}
        </div>
      </section>

      <YouTubeSection />

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Want to get in touch?</h2>
          <p>
            For project questions, game support, asset enquiries, or music notes,
            email is the best route.
          </p>
        </div>
        <ContactActions />
      </section>

      <footer>
        <span>Copyright {new Date().getFullYear()} David Addis</span>
        <a href="/gamedev.html">Game privacy policy</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
