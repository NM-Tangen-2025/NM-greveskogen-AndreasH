export default function Home() {
    async function GetData() {
    try {
      const tempAPI = await fetch(`https://fortunate-bear-715099df12.strapiapp.com/api/Lokasjoner?populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 1330d7d0a7e52fbcf4779861a6948373dff5f06b8bbce4cc0d08025276bb45ce3114590200d5b3cb7d0a856325f55c71e170fc2f2e4508102712e4730fbfb075c745056641f618bee2e54bf7ccdb1a56c6c4e89d60ef7c25f728198bde97d7e4cfbb773f63336580c64084350f57ffba8a15e289b1016cbe4df256bc2928bd50',
        },
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
  GetData()
  return (
    <>
    <h1>Template page</h1>
    </>
  );
}
