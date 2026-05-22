import { NextResponse } from 'next/server';

export async function POST() {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thank you for calling Oceana Hemp. Our business hours are Monday through Friday, 9 AM to 5 PM Pacific. Please leave a message or send us a text and we will get back to you shortly. You can also reach us by email at hello at oceanahemp dot com.</Say>
</Response>`;

  return new NextResponse(twiml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}