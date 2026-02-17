export async function PATCH(req: NextRequest) {
  const data = await req.json();
  // data: { id, action: 'accept' | 'reject' }
  if (!data.id || !['accept', 'reject'].includes(data.action)) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const idx = challenges.findIndex((c) => c.id === data.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
  }
  challenges[idx].status = data.action === 'accept' ? 'accepted' : 'rejected';
  return NextResponse.json({ success: true, challenge: challenges[idx] });
}
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for demo (replace with DB in production)
const challenges: any[] = [];

export async function POST(req: NextRequest) {
  const data = await req.json();
  // data: { fromUser, toUserCode, amount, message }
  if (!data.fromUser || !data.toUserCode || !data.amount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const challenge = {
    id: uuidv4(),
    fromUser: data.fromUser,
    toUserCode: data.toUserCode,
    amount: data.amount,
    message: data.message || '',
    status: 'pending',
    createdAt: Date.now(),
  };
  challenges.push(challenge);
  return NextResponse.json({ success: true, challenge });
}

export async function GET(req: NextRequest) {
  // Query: ?userCode=PB-1234-HN
  const { searchParams } = new URL(req.url);
  const userCode = searchParams.get('userCode');
  if (!userCode)
    return NextResponse.json({ error: 'Missing userCode' }, { status: 400 });
  const received = challenges.filter((c) => c.toUserCode === userCode);
  return NextResponse.json({ challenges: received });
}
