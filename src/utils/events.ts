export async function getEvents() {
      try {
    const response = await fetch(
      `https://fortunate-bear-715099df12.strapiapp.com/api/Arrangementer?populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${process.env.CMS_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // console.log('Arrangementer: ', data); 

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return { success: false, error: 'Failed to fetch news data' };
  }
}