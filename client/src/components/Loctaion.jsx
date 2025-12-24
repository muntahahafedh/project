// Location.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null);
  const [geoData, setGeoData] = useState(null);

  // جلب IP
  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  // جلب Geolocation من API ثاني
  const fetchGeoData = async () => {
    if (!ip) return;
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      setGeoData(response.data);
    } catch (error) {
      console.error("Error fetching Geo Data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    fetchGeoData();
  }, [ip]);

  return (
    <div>
      <h3>Location Information</h3>
      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP...</p>}
      {geoData ? (
        <div>
          Country: {geoData.country_name} <br />
          Region: {geoData.region} <br />
          City: {geoData.city}
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
