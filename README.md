# mcp-superhero

Superhero MCP — wraps akabab.github.io/superhero-api (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `list_all` | List all superheroes in the database with their IDs, names, and slugs. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "superhero": {
      "url": "https://gateway.pipeworx.io/superhero/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Superhero data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
