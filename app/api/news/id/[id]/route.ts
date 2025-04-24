import { NextResponse, NextRequest } from 'next/server';
import { getNewsById } from '@/src/utils/news';

// Correct the function signature for App Router API Route Handlers
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('get request received');
  try {
    // Await context.params as suggested by the runtime error
    const { id } = await params;
    console.log('Id ', id);
    console.log('Getting news article from the source');
    const allProducts = await getNewsById(String(id));
    const responseData = allProducts;

    // console.log('News article from source:', responseData.data);

    if (allProducts.success == false) {
      // console.log('Fetch status === failed');
      if ('error' in allProducts && responseData.error === 'No database') {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
      if ('error' in allProducts && responseData.error === 'Not found') {
        return NextResponse.json(
          { error: 'News article not found' },
          { status: 404 }
        );
      }

      // Generic error if success is false but no specific error matched
      return NextResponse.json(
        { error: 'Internal server error fetching news article' },
        { status: 500 }
      );
    }

    // console.log("Data being sent to client:", responseData.data);
    // Restore original successful response structure
    return NextResponse.json({ status: 200, data: responseData.data });
  } catch (error) {
    console.error('Error processing request for news article ID:', error); // Keep updated log
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
