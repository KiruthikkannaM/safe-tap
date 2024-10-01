// // import React, { useState } from "react";
// // import axios from "axios";

// // function Lost() {
// //   const [data, setData] = useState(null);
// //   const [nfcId, setNfcId] = useState("");

// //   const handleSearch = async () => {
// //     console.log("Search button clicked. NFC ID entered:", nfcId);  // Check if this logs
// //     try {
// //       const response = await axios.get(`/loss`, {
// //         params: { nfcid: nfcId },
// //       });
// //       console.log("API Response:", response.data);  // Log the API response
// //       setData(response.data[0]);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };
  

// //   return (
// //     <div>
// //       <h1>Lost Child Information</h1>
// //       <input
// //         type="text"
// //         placeholder="Enter NFC ID"
// //         value={nfcId}
// //         onChange={(e) => setNfcId(e.target.value)}
// //       />
// //       <button onClick={handleSearch}>Search</button>

// //       {data && (
// //         <div>
// //           <p>Name: {data.name}</p>
// //           <p>Address: {data.address}</p>
// //           <p>Age: {data.age}</p>
// //           <p>Contact Info: {data.contact_info}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Lost;
// import React, { useState } from "react";
// import axios from "axios";

// function Lost() {
//   const [data, setData] = useState(null);
//   const [nfcId, setNfcId] = useState("");
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     console.log("Search button clicked. NFC ID entered:", nfcId);
//     try {
//       const response = await axios.get(`http://localhost:3000/loss`, {
//         params: { nfcid: nfcId },
//       });
//       console.log("API Response:", response.data);
//       setData(Array.isArray(response.data) ? response.data[0] : response.data);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setData(null);
//       setError(error.response?.data?.message || "An error occurred while fetching data.");
//     }
//   };

//   return (
//     <div>
//       <h1>Lost Child Information</h1>
//       <input
//         type="text"
//         placeholder="Enter NFC ID"
//         value={nfcId}
//         onChange={(e) => setNfcId(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {data && (
//         <div>
//           <p>Name: {data.name || 'N/A'}</p>
//           <p>Address: {data.address || 'N/A'}</p>
//           <p>Age: {data.age || 'N/A'}</p>
//           <p>Contact Info: {data.contact_info || 'N/A'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Lost;
import React, { useState } from "react";
import axios from "axios";

function Lost() {
  const [data, setData] = useState(null);
  const [nfcId, setNfcId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("Search button clicked. NFC ID entered:", nfcId);
    try {
      const response = await axios.get(`http://localhost:3000/loss`, {
        params: { nfcid: nfcId },
      });
      console.log("API Response:", response.data);
      setData(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
      setError(error.response?.data?.message || "An error occurred while fetching data.");
    }
  };

  return (
    <div>
      <h1>Lost Child Information</h1>
      <input
        type="text"
        placeholder="Enter NFC ID"
        value={nfcId}
        onChange={(e) => setNfcId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <p>Name: {data.name || 'N/A'}</p>
          <p>Address: {data.address || 'N/A'}</p>
          <p>Age: {data.age || 'N/A'}</p>
          <p>Contact Info: {data.contact_info || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Lost;