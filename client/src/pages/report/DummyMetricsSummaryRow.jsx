import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './AppAnalytics.module.css';

const ecobeeMetrics = {
    installs: "30.0K",
    updatePill: "4 Days Ago",
    ratingRatio: "4.8 vs 4.7"
};

export default function DummyMetricsSummaryRow(){
    return (
        <Row className="g-3 mb-4">
            {/* Metric 1: Monthly Installs */}
            <Col md={4}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Est. Monthly Installs</span>
                    <h2 className={styles.statValue}>{ecobeeMetrics.installs}</h2>
                    <p className={styles.statSubtext}>Based on 3% review rate</p>
                </div>
            </Col>

            {/* Metric 2: Update Velocity */}
            <Col md={4}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Update Velocity</span>
                    <h2 className={styles.statValue}>{ecobeeMetrics.updatePill}</h2>
                    <p className={styles.statSubtext}>Signal: High Agility</p>
                </div>
            </Col>

            {/* Metric 3: Quality Gap */}
            <Col md={4}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>All-Time vs Current</span>
                    <h2 className={styles.statValue}>{ecobeeMetrics.ratingRatio}</h2>
                    <p className={styles.statSubtext}>Stability: Stable</p>
                </div>
            </Col>
        </Row>
    );
};