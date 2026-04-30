import styles from "./AppDetailBasics.module.css";

export default function AppDetailBasics({ app }) {
  const iconStyle = {
    backgroundImage: app.iconUrl ? `url(${app.iconUrl})` : 'none',
    backgroundColor: '#e1e4e8'
  };

  return (
    <div className={styles.appBasics}>
      <div className={styles.leftColumn}>

        {/* LOGO */}
        <div
          className={`${styles.logo} ${app.iconUrl ? styles.hasLogo : ""}`}
          style={iconStyle}
        />

        {/* TEXT BLOCK */}
        <div className={styles.textBlock}>
          <div className={styles.appName}>{app.appName}</div>

          <div className={styles.companyRow}>
            <span className={styles.company}>{app.developerName}</span>
            <span className={styles.genreTag}>• {app.genre}</span>
          </div>
        </div>
      </div>

      {/* RATINGS SECTION */}
      <AppRating
        ratingAverage={app.averageRating}
        ratingsCount={app.ratingCount}
      />
    </div>
  );
}

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
}