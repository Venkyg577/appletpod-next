import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 });
    }

    // Ping IndexNow
    const payload = {
      host: 'appletpod.com',
      key: INDEXNOW_KEY,
      urlList: urls.map(url =>
        url.startsWith('http') ? url : `https://appletpod.com${url}`
      ),
    };

    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'IndexNow ping failed' }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      urlCount: urls.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
