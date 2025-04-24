
import { NextResponse, NextRequest } from 'next/server';
import { getNewsById } from '@/src/utils/news';
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("get request recieved")
  try {
    // Await the params object before accessing its properties
    const resolvedParams = await params;
    const id = resolvedParams.id;
    console.log('Id ', id);
    console.log('Getting product from the database');
    const allProducts = await getNewsById(String(id));
    // console.log('Connectionstatus == ', connectionStatus.status);
    const responseData = allProducts;

    // console.log('Product in the database:', responseData.data);

    if (allProducts.success == false) {
      // console.log('Connection status === 500');

      // Type guard to check if connectionStatus has error property
      if ('error' in allProducts && responseData.error === 'No database') {
        return NextResponse.json({ error: 'No database' }, { status: 500 });
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    console.log("Data being sent to client:", responseData.data);
    return NextResponse.json({ status: 200, data: responseData.data });
  } catch (error) {
    console.error('Error from getting product', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
