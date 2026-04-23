import { useLocation } from "react-router-dom";
import { appsList } from "./DummyData.js";
import styles from './ReportPage.module.css'

export default function ReportPage(){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("q")?.toLowerCase() || "";

    // Find matching app
    const app = appsList.find(a => a.appName.toLowerCase() === query);

    // If no match, create a null object
    const appInfo = app || {
        appName: "App Not Found",
        company: "None",
        logo: "",
        ratingsCount: "NO",
        ratingAverage: "N/A"
    };   
    console.log("appInfo.logo =", appInfo.logo);

    return (
        <div className={styles.reportPage}>
            <h2>Application Details / {app ? app.appName : params.get("q")}</h2>
            <AppReportBasics app={appInfo} />
        </div>
    )
}

export const AppReportBasics = ({ app }) => {
  return (
    <div className={styles.appBasics}>

      {/* LEFT COLUMN — Logo + Text */}
      <div className={styles.leftColumn}>
        <div
            className={styles.logo}
             style={{
                backgroundImage: app.logo ? `url(${app.logo})` : "none",
                backgroundColor: app.logo ? "transparent" : "#d9d9d9",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        />

        <div className={styles.textBlock}>
          <div className={styles.appName}>{app.appName}</div>
          <div className={styles.company}>{app.company}</div>

          <div className={styles.descriptionBox}>
            <p>{app.description || "No description available."}</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Ratings */}
      <div className={styles.ratingsColumn}>
        <div className={styles.ratingsText}>
          {app.ratingsCount !== "null" ? `${app.ratingsCount} RATINGS` : "null"}
        </div>

        <div className={styles.ratingGroup}>
          <div className={styles.ratingAverage}>{app.ratingAverage}</div>
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