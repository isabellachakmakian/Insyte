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


    const handleUserSelection= () => {
        const cleanQuery = query.trim();
        if (cleanQuery) {
            navigate(`/report?q=${cleanQuery}`); 
        }
    };

    return (
        <div className={styles.searchResults}>
            <container>
            <Row xs={1} className="g-3"> 
                {searchResults.map((app) => (
                    <Col key={app.trackId}>
                        <Card 
                            className={`${styles.listCard} shadow-sm`} 
                            onClick={() => handleUserSelection(app.trackId)}
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
                                            e.stopPropagation(); // Prevents clicking the plus from opening the report
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
            </container>
        </div>  
    ) 
}