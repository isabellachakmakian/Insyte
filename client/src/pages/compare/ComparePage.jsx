import styles from './ComparePage.module.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DummySentimentGraph from './DummySentimentComparison.jsx'

const ComparePage = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Destructure the data from location.state
    // We use optional chaining and a fallback to handle direct URL entries
    const [app1Data, setAppData1] = useState(location.state?.app1Data || null);
    const [app2Data, setAppData2] = useState(location.state?.app2Data || null);
    console.log(`here is the app1Data ${app1Data} `)
    

    // 2. Fallback logic
    // If someone refreshes the page or types the URL manually, 
    // location.state will be null. In that case, you fall back to your search logic.
    useEffect(() => {
        if (!app1Data || !app2Data) {
            const params = new URLSearchParams(location.search);
            const id1 = params.get('app1');
            const id2 = params.get('app2');
            
            // Search your dummy data file here as a backup...
        }
        setAppData1({...app1Data, 
       reviewVelocity: "~800 reviews/mo", 
        velocityTrend: "+8%", // Steady growth in smart home adoption
        lastUpdated: "4 days ago", // Signal: Extremely active dev team
        shipFrequency: "Every 14-18 days", // Avg from recent version history
        
        // --- Quality Metrics ---
        averageRating: 4.8,
        ratingCount: 194000, 
        latestVersionRating: 4.7, // No "Churn Risk" here; stability is high
        
        // --- LLM Insight Logic ---
        requestedFeatures: "Portrait mode for iPad, Widget stability, Apple HomeKit reliability",
        marketMoat: "High (194K reviews vs industry avg < 50K)"
        })
    }, [location, app2Data]);
    console.log(app1Data, app2Data)

    const handleReturn = ()=>{
        navigate(`/report/${app1Data.appId}/${app1Data.appName}`)
    }
    
    
    
    return (
        <div className={styles.reportPage}>
            <div className={styles.reportWrapper}>
                {/* The Navigational Back Button (Top Left) */}
                      <button className={styles.backLink} onClick={handleReturn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Report
                     </button>
                
                <header className={styles.stickyHeader}>
                    <div className={styles.appIdentity} style={{ justifyContent: 'flex-end' }}>
                        <span style={{ fontWeight: 700 }}>{app1Data.appName}</span>
                        <img src={app1Data.iconUrl} alt={app1Data.appName} className={styles.appIcon} />
                    </div>

                    <div className={styles.vsCircle}>VS</div>

                    <div className={styles.appIdentity}>
                        <img src={app2Data.iconUrl} alt={app2Data.appName} className={styles.appIcon} />
                        <span style={{ fontWeight: 700 }}>{app2Data.appName}</span>
                    </div>
                </header>

                <main className={styles.contentArea}>
                    {/* Review Velocity */}
                    <div className={styles.metricRow}>
                        <div className={`${styles.metricValue} ${styles.winner}`} style={{ textAlign: 'right' }}>
                            {app1Data.reviewVelocity} <small>({app1Data.velocityTrend})</small>
                        </div>
                        <div className={styles.metricLabel}>Review Velocity</div>
                        <div className={styles.metricValue} style={{ textAlign: 'left' }}>
                            {app2Data.reviewVelocity} <small>({app2Data.velocityTrend})</small>
                        </div>
                    </div>

                    {/* Market Moat */}
                    <div className={styles.metricRow}>
                        <div className={`${styles.metricValue} ${styles.winner}`} style={{ textAlign: 'right' }}>
                            {app1Data.ratingCount}
                        </div>
                        <div className={styles.metricLabel}>Review Count</div>
                        <div className={styles.metricValue} style={{ textAlign: 'left' }}>
                            {app2Data.ratingCount}
                        </div>
                    </div>

                    {/* Update Frequency */}
                    <div className={styles.metricRow}>
                        <div className={styles.metricValue} style={{ textAlign: 'right' }}>
                            {app1Data.lastUpdated} <br/>
                           
                        </div>

                        <div className={styles.metricLabel}>Ship Frequency</div>

                        <div className={styles.metricValue} style={{ textAlign: 'left' }}>
                            {app2Data.lastUpdated} <br/>
                       
                        </div>
                    </div>

                    {/* Version Churn Risk */}
                    <div className={styles.metricRow}>
                        <div className={styles.metricValue} style={{ textAlign: 'right' }}>
                            All-Time: {app1Data.averageRating}★ <br/>
                            Current: {app1Data.latestVersionRating}★
                        </div>
                        <div className={styles.metricLabel}>Quality War</div>
                        <div className={styles.metricValue} style={{ textAlign: 'left' }}>
                            All-Time: {app2Data.averageRating}★ <br/>
                            <span className={styles.warning}>Current: {app2Data.latestVersionRating}★</span>
                        </div>
                    </div>

                    {/* Feature Gap Analysis */}
                    <div className={styles.featureGapBox}>
                        <h6 style={{ fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                            LLM Feature Gap Analysis
                        </h6>
                        <div className="row">
                            <div className="col-6 border-end">
                                <p className="small text-muted mb-1">Highly Requested for {app1Data.appName}:</p>
                                <strong>{app1Data.requestedFeatures}</strong>
                            </div>
                            <div className="col-6 ps-4">
                                <p className="small text-muted mb-1">Highly Requested for {app2Data.appName}:</p>
                                <strong>{app2Data.requestedFeatures}</strong>
                            </div>
                        </div>
                    </div>
                    <DummySentimentGraph />

                </main>
            </div>
        </div>
    );
};

export default ComparePage;