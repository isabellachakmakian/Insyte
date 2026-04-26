import styles from './ReportPage.module.css'
import {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {getAppDetails, getApps} from '../../api/searchApps.js';

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
    if (!reviews) return <div>Application not found.</div>;
     

    const {appName, trackId, developerName, iconUrl, genre, averageRating, ratingCount} = appData;
    const {id, title, content, rating, author, date, version } = reviews[0];

    return (
        <div className={styles.reportPage}>
            <h1>Report</h1>
            <h2>Name: {appName}</h2>
            <h6>Developer: {developerName}</h6>
            <img src={iconUrl} alt={appName} />
            <h6>genre: {genre}</h6>
            <h6>averageRating: {averageRating}</h6>
            <h6>ratingCount: {ratingCount}</h6>
            
            <br></br>
            <p>Id: {id}</p>
            <p>Title: {title}</p>
            <p>Content: {content}</p>
            <p>Rating: {rating}</p>
            <p>Author: {author}</p>
            <p>Date: {date}</p>
            <p>{version}</p>

        </div>
    )
    /*(
        <div className={styles.reportPage}>
            <h2>Application Details/[Application Name]</h2>
            <AppBasics />
        </div>
    )*/
}