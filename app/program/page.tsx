'use client'
import { useEffect } from "react";

export default function Page() {
  async function getData() {
    try {
      const tempAPI = await fetch(`/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await tempAPI.json();
    console.log('Response data from events API:', responseData);

      if (tempAPI.ok) {
        // Sucessfull request - handle accordingly
      }
    } catch (error) {
      console.error('Error while fetching URL', error);
    }
  }
    useEffect(() => {
      getData();
    }, []); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Program</h1>
      <p className="text-lg">Her kommer programmet.</p>
    </div>
  );
}
