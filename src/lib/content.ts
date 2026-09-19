/**
 * Single source of truth for site content (everything except projects, which
 * live in ./projects.ts). Edit the plain data here — no layout/JSX to touch.
 */

export interface HeroLink {
  label: string;
  href: string;
}

export interface EducationEntry {
  school: string;
  /** Degree line; null for a transfer/prior school with none to show. */
  degree: string | null;
  period: string;
  /** Short amber note, e.g. "GPA 3.57" or "transferred". */
  note: string | null;
}

export interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Channel {
  label: string;
  href: string;
  note: string;
}

export interface SiteConfig {
  /** Full name, shown in the hero and used in page titles. */
  name: string;
  /** Lowercase wordmark in the nav, e.g. "om_patel". */
  wordmark: string;
  /**
   * Canonical absolute site URL (no trailing slash), used for metadata,
   * sitemap, and Open Graph. Set NEXT_PUBLIC_SITE_URL after deploying.
   */
  url: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    /** Top line, rendered as a "// …" comment marker. */
    availability: string;
    /** Positioning line under the name. */
    intro: string;
    links: HeroLink[];
  };
  about: {
    /** One string per paragraph. */
    paragraphs: string[];
    education: EducationEntry[];
  };
  /** Roles, most recent first. */
  experience: Role[];
  /** Skill groups, most relevant first. */
  skills: SkillGroup[];
  contact: {
    heading: string;
    blurb: string;
    email: string;
    channels: Channel[];
  };
}

const FALLBACK_URL = "http://localhost:3000";

/**
 * Resolve the canonical site URL for metadata, sitemap, and Open Graph.
 * Priority: an explicit NEXT_PUBLIC_SITE_URL, else Vercel's own env (the stable
 * production domain, then the per-deploy URL), else localhost for dev. The value
 * is normalized (https:// added if missing, trailing slash stripped) so a
 * protocol-less value can never make `new URL()` throw and break the build.
 */
function resolveSiteUrl(): string {
  const raw = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    FALLBACK_URL
  ).trim();
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_URL;
  }
}

export const siteConfig: SiteConfig = {
  name: "Om Patel",
  wordmark: "om_patel",
  url: resolveSiteUrl(),

  meta: {
    title: "Om Patel — Software Engineering & Applied AI",
    description:
      "Om Patel is a CS senior at Penn State building at the intersection of software engineering and applied AI. Open to AI/ML and software engineering roles for May 2027.",
  },

  hero: {
    availability: "// cs senior @ penn state · open to may 2027",
    intro:
      "CS senior building at the intersection of software engineering and applied AI.",
    links: [
      { label: "github", href: "https://github.com/ompatel4151" },
      { label: "linkedin", href: "https://linkedin.com/in/om-patel-54232a3bb" },
      { label: "email", href: "mailto:ompatel2109@gmail.com" },
    ],
  },

  about: {
    paragraphs: [
      "I'm Om, a computer science senior at Penn State who likes building where software engineering meets applied AI. Most of my time right now goes to undergraduate research on retrieval-augmented systems. I built ChemBot there, a course assistant that only answers from real course material and cites where each answer came from.",
      "Before Penn State I interned as a data analyst in Ahmedabad, where I spent a summer keeping a retail analytics pipeline fed and hunting down the kind of infrastructure bug that quietly breaks ingestion until someone actually traces it. What I care about is systems that survive contact with production, so most of what I ship comes with a test suite and a deploy pipeline attached. I'm graduating in May 2027 and looking for AI/ML and software engineering roles where I can keep doing this.",
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "Penn State Harrisburg",
        period: "Aug 2025 – May 2027",
        note: "GPA 3.57",
      },
      {
        degree: null,
        school: "Nirma University, Ahmedabad",
        period: "2023 – 2025",
        note: "transferred",
      },
    ],
  },

  experience: [
    {
      title: "Undergraduate Researcher",
      company: "MCREU Program",
      location: "University Park, PA",
      period: "May 2026 – Present",
      bullets: [
        "Built ChemBot, a RAG chatbot that answers only from ingested course material; on an independent-judge evaluation cut hallucinated out-of-scope answers from 100% to 4%, raised source-citation from 4% to 100% (p < 10^-12), and lifted the supported-answer rate from 68% to 88%.",
        "Ingested 97 course files (~620 pages) into 1,341 chunks (all-MiniLM-L6-v2, FAISS IndexFlatL2, top-k=5); built the Flask backend, Whisper voice input, conversation memory, and an instructor dashboard. Deployed on Render.",
      ],
    },
    {
      title: "Data Analyst Intern",
      company: "Rlogical Techsoft Pvt. Ltd.",
      location: "Ahmedabad, India",
      period: "May 2024 – Aug 2024",
      bullets: [
        "Added a dedicated proxy server feeding continuous updates into ConnectBI's database (a hosted retail BI suite), increasing the source data the analytics platform ingested in real time.",
        "Traced failing automated updates to the proxy's dynamic IP falling outside Windows Server allowlists, then landed a permanent whitelisting fix that ended the recurring ingestion drops.",
      ],
    },
  ],

  skills: [
    {
      label: "ai & ml",
      items: [
        "RAG",
        "FAISS & Vector Databases",
        "Semantic Embeddings",
        "LangChain",
        "RAGAS (LLM Evaluation)",
        "Anthropic & OpenAI/Groq SDKs",
      ],
    },
    {
      label: "languages",
      items: [
        "Python",
        "Java",
        "C",
        "JavaScript",
        "TypeScript",
        "SQL (MySQL/PostgreSQL/Oracle)",
        "HTML/CSS",
      ],
    },
    {
      label: "backend & data",
      items: [
        "FastAPI",
        "Flask",
        "SQLAlchemy",
        "Pydantic",
        "REST APIs",
        "Relational Database Design",
        "Multithreading & Concurrency",
        "Pandas",
        "NumPy",
      ],
    },
    {
      label: "frontend & delivery",
      items: [
        "Next.js",
        "React",
        "Tailwind",
        "Docker",
        "GitHub Actions (CI/CD)",
        "Vercel",
        "Render",
        "Supabase",
        "pytest",
        "Vitest",
        "Playwright",
        "Linux",
      ],
    },
  ],

  contact: {
    heading: "Let's build something.",
    blurb:
      "I'm graduating in May 2027 and looking for AI/ML and software engineering roles. If you're hiring or just want to talk shop, reach out and I'll get back to you.",
    email: "ompatel2109@gmail.com",
    channels: [
      {
        label: "ompatel2109@gmail.com",
        href: "mailto:ompatel2109@gmail.com",
        note: "email",
      },
      {
        label: "github.com/ompatel4151",
        href: "https://github.com/ompatel4151",
        note: "github",
      },
      {
        label: "linkedin.com/in/om-patel-54232a3bb",
        href: "https://linkedin.com/in/om-patel-54232a3bb",
        note: "linkedin",
      },
    ],
  },
};
