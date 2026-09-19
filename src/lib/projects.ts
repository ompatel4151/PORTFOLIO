export interface Project {
  /** URL slug for the /projects/[slug] detail route. */
  slug: string;
  title: string;
  /** One-line summary for the card. */
  tagline: string;
  /** Longer summary shown on the detail page. */
  description: string;
  /** The problem the project set out to solve. */
  problem: string;
  /** Key engineering decisions and trade-offs behind the build. */
  decisions: string;
  techStack: string[];
  /** Role/program, when the project was done in one; null otherwise. */
  role: string | null;
  /** Bullet accomplishments, quoted on the detail page. */
  highlights: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  /**
   * Cover image path under /public, for projects with a UI worth showing.
   * null for backend/CLI projects — the detail page falls back to `stats`.
   */
  coverImage: string | null;
  /**
   * Short metric chips shown in place of a cover image (the "// by the numbers"
   * block) when coverImage is null. Optional.
   */
  stats?: string[];
  /** Featured projects sort to the front of the grid. */
  featured: boolean;
}

/**
 * Single source of truth for project data. Every project component reads from
 * this array. Featured projects are listed first so the grid order matches the
 * display order without extra sorting. GitHub/live URLs and cover images are
 * placeholders to be supplied.
 */
export const projects: Project[] = [
  {
    slug: "chembot-rag-course-assistant",
    title: "ChemBot — RAG Course Assistant",
    tagline:
      "A course chatbot that answers only from real course material, with citations.",
    description:
      "A retrieval-augmented course assistant that answers strictly from real course material and cites its sources. Built during the MCREU undergraduate research program, it ingests course files into a FAISS vector index and serves answers through a Flask app with Whisper voice input and a password-protected instructor analytics dashboard.",
    problem:
      "General purpose chatbots answer confidently even when a question falls outside the syllabus, and they rarely point students back to the source which makes them hard for an instructor to trust as a study aid. ChemBot had to answer strictly from the actual course files and cite them, or decline to answer at all.",
    decisions:
      "Chose retrieval-augmented generation over fine-tuning so answers stay grounded in the indexed material and refresh whenever course files change. Content was chunked into 1,341 pieces from ~620 pages and embedded with a compact 384-dim all-MiniLM-L6-v2 model run through fastembed/ONNX, keeping the footprint small enough to deploy on Render; a FAISS IndexFlatL2 store is queried at top-k=5. An instructor dashboard turns the stream of student questions into a signal about where the material has gaps.",
    techStack: [
      "Python",
      "Flask",
      "FAISS",
      "all-MiniLM-L6-v2",
      "fastembed / ONNX",
      "Whisper",
      "Render",
    ],
    role: "Undergraduate researcher, MCREU program",
    highlights: [
      "On an independent-judge evaluation, cut out of scope hallucinated answers from 100% to 4%, raised source-citation from 4% to 100% (p < 10^-12), and lifted the supported answer rate from 68% to 88%.",
      "Ingested 97 course files (~620 pages) into 1,341 searchable chunks, embedded with all-MiniLM-L6-v2 (384-dim) and indexed in a FAISS IndexFlatL2 store queried at top-k=5.",
      "Built the Flask backend and web interface with Whisper voice input, conversation memory, and a password-protected instructor dashboard surfacing most asked topics and knowledge gaps. Deployed on Render.",
    ],
    githubUrl: "https://github.com/ompatel4151/chembot",
    liveUrl: "https://chembot-kvo3.onrender.com",
    coverImage: "/projects/chembot.jpg",
    featured: true,
  },
  {
    slug: "job-application-tracker",
    title: "Job Application Tracker with AI Resume Tailoring",
    tagline:
      "Full-stack tracker that tailors your resume to any job description with an LLM.",
    description:
      "A full-stack job-application tracker that moves applications through a kanban pipeline and uses an LLM to tailor a stored base resume to any pasted job description, returning a match score, keyword gaps, recommendations, and a downloadable resume. Built as two deployable services with a provider-agnostic AI layer and CI-backed tests.",
    problem:
      "Job seekers juggle dozens of applications across stages and rewrite their resume for each posting by hand. That's slow, inconsistent, and easy to lose track of. The app had to both organize the pipeline and cut the per-application tailoring work down to a paste and review step.",
    decisions:
      "Split into two independently deployable services: a Next.js/TypeScript frontend on Vercel and a containerized FastAPI backend on Render over Supabase Postgres, with a backend for frontend proxy so the LLM API key never reaches the browser and CORS disappears. The LLM layer is provider agnostic (Claude or Groq via one env var) and uses Pydantic v2 strict JSON-schema structured outputs so the tailoring response is reliably machine-readable. Correctness is enforced by 65 automated tests in CI, with both services auto-deploying on merge to main.",
    techStack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "SQLAlchemy 2.0",
      "Pydantic v2",
      "PostgreSQL",
      "Docker",
      "Vercel",
      "Render",
      "Supabase",
    ],
    role: null,
    highlights: [
      "Two service app (Next.js/TypeScript frontend on Vercel, containerized FastAPI backend on Render over Supabase Postgres) tracking applications through a 6-stage kanban pipeline and tailoring a stored base resume to any pasted job description, returning a 0-100 match score, matched/missing keywords, recommendations, and a downloadable Markdown resume.",
      "Provider agnostic LLM layer (Claude or Groq via one env var) with Pydantic strict JSON-schema structured outputs, behind a backend for frontend proxy that keeps the API key server-side and removes CORS.",
      "Verified by 65 automated tests (55 pytest, 10 Vitest, plus a Playwright end-to-end smoke test) in GitHub Actions CI, with both services auto-deploying on merge to main.",
    ],
    githubUrl:
      "https://github.com/ompatel4151/Job-application-system-with-automated-resume-tailoring",
    liveUrl: "https://job-application-system-with-automat-rosy.vercel.app",
    coverImage: "/projects/job-tracker.jpg",
    featured: true,
  },
  {
    slug: "producer-consumer-concurrency",
    title: "Producer–Consumer Concurrency Simulation",
    tagline:
      "Three interchangeable thread-safe buffers, one deliberate deadlock, half a million items a second.",
    description:
      "A concurrency study implementing the producer–consumer problem three different thread-safe ways, alongside a deliberately broken variant that reproduces a lost-wakeup deadlock and a poison-pill shutdown that drains cleanly. Backed by parameterized tests and a high-contention stress harness in CI.",
    problem:
      "The producer–consumer problem is easy to describe and easy to get subtly wrong: a single missed wakeup can deadlock a system that looks correct under light testing. The goal was to make the correct and incorrect versions concrete, swappable, and testable side by side rather than argued about in the abstract.",
    decisions:
      "Implemented three interchangeable thread-safe bounded buffers (synchronized/notifyAll, ReentrantLock + Condition, and ArrayBlockingQueue) behind one interface so they can be swapped and compared directly, plus a deliberately broken notify() variant that reproduces a lost-wakeup deadlock and a poison-pill shutdown that drains all items cleanly. Behavior is pinned by 21 parameterized JUnit 5 tests and a randomized high-contention stress test with a deadlock watchdog and a produced == consumed invariant.",
    techStack: ["Java 21", "Maven", "JUnit 5", "GitHub Actions"],
    role: null,
    highlights: [
      "Implemented the producer–consumer problem with three interchangeable thread-safe bounded buffers (synchronized/notifyAll, ReentrantLock + Condition, ArrayBlockingQueue), plus a broken notify() variant that reproduces a lost-wakeup deadlock and a poison-pill shutdown that drains all items cleanly.",
      "Verified with 21 parameterized JUnit 5 tests and a randomized high-contention stress test (deadlock watchdog, produced == consumed invariant) in CI; sustained ~500K+ items/second at 8 producers / 8 consumers.",
    ],
    githubUrl: "https://github.com/ompatel4151/producer-consumer",
    liveUrl: null,
    coverImage: null,
    stats: [
      "3 buffer implementations",
      "~500K+ items / sec",
      "8 × 8 producers / consumers",
      "21 JUnit 5 tests",
    ],
    featured: false,
  },
  {
    slug: "course-registration-system",
    title: "University Course Registration System",
    tagline:
      "A normalized Oracle schema with real enrollment validation and transcript-safe deletes.",
    description:
      "A university course-registration system over a normalized Oracle schema, with real enrollment validation and soft-deletes that preserve transcript history. Includes admin modules for courses and sections and a Tkinter interface.",
    problem:
      "An enrollment system has to enforce real academic rules (prerequisites, capacity, duplicate enrollment) while never destroying the historical record a transcript depends on. A naive schema with hard deletes satisfies the first requirement and quietly breaks the second.",
    decisions:
      "Designed a normalized 9-table Oracle schema with an associative enrollment table and a self-referencing prerequisite relation, enforced integrity with database constraints, and used soft-deletes so dropping a course preserves transcript history. Enrollment runs a five-check validation before it commits, and admin Courses and Sections modules sit over the same schema through a Tkinter interface.",
    techStack: ["Python", "Oracle 21c", "SQL", "Tkinter"],
    role: null,
    highlights: [
      "Designed a normalized 9-table Oracle schema (constraints, an associative enrollment table, a self-referencing prerequisite relation), built the admin Courses and Sections modules, and implemented five-check enrollment validation with soft-deletes to preserve transcript history.",
    ],
    githubUrl:
      "https://github.com/ompatel4151/university-course-registration-system",
    liveUrl: null,
    coverImage: null,
    stats: [
      "9-table Oracle schema",
      "5-check enrollment validation",
      "soft-delete transcript history",
      "self-referencing prerequisites",
    ],
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Previous/next projects for detail-page navigation, wrapping around the ends
 * so both are always present. Order follows the `projects` array.
 */
export function getProjectNavigation(
  slug: string
): { prev: Project; next: Project } | null {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const len = projects.length;
  return {
    prev: projects[(i - 1 + len) % len],
    next: projects[(i + 1) % len],
  };
}
