// src/DataDisplay.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './dd.css'; // Import the CSS file

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const DataDisplay = () => {
  const [gasData, setGasData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [timestamps, setTimestamps] = useState([]); // Store timestamps

  const [gasLevel, setGasLevel] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const gasRef = ref(database, 'gasLevel');
    onValue(gasRef, (snapshot) => {
      const value = snapshot.val();
      setGasLevel(value);
      setGasData((prev) => [...prev, value]);
      setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]); // Add timestamp
    });
  }, []);

  useEffect(() => {
    const humidityRef = ref(database, 'humidity');
    onValue(humidityRef, (snapshot) => {
      const value = snapshot.val();
      setHumidity(value);
      setHumidityData((prev) => [...prev, value]);
      setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]); // Add timestamp
    });
  }, []);

  useEffect(() => {
    const temperatureRef = ref(database, 'temperature');
    onValue(temperatureRef, (snapshot) => {
      const value = snapshot.val();
      setTemperature(value);
      setTemperatureData((prev) => [...prev, value]);
      setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]); // Add timestamp
    });
  }, []);

  const createChartData = (data, label) => ({
    labels: timestamps, // Use timestamps for x-axis
    datasets: [
      {
        label: label,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  });

  return (
    <div>
      <h1>Firebase Realtime Data</h1>
      <pre>The Gas Level right now in your Area: {JSON.stringify(gasLevel, null, 2)}</pre>
      <pre>The Humidity right now in your Area: {JSON.stringify(humidity, null, 2)}</pre>
      <pre>The Temperature right now in your Area: {JSON.stringify(temperature, null, 2)}</pre>
      
      <div className="charts-container">
        <div className="chart">
          <h2>Gas Level Over Time</h2>
          <Line data={createChartData(gasData, 'Gas Level')} />
        </div>
        <div className="chart">
          <h2>Humidity Over Time</h2>
          <Line data={createChartData(humidityData, 'Humidity')} />
        </div>
        <div className="chart">
          <h2>Temperature Over Time</h2>
          <Line data={createChartData(temperatureData, 'Temperature')} />
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
