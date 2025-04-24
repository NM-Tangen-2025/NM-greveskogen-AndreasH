import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url'); // Get the Strapi image URL from query param

  if (!imageUrl) {
    return new NextResponse('Missing image URL parameter', { status: 400 });
  }

  // Basic validation to prevent open proxy abuse (optional but recommended)
  const allowedBaseUrl = process.env.STRAPI_MEDIA_URL || ''; // Get base URL from env
  if (!allowedBaseUrl || !imageUrl.startsWith(allowedBaseUrl)) {
     console.warn(`Blocked proxy request for disallowed URL: ${imageUrl}`);
     return new NextResponse('Invalid image URL', { status: 400 });
  }


  const apiKey = process.env.CMS_API_KEY;

  if (!apiKey) {
    console.error('CMS_API_KEY is not defined in environment variables.');
    return new NextResponse('Internal server error: API key missing', { status: 500 });
  }

  try {
    // Fetch the image from Strapi using the API key
    const strapiResponse = await fetch(imageUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      cache: 'no-store', // Avoid caching potentially sensitive data if needed
    });

    if (!strapiResponse.ok) {
      // Forward Strapi's error status and message if possible
      const errorText = await strapiResponse.text();
      console.error(`Strapi image fetch failed (${strapiResponse.status}): ${errorText}`);
      return new NextResponse(`Failed to fetch image from source: ${strapiResponse.statusText}`, {
        status: strapiResponse.status,
      });
    }

    // Get the image data as a blob/buffer
    const imageBuffer = await strapiResponse.arrayBuffer();
    const contentType = strapiResponse.headers.get('content-type') || 'application/octet-stream';

    // Stream the image back to the client
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': imageBuffer.byteLength.toString(),
        // Optional: Add caching headers if appropriate for your images
        // 'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('Error in image proxy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}