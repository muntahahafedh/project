// src/components/Location.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null);
  const [geoData, setGeoData] = useState(null);

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
      // Fetch geolocation data
      const geoResponse = await axios.get(`https://ipapi.co/${response.data.ip}/json/`);
      setGeoData(geoResponse.data);
    } catch (error) {
      console.error("Error fetching IP or geolocation:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  return (
    <div>
      <p>Location Information:</p>
      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
      {geoData ? (
        <div>
          Country: {geoData.country_name} <br />
          Region: {geoData.region}
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
