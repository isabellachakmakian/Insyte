import styles from "./AppAnalytics.module.css";
import { Container, Row, Col } from 'react-bootstrap';

export const AppAnalytics = ({ onSave, isSaved, saving }) => {
  return (
    <Container fluid className={styles.analyticsSection}>

      {/* HEADER ROW */}
      <Row className={`${styles.analyticsHeader} mb-4`}>
        <Col>
          <h3 className={styles.analyticsTitle}>App Analytics</h3>
        </Col>
        <Col xs="auto" className={styles.actionButtonGroup}>
          <button
            className={`${styles.saveButton} ${isSaved ? styles.saveButtonActive : ''}`}
            onClick={onSave}
            disabled={saving || isSaved}
          >
            {saving ? 'Saving…' : isSaved ? 'Saved' : '+ Save'}
          </button>
          <button className={styles.compareButton}>Compare</button>
        </Col>
      </Row>

      {/* INSIGHTS ROW */}
      <Row className="g-4 mb-5">
        {/* EFFICIENCY INSIGHTS */}
        <Col lg={6}>
          <div className={styles.insightsCard}>
            <div className={styles.positiveHeader}></div>
            <span className={styles.insightsPositiveHeader}>EFFICIENCY</span>
            <h4 className="mt-2">App Strengths</h4>

            <div className={styles.insightsBody}>
              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightPositiveLabel}>UI/UX</span>
                </div>
                <span className={styles.insightText}>Highly intuitive navigation flow optimized for React‑Vite.</span>
              </div>

              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightPositiveLabel}>RUNTIME</span>
                </div>
                <span className={styles.insightText}>Efficient memory allocation during large dataset renders.</span>
              </div>

              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightPositiveLabel}>AESTHETIC</span>
                </div>
                <span className={styles.insightText}>Glassmorphism implementation adds professional depth.</span>
              </div>
            </div>
          </div>
        </Col>

        {/* INEFFICIENCY INSIGHTS */}
        <Col lg={6}>
          <div className={styles.insightsCard}>
            <div className={styles.negativeHeader}></div>
            <span className={styles.insightsNegativeHeader}>IMPROVEMENT</span>
            <h4 className="mt-2">Refinement Areas</h4>

            <div className={styles.insightsBody}>
              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightNegativeLabel}>LATENCY</span>
                </div>
                <span className={styles.insightText}>Potential fetch delays identified in backend migrations.</span>
              </div>

              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightNegativeLabel}>MEMORY</span>
                </div>
                <span className={styles.insightText}>High overhead detected when scaling complex data structures.</span>
              </div>

              <div className={styles.insightItem}>
                <div className={styles.tagWrapper}>
                  <span className={styles.insightNegativeLabel}>DEVOPS</span>
                </div>
                <span className={styles.insightText}>Unused dependencies identified in the current Vite skeleton.</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* AI GENERATED GRAPHS ROW */}
      <Row className="g-4">

        <Col md={6} lg={4}>
          <div className={styles.graphBox}>
            <div className={styles.graphHeader}></div>
            <div className={styles.graphInformation}>
              <h4>DOWNLOADS GRAPH</h4>
              <div className={styles.graphImage}> {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}</div>
            </div>
          </div>
        </Col>

        <Col md={6} lg={4}>
          <div className={styles.graphBox}>
            <div className={styles.graphHeader}></div>
            <div className={styles.graphInformation}>
              <h4>RATINGS GRAPH</h4>
              <div className={styles.graphImage}> {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}</div>
            </div>
          </div>
        </Col>

        <Col md={12} lg={4}>
          <div className={styles.graphBox}>
            <div className={styles.graphHeader}></div>
            <div className={styles.graphInformation}>
              <h4>OTHER GRAPH</h4>
              <div className={styles.graphImage}> {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppAnalytics;