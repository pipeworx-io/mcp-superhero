/**
 * Superhero MCP — wraps akabab.github.io/superhero-api (free, no auth)
 *
 * Tools:
 * - list_all: List all superheroes with their IDs and names
 * - get_hero: Get full data for a superhero by ID
 * - get_powerstats: Get power statistics for a superhero by ID
 * - get_biography: Get biography details for a superhero by ID
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://akabab.github.io/superhero-api/api';

interface PowerStats {
  intelligence: number | null;
  strength: number | null;
  speed: number | null;
  durability: number | null;
  power: number | null;
  combat: number | null;
}

interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

interface Appearance {
  gender: string;
  race: string | null;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

interface Work {
  occupation: string;
  base: string;
}

interface Connections {
  groupAffiliation: string;
  relatives: string;
}

interface Images {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

interface Hero {
  id: number;
  name: string;
  slug: string;
  powerstats: PowerStats;
  appearance: Appearance;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
}

const tools: McpToolExport['tools'] = [
  {
    name: 'list_all',
    description: 'List all superheroes in the database with their IDs, names, and slugs.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_hero',
    description:
      'Get full data for a superhero by their numeric ID, including powerstats, biography, appearance, and images.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Numeric superhero ID (1-731)',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_powerstats',
    description:
      'Get power statistics (intelligence, strength, speed, durability, power, combat) for a superhero by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Numeric superhero ID (1-731)',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_biography',
    description:
      'Get biography details (full name, aliases, publisher, first appearance, alignment) for a superhero by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Numeric superhero ID (1-731)',
        },
      },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'list_all':
      return listAll();
    case 'get_hero':
      return getHero(args.id as number);
    case 'get_powerstats':
      return getPowerstats(args.id as number);
    case 'get_biography':
      return getBiography(args.id as number);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function listAll() {
  const res = await fetch(`${BASE_URL}/all.json`);
  if (!res.ok) throw new Error(`superhero-api error: ${res.status}`);
  const data = (await res.json()) as Hero[];
  return {
    count: data.length,
    heroes: data.map((h) => ({ id: h.id, name: h.name, slug: h.slug })),
  };
}

async function getHero(id: number) {
  const res = await fetch(`${BASE_URL}/id/${id}.json`);
  if (!res.ok) throw new Error(`superhero-api error: ${res.status}`);
  return (await res.json()) as Hero;
}

async function getPowerstats(id: number) {
  const res = await fetch(`${BASE_URL}/powerstats/${id}.json`);
  if (!res.ok) throw new Error(`superhero-api error: ${res.status}`);
  return (await res.json()) as PowerStats;
}

async function getBiography(id: number) {
  const res = await fetch(`${BASE_URL}/biography/${id}.json`);
  if (!res.ok) throw new Error(`superhero-api error: ${res.status}`);
  return (await res.json()) as Biography;
}

export default { tools, callTool } satisfies McpToolExport;
