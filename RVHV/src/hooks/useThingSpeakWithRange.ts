import { useState, useEffect } from 'react';
import { SensorData } from '../types';

const THINGSPEAK_CHANNEL_ID = '2509744'; // Replace with your channel ID
const THINGSPEAK_API_KEY = 'LT9UAGOSE4A5N36G'; // Replace with your API key

export function useThingSpeakWithRange(startDate: Date, endDate: Date) {
  const [data, setData] = useState<SensorData[]>([]); // Store fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const start = startDate.toISOString();
        const end = endDate.toISOString();

        const response = await fetch(
          `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}&start=${start}&end=${end}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();

        // Map fetched data to SensorData
        const fetchedData: SensorData[] = result.feeds.map((feed: any) => ({
          timestamp: feed.created_at,
          temperature: parseFloat(feed.field1),
          humidity: parseFloat(feed.field2),
          co2: parseFloat(feed.field3),
          voc: parseFloat(feed.field4),
          soilMoisture: parseFloat(feed.field5),
          lightIntensity: parseFloat(feed.field6),
        }));

        setData(fetchedData); // Set the fetched data
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
      console.log("FetchedData");
      // console.log(fetchedData);
    };

    fetchData(); // Fetch data whenever startDate or endDate changes
  }, [startDate, endDate]);
  console.log("data:");
  console.log(data);
  return { data, loading, error };
}
