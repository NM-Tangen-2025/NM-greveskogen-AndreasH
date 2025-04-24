'use client'
import { useEffect } from "react";
export default function Page(){
    async function GetNews() {
    try {
      const tempAPI = await fetch(`/api/news/`, {
        method: 'GET',
      });

      const responseData = await tempAPI.json();

      console.log("Responsedata from nyhetsapi: ", responseData)

      if (tempAPI.ok) {
        // Sucessfull request - handle accordingly
      }
    } catch (error) {
      console.error("Error while fetching URL", error)
    }
  }
    useEffect(() => {
        GetNews()
  }, []);
  
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Nyheter</h1>
            <p className="text-lg">Her kommer nyhetsartikler.</p>
        </div>
    )
}