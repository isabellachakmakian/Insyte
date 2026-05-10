import {Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { LineChart } from '@mui/x-charts/LineChart';

import styles from './Graphs.module.css';

export default function Graphs({app}) {
    return(
        <Container className={styles.graphsContainer}>
            <Row className="g-4">
                <Col lg={12} >
                    <div className={styles.graphBox}>
                        <div className={styles.graphInformation}>
                            <h4>DOWNLOADS GRAPH</h4>
                            <div className={styles.graphImage}> 
                                
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                                    height={300} 
                                />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col lg={12}>
                    <div className={styles.graphBox}>
                        <div className={styles.graphInformation}>
                            <h4>RATINGS GRAPH</h4>
                            <div className={styles.graphImage}>
                                <div className={styles.emptyGraphPlaceholder}>
                                    Awaiting Rating Data...
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

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

 
    )
}