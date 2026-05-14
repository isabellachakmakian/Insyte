import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BarChart, LineChart } from '@mui/x-charts';
import styles from './Graphs.module.css';

// --- ecobee Dummy Data ---
const dataset = [
  { week: 'Wk 1', reviews: 145, threshold: 310, movingAvg: 4.6, overallAvg: 4.5 },
  { week: 'Wk 2', reviews: 130, threshold: 310, movingAvg: 4.5, overallAvg: 4.5 },
  { week: 'Wk 3', reviews: 160, threshold: 310, movingAvg: 4.7, overallAvg: 4.5 },
  { week: 'Wk 4', reviews: 140, threshold: 310, movingAvg: 4.6, overallAvg: 4.5 },
  { week: 'Wk 5', reviews: 185, threshold: 310, movingAvg: 4.4, overallAvg: 4.5 },
  { week: 'Wk 6', reviews: 150, threshold: 310, movingAvg: 4.5, overallAvg: 4.5 },
  { week: 'Wk 7', reviews: 420, threshold: 310, movingAvg: 2.8, overallAvg: 4.5 }, // Viral Spike
  { week: 'Wk 8', reviews: 290, threshold: 310, movingAvg: 3.5, overallAvg: 4.5 },
  { week: 'Wk 9', reviews: 210, threshold: 310, movingAvg: 4.2, overallAvg: 4.5 },
  { week: 'Wk 10', reviews: 175, threshold: 310, movingAvg: 4.6, overallAvg: 4.5 },
  { week: 'Wk 11', reviews: 160, threshold: 310, movingAvg: 4.7, overallAvg: 4.5 },
  { week: 'Wk 12', reviews: 155, threshold: 310, movingAvg: 4.8, overallAvg: 4.5 },
];

const EcobeeAnalysisPage = () => {
  return (
    <Container className={styles.graphsContainer}>
      <Row className="g-4">
        
        {/* --- DOWNLOADS / VELOCITY GRAPH --- */}
        <Col lg={12}>
          
          <div className={styles.graphBox}>
            <div className={styles.graphInformation}>
              <h4>BREAKOUT VELOCITY (REVIEWS)</h4>
              <div className={styles.graphImage}>
                <BarChart
                  dataset={dataset}
                  xAxis={[{ scaleType: 'band', dataKey: 'week' }]}
                  series={[
                    { dataKey: 'reviews', label: 'New Reviews', color: '#2196F3' },
                    { 
                      type: 'line', 
                      dataKey: 'threshold', 
                      label: 'Viral Threshold', 
                      color: '#ef4444', 
                      showMark: false 
                    }
                  ]}
                  height={350}
                  sx={{
                    '& .MuiLineElement-root': { strokeDasharray: '5 5', strokeWidth: 2 }
                  }}
                />
              </div>
            </div>
          </div>
        </Col>

        {/* --- RATINGS GRAPH --- */}
        <Col lg={12}>
          <div className={styles.graphBox}>
            <div className={styles.graphInformation}>
              <h4>SENTIMENT PULSE (RATINGS)</h4>
              <div className={styles.graphImage}>
                <LineChart
                  dataset={dataset}
                  xAxis={[{ scaleType: 'point', dataKey: 'week' }]}
                  yAxis={[{ min: 1, max: 5 }]}
                  series={[
                    { dataKey: 'movingAvg', label: 'Weekly Moving Avg', color: '#10b981', curve: 'catmullRom' },
                    { dataKey: 'overallAvg', label: 'All-Time Average', color: '#9ca3af', showMark: false }
                  ]}
                  height={350}
                  sx={{
                    '& .MuiLineElement-series-overallAvg': { strokeDasharray: '4 4' }
                  }}
                />
              </div>
            </div>
          </div>
        </Col>

        {/* --- OTHER METRICS --- */}
        <Col lg={12}>
            <div className={styles.graphBox}>
                <div className={styles.graphInformation}>
                    <h4>OTHER METRICS</h4>
                    <div className={styles.graphImage}>
                        <div className={styles.emptyGraphPlaceholder}>
                            Awaiting Market Data...
                        </div>
                    </div>
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EcobeeAnalysisPage;