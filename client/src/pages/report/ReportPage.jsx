import { useLocation } from "react-router-dom";
import { appsList } from "./DummyData.js";
import styles from './ReportPage.module.css'

import AppDetailBasics from "./AppDetailBasics.jsx";
import AppAnalytics from "./AppAnalytics";
import AppReviews from "./AppReviews";

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

    return (
        <div className={styles.reportPage}>
            <PageTitle app={app} query={params.get("q")} />
            <AppDetailBasics app={appInfo} />
            <AppAnalytics />
            <AppReviews app={appInfo} />
        </div>
    )
}

const PageTitle = ({ app, query }) => {
  const titleText = app ? app.appName : query;
  return <h2>Application Details / {titleText}</h2>;
};