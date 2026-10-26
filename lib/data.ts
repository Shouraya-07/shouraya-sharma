import type { PortfolioData, Project } from '@/lib/types';

// Content transcribed from the supplied CV. Edit this file and rebuild to publish updates.
// These timestamps mark the content snapshot, not project launch or publication dates.
const snapshot = '2026-10-26T00:00:00Z';
const timestamps = { created_at: snapshot, updated_at: snapshot };

const skillGroups: Record<string, string[]> = {
  'Programming Languages': ['C', 'C++', 'Python', 'Go'],
  'Cybersecurity Tools': ['Nmap', 'Wireshark', 'Burp Suite', 'Autopsy', 'Kali Linux', 'Parrot OS'],
  Frontend: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'React.js', 'Vite'],
  Backend: ['FastAPI', 'REST APIs', 'MCP (Model Context Protocol)'],
  Databases: ['Oracle SQL', 'PostgreSQL', 'Firebase', 'DBMS'],
  'DevOps & Tools': ['Git', 'GitHub', 'Vercel', 'Cloudflare Workers', 'Cloudinary', 'Network Tunneling'],
  'Architecture & Practices': ['Systems Design', 'Full-Stack Development', 'Project Management'],
  Concepts: ['C++ STL', 'Data Structures and Algorithms (DSA)', 'Object-Oriented Programming (OOPS)'],
};

