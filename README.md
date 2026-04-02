# mcp-superhero

MCP server for superhero data via the [Superhero API](https://akabab.github.io/superhero-api/). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `list_all` | List all superheroes with IDs, names, and slugs |
| `get_hero` | Get full data for a superhero by ID |
| `get_powerstats` | Get power statistics for a superhero by ID |
| `get_biography` | Get biography details for a superhero by ID |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "superhero_get_hero",
      "arguments": { "id": 1 }
    },
    "id": 1
  }'
```

## License

MIT
