import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import styles from './ComparePage.module.css';

const sentimentData = [
  { week: 'Wk 1', ecobee: 4.8, ecoTrack: 4.2 },
  { week: 'Wk 2', ecobee: 4.7, ecoTrack: 4.3 },
  { week: 'Wk 3', ecobee: 4.8, ecoTrack: 4.1 },
  { week: 'Wk 4', ecobee: 4.5, ecoTrack: 4.4 }, // ecobee ships a bug
  { week: 'Wk 5', ecobee: 4.2, ecoTrack: 4.5 }, // EcoTrack overtakes
  { week: 'Wk 6', ecobee: 4.4, ecoTrack: 4.6 },
  { week: 'Wk 7', ecobee: 4.7, ecoTrack: 4.6 }, // ecobee recovers
  { week: 'Wk 8', ecobee: 4.8, ecoTrack: 3.2 }, // EcoTrack latest update fails
  { week: 'Wk 9', ecobee: 4.8, ecoTrack: 3.5 },
  { week: 'Wk 10', ecobee: 4.7, ecoTrack: 3.8 },
  { week: 'Wk 11', ecobee: 4.8, ecoTrack: 4.1 },
  { week: 'Wk 12', ecobee: 4.8, ecoTrack: 4.3 },
];

const SentimentComparison = () => {
  return (
    <div className={styles.graphBox}>
      <div className={styles.graphInformation}>
        <h4>THE QUALITY WAR: SENTIMENT OVER TIME</h4>
       
        
        <div className={styles.graphImage} style={{ height: '400px', width: '100%' }}>
          <LineChart
            dataset={sentimentData}
            xAxis={[{ 
                scaleType: 'point', 
                dataKey: 'week',
                label: 'Last 12 Weeks' 
            }]}
            yAxis={[{ 
                min: 1, 
                max: 5,
                label: 'Rating'
            }]}
            series={[
              {
                dataKey: 'ecobee',
                label: 'ecobee',
                color: '#2196F3', // Blue
                curve: 'catmullRom',
                showMark: true,
              },
              {
                dataKey: 'ecoTrack',
                label: 'EcoTrack (Challenger)',
                color: '#10b981', // Green
                curve: 'catmullRom',
                showMark: true,
              },
            ]}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'middle' },
                    padding: 0,
                },
            }}
            sx={{
                // Customizing the chart to look modern
                '.MuiLineElement-root': { strokeWidth: 3 },
                '.MuiMarkElement-root': { scale: '0.6' }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SentimentComparison;