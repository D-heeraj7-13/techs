import { NextResponse } from 'next/server';

/**
 * Simple server-side proxy to call the Zabbix JSON-RPC API.
 * This keeps the API token on the server and out of the browser.
 * Accepts a POST request with a JSON-RPC body and forwards it to Zabbix,
 * injecting the auth token from environment variables.
 */
export async function POST(req: Request) {
  try {
    // Prefer non-public server-side env vars for security.
    // You can set these in your deployment environment or .env (do NOT commit secrets):
    // ZABBIX_URL (optional) and ZABBIX_TOKEN (recommended, required at runtime)
    const ZABBIX_URL = process.env.ZABBIX_URL || process.env.NEXT_PUBLIC_ZABBIX_URL || 'https://192.168.0.252/monitor/api_jsonrpc.php';
    const ZABBIX_TOKEN = process.env.ZABBIX_TOKEN || process.env.NEXT_PUBLIC_ZABBIX_TOKEN || undefined;

    if (!ZABBIX_URL) {
      return NextResponse.json({ error: 'Zabbix URL not configured on server' }, { status: 500 });
    }
    if (!ZABBIX_TOKEN) {
      // Token not set yet — return a clear error so you can provide it.
      return NextResponse.json({ error: 'Zabbix token not configured on server. Set ZABBIX_TOKEN env var.' }, { status: 500 });
    }

    const body = await req.json();

    // Ensure we forward a proper JSON-RPC request and attach auth token
    const payload = {
      jsonrpc: body.jsonrpc || '2.0',
      method: body.method,
      params: body.params || {},
      id: body.id ?? 1,
      auth: ZABBIX_TOKEN,
    };

    const forwarded = await fetch(ZABBIX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await forwarded.json();

    // Return the Zabbix response transparently. Keep CORS safe by using same-origin.
    return NextResponse.json(data, { status: forwarded.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
