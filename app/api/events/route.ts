'use server';

import { NextResponse } from 'next/server';
import {getEvents} from '@/src/utils/events';

export async function GET() {
  try {
    console.log('Getting events from strapi...');
    const allEvents = await getEvents();

    const responseData = allEvents;



    if (allEvents.success == false) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    // console.log('Response data from Strapi:', responseData.data);
    
    return NextResponse.json({ status: 200, data: responseData.data });
  } catch (error) {
    console.error('Error from Getting events', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
