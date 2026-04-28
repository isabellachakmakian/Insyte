import styles from "./AppAnalytics.module.css";

export const AppAnalytics = () => {
  return (
    <div className={styles.analyticsSection}>

      {/* HEADER ROW*/}
      <div className={styles.analyticsHeader}>
        <h3 className={styles.analyticsTitle}>App Analytics</h3>
        <button className={styles.compareButton}>Compare</button>
      </div>

      {/* INSIGHTS */}
      <div className={styles.insightsContainer}>
        
        {/* EFFICIENCY INSIGHTS */}
        <div className={styles.insightsCard}>
          <div className={styles.positiveHeader}></div>
          <span className={styles.insightsPositiveHeader}>EFFICIENCY</span>
          <h4>App Strenghts</h4>

          <div className={styles.insightsBody}>
            
            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}>
              <span className={styles.insightPositiveLabel}>UI/UX</span>
              <span className={styles.insightText}>Highly intuitive navigation flow optimized for React‑Vite.</span>
            </div>

            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}>
              <span className={styles.insightPositiveLabel}>RUNTIME</span>
              <span className={styles.insightText}>Efficient memory allocation during large dataset renders.</span>
            </div>

            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}>
              <span className={styles.insightPositiveLabel}>AESTHETIC</span>
              <span className={styles.insightText}>Glassmorphism implementation adds professional depth.</span>
            </div>

          </div>
        </div>

        {/* INEFFICIENCY INSIGHTS */}
        <div className={styles.insightsCard}>
          <div className={styles.negativeHeader}></div>
          <span className={styles.insightsNegativeHeader}>IMPROVEMENT</span>
          <h4>Refinement Areas</h4>

          <div className={styles.insightsBody}>
        
            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}>
              <span className={styles.insightNegativeLabel}>LATENCY</span> {/* AI GENERATED INSIGHT LABEL */}
              <span className={styles.insightText}>Potential fetch delays identified in backend migrations.</span>
            </div>

            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}>
              <span className={styles.insightNegativeLabel}>MEMORY</span> {/* AI GENERATED INSIGHT LABEL */}
              <span className={styles.insightText}>High overhead detected when scaling complex data structures.</span>
            </div>

            {/* AI GENERATED INSIGHT */}
            <div className={styles.insightItem}> 
              <span className={styles.insightNegativeLabel}>DEVOPS</span> {/* AI GENERATED INSIGHT LABEL */}
              <span className={styles.insightText}>Unused dependencies identified in the current Vite skeleton.</span>
            </div>
            
          </div>

        </div>
      </div>

      {/* AI GENERATED GRAPHS */}
      <div className={styles.graphsRow}>
        
        {/* PLACEHOLDER GRAPH */}
        <div className={styles.graphBox}>
          <div className={styles.graphHeader}></div>
          <div className={styles.graphInformation}>
            <h4>DOWNLOADS GRAPH</h4>
            <div className={styles.graphImage}>
              {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}
            </div>
          </div>
        </div>
        
        {/* PLACEHOLDER GRAPH */}
        <div className={styles.graphBox}>
          <div className={styles.graphHeader}></div>
          <div className={styles.graphInformation}>
            <h4>RATINGS GRAPH</h4>
            <div className={styles.graphImage}>
              {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}
            </div>
          </div>
        </div>
        
        {/* PLACEHOLDER GRAPH */}
        <div className={styles.graphBox}>
          <div className={styles.graphHeader}></div>
          <div className={styles.graphInformation}>
            <h4>OTHER GRAPH</h4>
            <div className={styles.graphImage}>
            {/* PLACEHOLDER FOR FUTURE GRAPH IMPLEMENTATION */}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AppAnalytics;