const projectEntries: Omit<Project, 'emoji' | 'link' | 'display_order' | 'created_at' | 'updated_at'>[] = [
  // Personal
  {
    id: 'snaproute', title: 'SnapRoute', category: 'personal', status: 'Live',
    problem: 'Local AI inference on Snapdragon PCs needs clear model routing and useful telemetry.',
    outcome: 'A runnable Ollama-compatible gateway prototype for Snapdragon PCs, with model resolution, explainable routing, telemetry, and safe pre-token fallback.',
    tech_stack: ['JavaScript', 'Ollama API', 'Qualcomm GenieX'], links: ['https://github.com/Shouraya-07/SnapRoute'],
  },
  // Shivoham Labs (kept in the existing Personal Finder folder to preserve the UI).
  {
    id: 'memex', title: 'Memex', category: 'personal', status: 'Live',
    problem: 'Keep project context available across AI development tools without repeatedly copying code and notes between them.',
    outcome: 'A locally hosted MCP server and web dashboard that gives multiple AI tools shared project memory, file summaries, semantic search, and a Git-backed audit trail.',
    tech_stack: ['Node.js', 'MCP', 'Ollama', 'Git'], links: ['https://github.com/Shivoham-Lab/Memex'],
  },
  {
    id: 'shunt', title: 'Shunt', category: 'personal', status: 'In Dev',
    problem: 'Copied text is difficult to move quickly between devices on a local network.',
    outcome: 'A personal clipboard relay that syncs text instantly across connected devices, with a web UI for history and copy-back.',
    tech_stack: ['Go', 'WebSockets', 'Local Networking'], links: ['https://github.com/Shivoham-Lab/shunt'],
  },
  {
    id: 'jugni', title: 'Jugni', category: 'personal', status: 'In Dev',
    problem: 'A community music app needs self-hosted streaming, direct MP3 uploads, and playlists.',
    outcome: 'Self-hosted community music streaming app with direct MP3 uploads and playlist management.',
    tech_stack: ['React.js', 'Flask', 'Firebase'], links: ['https://github.com/Shivoham-Lab/Jugni'],
  },
  // Professional
  {
    id: 'acm-mitb', title: 'ACM MITB Official Website', category: 'professional', status: 'Live',
    problem: 'The ACM Student Chapter at MIT Bengaluru and its affiliated SIGs needed an official web presence.',
    outcome: 'Designed, developed, and actively maintain the chapter website.',
    tech_stack: [], links: ['https://acm-website-nine.vercel.app'],
  },
  {
    id: 'code-ai-2026', title: 'CODE-AI 2026 Conference Website', category: 'professional', status: 'Live',
    problem: 'The CODE AI 2026 International Research Conference needed a website for submissions, schedules, and speaker information.',
    outcome: 'Built and deployed the official conference website.',
    tech_stack: [], links: ['https://conference.manipal.edu'],
  },
  {
    id: 'ftb-hustle', title: 'FTB Hustle Website', category: 'professional', status: 'Live',
    problem: 'FTB needed an official site for its brand story, platform features, and community touchpoints.',
    outcome: 'Built and maintain the official FTB website.',
    tech_stack: [], links: ['https://ftbhustle.com'],
  },
  // Team
  {
    id: 'sentrail', title: 'Sentrail', category: 'team', status: 'Live',
    problem: 'Investigating Bitcoin transaction traffic requires connecting wallet and IP activity and surfacing suspicious patterns.',
    outcome: 'An AI-assisted monitoring and analysis dashboard that builds transaction graphs, scores wallets, and explains alerts with feature attributions and domain rules.',
    tech_stack: ['Python', 'FastAPI', 'React', 'Vite', 'Machine Learning', 'SHAP'], links: ['https://github.com/Shouraya-07/Sentrail'],
  },
  {
    id: 'opspilot-ai', title: 'OpsPilot AI', category: 'team', status: 'Live',
    problem: 'Teams need one place to monitor operational workflows across terminal, courier, workforce, and energy operations.',
    outcome: 'An AI-assisted operations platform with dataset analysis, real-time dashboards, and chat-based insights.',
    tech_stack: ['React.js', 'FastAPI', 'Python'], links: ['https://github.com/Shouraya-07/OpsPilot-AI'],
  },
  {
    id: 'nexus-twin-ai', title: 'NexusTwin_AI', category: 'team', status: 'Live',
    problem: 'Organizations need to understand their structure and explore the impact of possible decisions.',
    outcome: 'An organizational intelligence platform that builds a knowledge graph from org data and supports what-if decision simulations and executive insights.',
    tech_stack: ['Python', 'FastAPI', 'NetworkX', 'JavaScript', 'D3.js'], links: ['https://github.com/Shouraya-07/NexusTwin_AI'],
  },
  {
    id: 'agrix', title: 'AgriX', category: 'team', status: 'Live',
    problem: 'Farmers need accessible local information for crop planning and support.',
    outcome: 'A multilingual farmer platform with weather insights, AI chat, education, community, MSP contracts, crop monitoring, and help services.',
    tech_stack: ['HTML', 'CSS', 'JavaScript'], links: ['https://github.com/Shouraya-07/ArgiX'],
  },
  {
    id: 'upkisan', title: 'UpKisan', category: 'team', status: 'Live',
    problem: 'Farmers need practical digital tools to make crop and supplier decisions.',
    outcome: 'A multi-page platform with soil-based crop recommendations, weather updates, map-based crop analysis, an AI chatbot, and supplier listings.',
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'CSV'], links: ['https://github.com/Shouraya-07/UpKisan'],
  },
  {
    id: 'pharma-clear', title: 'Pharma Clear', category: 'team', status: 'Live',
    problem: 'Pharmaceutical supply-chain claims need secure submission, indexing, and retrieval.',
    outcome: 'An Algorand and React distributed claims system with on-chain SHA256 fingerprints and an off-chain indexer.',
    tech_stack: ['Algorand', 'Python', 'React', 'TypeScript', 'Vite', 'SQLite'],
    links: ['https://github.com/anchit-goel/PharmaClear'],
  },
  // Freelance projects intentionally have no GitHub links or descriptions.
  {
    id: 'rithiksha-holidays', title: 'Rithiksha Holidays', category: 'professional', status: 'Live',
    problem: '', outcome: '', tech_stack: [], links: ['https://www.rithikshaholiday.in/'],
  },
  {
    id: 'raw-miles', title: 'Raw Miles', category: 'professional', status: 'Live',
    problem: '', outcome: '', tech_stack: [], links: ['https://rawmiles.vercel.app/'],
  },
  {
    id: 'vestique', title: 'Vestique', category: 'professional', status: 'Live',
    problem: '', outcome: '', tech_stack: [], links: ['https://vestique.vercel.app/'],
  },
];

