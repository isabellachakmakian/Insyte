import { appsList } from "./DummyData.js";
import styles from './ReportPage.module.css'
import {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {getAppDetails, getApps} from '../../api/searchApps.js';

import AppDetailBasics from "./AppDetailBasics.jsx";
import AppAnalytics from "./AppAnalytics";
import AppReviews from "./AppReviews";

export default function ReportPage(){
  // Get appId & name from URL params 
    let {appId, name} = useParams();

    // Essentialy allows you to pass data from one route to another
    const location = useLocation();

    // Initialize appData state with location.state OR null
    // Note: When the report page is refreshed, the appData will be lost.
    // Thats why we add logic in the useEffect to fetch the data from the backend if appData is null
    const [appData, setAppData] = useState(location.state?.appData || null);

    // State for the reviews
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(()=>{
        const fetchReport = async() =>{
            try{
                
                let currentApp = appData; 
                // If the appData obj is Null -> State has been lost
                if (!currentApp && name){
                    console.log("State lost, recovering app details via name")
                    
                    // Fetch apps again based on name 
                    const apps = await getApps(name);
                    
                    // From app list, find the app with the correct ID
                    currentApp = apps.find(app => String(app.id) === String(appId));
                    
                    // Update the appData
                    setAppData(currentApp);
                }

                // Logic for fetching the reviews
                const fetchedReviews = await getAppDetails(appId);
                setReviews(fetchedReviews);

            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        if(appId){
            fetchReport();
        }

    },[appId, name]);

    if (loading) return <div>Loading...</div>;

    console.log("AppData in ReportPage:", appData);
    console.log(`Reviews in ReportPage:`, reviews);

    return (
        <div className={styles.reportPage}>
            <PageTitle app={appData} query={name} />
            <AppDetailBasics app={appData} />
            <AppAnalytics />
            <AppReviews appReviews={reviews} />
        </div>
    );
}
    

const PageTitle = ({ app, query }) => {
  const titleText = app ? app.appName : query;
  return <h2>Application Details / {titleText}</h2>;
};