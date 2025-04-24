export async function getNews() {
  try {
    const response = await fetch(
      `https://fortunate-bear-715099df12.strapiapp.com/api/Nyhetsartikler?populate=*`,
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

    console.log('Image:', data.data[1].Bilde); 

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return { success: false, error: 'Failed to fetch news data' };
  }
}