import React, { useState } from "react";
import axios from "axios";

function Emergency() {
  const [authStatus, setAuthStatus] = useState(null);
  const [nfcId, setNfcId] = useState("");
  const [data, setData] = useState(null);
  const [hospital, setHospital] = useState({ name: "", code: "" });
  const [error, setError] = useState("");

  const handleAuthentication = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/authentication`, {
        params: { name: hospital.name, code: hospital.code },
      });
      if (response.status === 200) {
        setAuthStatus(true);
        setError("");
      }
    } catch (error) {
      setAuthStatus(false);
      setError(error.response?.data?.message || "Authentication failed");
      console.error("Authentication failed:", error);
    }
  };

  const handleEmergencyData = async () => {
    if (authStatus) {
      try {
        const response = await axios.get(`http://localhost:3000/emergency`, {
          params: { nfcid: nfcId },
        });
        console.log("Emergency data response:", response.data);
        setData(response.data[0]); // Assuming the API returns an array with one object
        setError("");
      } catch (error) {
        console.error("Error fetching emergency data:", error);
        setError(error.response?.data?.message || "Error fetching emergency data");
        setData(null);
      }
    }
  };

  return (
    <div>
      <h1>Hospital Authentication</h1>
      <input
        type="text"
        placeholder="Hospital Name"
        value={hospital.name}
        onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Hospital Code"
        value={hospital.code}
        onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
      />
      <button onClick={handleAuthentication}>Authenticate</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {authStatus === true && (
        <div>
          <h2>Enter NFC ID</h2>
          <input
            type="text"
            placeholder="Enter NFC ID"
            value={nfcId}
            onChange={(e) => setNfcId(e.target.value)}
          />
          <button onClick={handleEmergencyData}>Get Emergency Data</button>

          {data && (
            <div>
              <p>Name: {data.name || 'N/A'}</p>
              <p>Blood Group: {data.blood_group || 'N/A'}</p>
              <p>Address: {data.address || 'N/A'}</p>
              <p>
                Father's Contact:{" "}
                {data.father_contact ? (
                  <a href={`tel:${data.father_contact}`}>{data.father_contact}</a>
                ) : 'N/A'}
              </p>
            </div>
          )}
        </div>
      )}

      {authStatus === false && <p>Authentication Failed!</p>}
    </div>
  );
}

export default Emergency;