import styles from "./AppDetailBasics.module.css";
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';


export default function AppDetailBasics({ app, onCompareClick }) {
  const navigate = useNavigate();
  const { 
        appName, developerName, iconUrl, genre, 
        averageRating, ratingCount, contentAdvisoryRating,
        version 
    } = app;

  const iconStyle = {
    backgroundImage: app.iconUrl ? `url(${app.iconUrl})` : 'none',
    backgroundColor: '#e1e4e8'
  };

  const formatNum = (n) => n >= 1000000 ? (n/1000000).toFixed(1) + 'M' : (n/1000).toFixed(0) + 'K';
  
  const handleReturn = () =>{
    navigate(`/`)
  }

  return (
    <div className={styles.basicDetailsWrapper}>

      {/* The Navigational Back Button (Top Left) */}
      <button className={styles.backLink} onClick={handleReturn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Search
      </button>

      {/* App Infortmation Section */}
      <div className={styles.appDetails}>

        {/* Main Header - App logo and compare button */}
        <header className={styles.mainHeader}>
          
          <div className={styles.appIdentity}>
            <img src={iconUrl} alt={appName} className={styles.appIcon} />
            <div className={styles.appTitleGroup}>
              <h1>{appName}</h1>
              <span className={styles.developerSub}>{developerName}</span>
            </div>
          </div>
            
          <button className={styles.compareBtn} onClick={onCompareClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Compare
          </button>

        </header>

        {/* Detailed App Information Section */}
        <div className={styles.infoBar}>

          {/* Rating */}
          <div className={styles.infoSection}>
            <span className={styles.infoLabel}>{formatNum(ratingCount)} RATINGS</span>
            <span className={styles.infoValue}>{averageRating.toFixed(1)} ★</span>
          </div>
              
          <div className={styles.divider}></div>

          {/* Content Adivsory Rating */}
          <div className={styles.infoSection}>
            <span className={styles.infoLabel}>AGE</span>
            {/*<span className={styles.infoValue}>{contentAdvisoryRating}</span>*/}
            <span className={styles.infoValue}>4+</span>
          </div>

          <div className={styles.divider}></div>

          {/* Genre */}
          <div className={styles.infoSection}>
            <span className={styles.infoLabel}>GENRE</span>
            <div className={styles.iconValue}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
              <span className={styles.infoValue}>{genre}</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Developer */}
          <div className={styles.infoSection}>
            <span className={styles.infoLabel}>DEVELOPER</span>
            <div className={styles.iconValue}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <span className={styles.infoValue}>{developerName}</span>
            </div>
          </div>

          <div className={styles.divider}></div>
          
          {/* Version */}
          <div className={styles.infoSection}>
            <span className={styles.infoLabel}>VERSION</span>
            <span className={styles.infoValue}>v4.17.82{version}</span>
          </div>

        </div>

        {/*App Description */}

        
        
      </div>

    </div>
  );
}

/*
function AppRating({ ratingAverage, ratingsCount }) {
  const MAX_STARS = 5;
  
  // Helper function to format ratings count (e.g., 1.2K, 3.4M)
  const formatRatings = (num) => {
    if (!num || num === "null") return "0";
    const n = Number(num);
    // Format numbers into K/M for better readability
    // toFixed(1) keeps one decimal place, and replace(/\.0$/, '') removes the decimal if it's .0
    if (n >= 1000000) {
      return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (n >= 1000) {
      return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return n.toString();
  };

  const filledStars = Math.round(Number(ratingAverage) || 0);

  return (
    <div className={styles.ratingsColumn}>
      
      <div className={styles.ratingsText}>
        {ratingsCount && ratingsCount !== "null" 
          ? `${formatRatings(ratingsCount)} RATINGS` 
          : "NO RATINGS"}
      </div>

      <div className={styles.ratingGroup}>
        <div className={styles.ratingAverage}>
          {ratingAverage && ratingAverage !== "null" 
            ? Number(ratingAverage).toFixed(1) 
            : "0.0"}
        </div>

        <div className={styles.starRating}>
          {Array.from({ length: MAX_STARS }).map((_, i) => (
            <span
              key={i}
              className={i < filledStars ? styles.starFilled : styles.starEmpty}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}*/