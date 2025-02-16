import { useState, useEffect } from 'react';
import { SensorData } from '../types';

const THINGSPEAK_CHANNEL_ID = '2509744'; // Replace with your channel ID
const THINGSPEAK_API_KEY = 'LT9UAGOSE4A5N36G'; // Replace with your API key

export function useThingSpeak() {
  const [data, setData] = useState<SensorData[]>([]); // Change data to an array of SensorData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}&results=30`
        );
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result = await response.json();
        
        const fetchedData = result.feeds.map((feed: any) => ({
          timestamp: feed.created_at,
          temperature: parseFloat(feed.field1),
          humidity: parseFloat(feed.field2),
          co2: parseFloat(feed.field3),
          voc: parseFloat(feed.field4),
          soilMoisture: parseFloat(feed.field5),
          lightIntensity: parseFloat(feed.field6),
        }));

        setData(fetchedData); // Set the array of 30 data points
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
