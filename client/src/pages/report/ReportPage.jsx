import styles from './ReportPage.module.css'

import { appsList } from "./DummyData.js";
import {savedApps} from './DummyData.js';

import {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {getAppDetails, getApps} from '../../api/searchApps.js';

import Modal from 'react-bootstrap/Modal';
import CompareModal from './CompareModal.jsx';

import AppDetailBasics from "./AppDetailBasics.jsx";
import AppAnalytics from "./AppAnalytics";
import Graphs from "./Graphs.jsx"
import AppReviews from "./AppReviews";
import DummyGraphs from './DummyGraphs.jsx';    

export default function ReportPage(){
  // Get appId & name from URL params 
    let {appId, name} = useParams();

    // Allows you to pass data from one route to another
    const location = useLocation();

    // Initialize appData state with location.state OR null
    // Note: When the report page is refreshed, the appData will be lost.
    // Thats why we add logic in the useEffect to fetch the data from the backend if appData is null
    const [appData, setAppData] = useState(location.state?.appData || null);

    // State for the reviews
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // State to determine what report content to render
    const [activeTab, setActiveTab] = useState('overview');
    const [showCompareModal, setShowCompareModal] = useState(false);
    
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
            {/* Global Naviation should be placed here */}

            <div className={styles.reportWrapper}>
                {/* App Header - Displays app info and compare button */}
                <AppDetailBasics 
                    app={appData} 
                    onCompareClick={() => setShowCompareModal(true)} 
                />

                {/* Report Navigation */}
                <nav className={styles.tabNav}>
                    <button 
                        className={activeTab === 'overview' ? styles.activeTab : styles.tab} 
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview & AI
                    </button>

                    <button 
                        className={activeTab === 'analytics' ? styles.activeTab : styles.tab} 
                        onClick={() => setActiveTab('analytics')}
                    >
                        Metrics
                    </button>

                    <button 
                        className={activeTab === 'reviews' ? styles.activeTab : styles.tab} 
                        onClick={() => setActiveTab('reviews')}
                    >
                        Community 
                    </button>
                </nav>

                {/* Dynamic Content Area */}
                <main className={styles.contentArea}>
                    {activeTab === 'overview' && <AppAnalytics app={appData} />}
                    {activeTab === 'analytics' && <DummyGraphs />}
                    {activeTab === 'reviews' && <AppReviews appReviews={reviews} />}
                </main>
                
                {/* Hidden Modal, ready to be triggered */}
                <CompareModal 
                    show={showCompareModal} 
                    onHide={() => setShowCompareModal(false)} 
                    currentApp={appData} 
                    savedApps={savedApps} 
                />
            </div> 
        </div>
    );
}
    