export const portfolioData: PortfolioData = {
  profile: {
    ...timestamps,
    id: 'shouraya-sharma', name: 'Shouraya Sharma',
    title: 'Full Stack Developer · Cybersecurity Enthusiast',
    bio: 'Full stack developer and Computer Science undergraduate specializing in Cybersecurity, with production-deployed projects spanning AI tooling, developer infrastructure, and web platforms. Currently building independently through Shivoham Lab.',
    photo_url: '/Shouraya.jpeg', languages: ['English', 'Hindi', 'Punjabi'],
    institute: 'Manipal Institute of Technology, Bengaluru', location: 'Bengaluru, India', locations: ['Bengaluru, India'],
    education: [
      { institution: 'Manipal Institute of Technology, Bengaluru', qualification: 'B.Tech in Computer Science · Cybersecurity specialization', period: '2024–2028' },
      { institution: 'Govt. Sr. Secondary Smart School, Lamini, Pathankot', qualification: 'Class XII · Pre-Engineering', period: '2023–2024', result: '92%' },
      { institution: 'St. Joseph’s Convent Sec. School, Pathankot', qualification: 'Class X', period: '2021–2022', result: '94%' },
    ],
    links: [],
  },
  projects: projectEntries.map((project, index) => ({ ...project, ...timestamps, emoji: '', link: project.links[0] ?? null, display_order: index + 1 })),
  // CV dates have month precision; day 01 supports the existing month/year formatter.
  experience: [
    {
      ...timestamps, id: 'ftb-intern', org: 'FTB, Fire in the Belly', role: 'Software Engineer Intern',
      emoji: '', logo_url: null, color: '#d59a35', start_date: '2026-05-01', end_date: '2026-08-01', display_order: 1,
      description: 'Worked on product strategy and roadmap planning for the FTB Hustle platform.\nCoordinated with engineering and design teams to ship core platform features on schedule.\nBuilt and shipped new website features that gained significant user traction.',
    },
    {
      ...timestamps, id: 'acm-webmaster', org: 'MITB ACM SIG-AI, Bengaluru', role: 'Webmaster',
      emoji: '', logo_url: null, color: '#5b9bff', start_date: '2025-10-01', end_date: '2026-10-01', display_order: 2,
      description: 'Designed and maintain the official ACM MITB website.\nCoordinated web presence for AI-focused events and workshops; helped organize multiple hackathons.',
    },
    {
      ...timestamps, id: 'acm-executive-secretary', org: 'MITB ACM, Bengaluru', role: 'Executive Secretary',
      emoji: '', logo_url: null, color: '#7d8cff', start_date: '2026-10-01', end_date: null, display_order: 3,
      description: null,
    },
    {
      ...timestamps, id: 'shivoham-founder', org: 'Shivoham Lab', role: 'Founder and Builder',
      emoji: '', logo_url: null, color: '#69ad9e', start_date: '2025-02-01', end_date: null, display_order: 4,
      description: 'Running an independent lab for building systems, AI tools, and experimental software. Shipping tools and research projects under the Shivoham Lab umbrella.',
    },
  ],
  notes: [
    {
      ...timestamps, id: 'currently-building', title: 'Currently building: Shunt & Jugni', image_urls: [],
      content: '**Current work**\n\nA snapshot of ongoing work from my résumé.\n\n**Shunt**\nA self-hosted clipboard relay syncing copied content instantly across devices over a local network.\n- Go\n- Systems\n- Networking\n\n**Jugni**\nA self-hosted community music streaming app with direct MP3 uploads and playlist management.\n- React.js\n- Flask\n- Firebase',
    },
  ],
  skills: Object.entries(skillGroups).flatMap(([category, names], groupIndex) => names.map((name, index) => ({
    ...timestamps, id: `skill-${groupIndex}-${index}`, name, category, display_order: groupIndex * 100 + index,
  }))),
  skillSections: Object.keys(skillGroups).map((name, index) => ({ ...timestamps, id: `section-${index}`, name, display_order: index + 1 })),
};

// Retain the existing interface so the public frontend requires no changes.
export async function fetchPortfolioData(): Promise<PortfolioData> {
  return portfolioData;
}
