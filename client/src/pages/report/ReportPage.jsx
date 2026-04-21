import styles from './ReportPage.module.css'

export default function ReportPage(){
    return (
        <div className={styles.reportPage}>
            <h2>Application Details/[Application Name]</h2>
            <AppBasics />
        </div>
    )
}

export const AppBasics = () => {
  return (
    <div className={styles.appBasics}>

      {/* LEFT COLUMN — Logo + Text */}
      <div className={styles.leftColumn}>
        <div className={styles.logo} />

        <div className={styles.textBlock}>
          <div className={styles.appName}>App Name</div>
          <div className={styles.company}>Company Name</div>
        </div>
      </div>

      {/* RIGHT COLUMN — Ratings */}
      <div className={styles.ratingsColumn}>
        <div className={styles.ratingsText}>633K RATINGS</div>

        <div className={styles.ratingGroup}>
          <div className={styles.ratingAverage}>4.2</div>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.star} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};