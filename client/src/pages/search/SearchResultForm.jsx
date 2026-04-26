import styles from './SearchPage.module.css';
import { useState } from 'react'; 
import { useNavigate} from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function SearchResultForm({searchResults}) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    const handleUserSelection= (app) => {
        const name = app.appName;
        // Navigate to Report Page with appId and appName as params and pass the entire app data as state
        navigate(`/report/${app.trackId}/${encodeURIComponent(name)}`, {state: {appData: app}}); 
    };

    return (
        <div className={styles.searchResults}>
            
            <Row xs={1} className="g-3"> 
                {searchResults.map((app) => (
                    <Col key={app.trackId}>
                        <Card 
                            className={`${styles.listCard} shadow-sm`} 
                            onClick={() => handleUserSelection(app)}
                            border="secondary"
                        >
                            <Card.Body className={styles.cardGroup}>
                                
                                <div className={styles.iconGroup}>
                                    <img
                                        src={app.iconUrl} 
                                        className={styles.appIcon} 
                                    />
                                </div>

                                <div className={styles.textGroup}>          
                                    <span className={styles.appName}>{app.appName}</span>
                                    <span className={styles.developerName}>{app.developerName}</span>
                                </div>

                                
                                <div className={styles.actionGroup}>
                                    <button 
                                        className={styles.plusButton}
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            console.log("Save triggered");
                                        }}
                                    >
                                        ＋
                                    </button>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            
        </div>  
    ) 
}