import styles from "./AppDetailBasics.module.css";

export default function AppDetailBasics({ app }) {
  return (
    <div className={styles.appBasics}>
      <div className={styles.leftColumn}>

        {/* LOGO */}
        <div
          className={`${styles.logo} ${app.logo ? styles.hasLogo : ""}`}
          style={{ backgroundImage: app.logo ? `url(${app.logo})` : "none" }}
        />

        {/* TEXT BLOCK */}
        <div className={styles.textBlock}>
          <div className={styles.appName}>{app.appName}</div>

          <div className={styles.companyRow}>
            <span className={styles.company}>{app.company}</span>
            <span className={styles.genreTag}>· {app.category}</span>
          </div>

          <div className={styles.descriptionBox}>
            <p>{app.description || "No description available."}</p>
          </div>
        </div>
      </div>

      {/* RATINGS SECTION */}
      <AppRating
        ratingAverage={app.ratingAverage}
        ratingsCount={app.ratingsCount}
      />
    </div>
  );
}

function AppRating({ ratingAverage, ratingsCount }) {
  const MAX_STARS = 5;
  const filledStars = Math.round(ratingAverage);

  return (
    <div className={styles.ratingsColumn}>
      <div className={styles.ratingsText}>
        {ratingsCount !== "null" ? `${ratingsCount} RATINGS` : "null"}
      </div>

      <div className={styles.ratingGroup}>
        <div className={styles.ratingAverage}>
          {ratingAverage !== "null" ? ratingAverage : "null"}
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