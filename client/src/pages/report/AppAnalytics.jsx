import styles from "./AppAnalytics.module.css";
import { Container, Row, Col } from 'react-bootstrap';
import { positiveInsights, negativeInsights } from "./DummyData";
import DummyMetricsSummaryRow from './DummyMetricsSummaryRow';
export const AppAnalytics = ({app}) => {
  
  return (

    <Container fluid className={styles.dashboardContainer}>
      
      {/* HEADER ROW */}
      <Row className="g-5">

        {/* Title */}
        <Col lg={12}>
          <div className= {styles.sectionHeader}>
            <h1 className={styles.analyticsTitle}>AI Analytics</h1>
            <p>Scroll down to view a detailed overview with AI analysis</p>
          </div>
        </Col>
        <DummyMetricsSummaryRow />

        {/* LEFT: Positive Insights Card */}
        <Col lg={6}>
          <div className={`${styles.reportCard} ${styles.positiveCard}`}>
            <h6>EFFICIENCY</h6>
            <h2 className={styles.title}> App Strengths</h2>

            <div className={styles.insightGrid}>
                {positiveInsights.map((item, index) => (

                <div key={index} className={styles.insightTile}>

                    {/* The Wrapper ensures the start of the text is perfectly aligned */}
                    <div className={styles.tagWrapper}>
                      <span className={`${styles.statusTag} ${styles.positiveTag}`}>
                          {item.label}
                      </span>
                    </div>
                    
                    <span className={styles.insightText}>
                      {item.text}
                    </span>
                </div>

                ))}
            </div>
          </div>
        </Col>
        
        {/* RIGHT: Negative Insights Card */}
        <Col lg={6}>
          <div className={`${styles.reportCard} ${styles.negativeCard}`}>
            <h6>IMPROVEMENT</h6>
            <h2 className={styles.title}>Refinement Areas</h2>
              
            <div className={styles.insightGrid}>
                {negativeInsights.map((item, index) => (

                <div key={index} className={styles.insightTile}>
                    <div className={styles.tagWrapper}>
                      <span className={`${styles.statusTag} ${styles.negativeTag}`}>
                      {item.label}
                      </span>
                    </div>

                    <span className={styles.insightText}>
                      {item.text}
                    </span>
                </div>

                ))}
            </div>
          </div>
        </Col>


      </Row>
      
    </Container>
  );
};

export default AppAnalytics;