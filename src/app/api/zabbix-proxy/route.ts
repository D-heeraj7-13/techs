
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import https from 'https';

// Use environment variable to control TLS verification. If you want to
// disable verification locally, set NODE_TLS_REJECT_UNAUTHORIZED=0 in
// your `.env.local` (do NOT do this in production).
const rejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0';

const httpsAgent = new https.Agent({
  rejectUnauthorized,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('Proxy received:', body);

    const resp = await axios.post(
      'https://192.168.0.252/monitor/api_jsonrpc.php',
      body,
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent,
        // accept any status so we forward upstream status back
        validateStatus: () => true,
      }
    );

    console.log('Zabbix upstream status:', resp.status);
    console.log('Zabbix upstream data:', resp.data);

    return NextResponse.json(resp.data, { status: resp.status });
  } catch (err: any) {
    console.error('Zabbix Proxy Error:', err);
    return NextResponse.json(
      { error: 'Zabbix proxy failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}