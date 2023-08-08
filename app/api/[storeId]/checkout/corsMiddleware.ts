import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default function corsMiddleware(
  req: NextApiRequest,
  _res: NextApiResponse,
  next: () => void
) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  next();
}
