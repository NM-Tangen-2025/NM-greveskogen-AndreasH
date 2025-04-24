'use server';

import { NextResponse } from 'next/server';
import {getNews} from '@/src/utils/news';
export async function GET() {
  try {
    console.log('Getting news articles from strapi...');
    const allNews = await getNews();

    const responseData = allNews;



    if (allNews.success == false) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    console.log('Response data from Strapi:', responseData.data);
    
    return NextResponse.json({ status: 200, data: responseData.data });
  } catch (error) {
    console.error('Error from Getting news articles', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
