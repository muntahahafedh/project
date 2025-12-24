// src/components/Location.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null);
  const [geoData, setGeoData] = useState(null);

  // جلب الـ IP
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };
    fetchIp();
  }, []);

  // جلب بيانات الـ Geo بعد الحصول على الـ IP
  useEffect(() => {
    const fetchGeoData = async () => {
      if (!ip) return;
      try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        setGeoData({
          country: response.data.country_name,
          region: response.data.region,
          city: response.data.city,
        });
      } catch (error) {
        console.error("Error fetching Geo data:", error);
      }
    };
    fetchGeoData();
  }, [ip]);

  return (
    <div className="location-info">
      <h4>Location Information</h4>

      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP...</p>}

      {geoData ? (
        <div>
          <p>Country: {geoData.country}</p>
          <p>Region: {geoData.region}</p>
          <p>City: {geoData.city}</p>
        </div>
      ) : (
        <p>Loading Geo data...</p>
      )}
    </div>
  );
};

export default Location;
