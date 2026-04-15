import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import styles from './SearchPage.module.css'; 
import { CiSearch } from "react-icons/ci";


export default function SearchBar(){

    const [query, setQuery] = useState(""); 
    const navigate = useNavigate(); 

    // Navigate to Report page using Navigate
    const handleSearch = () => {
        const cleanQuery = query.trim();
        if (cleanQuery) {
            navigate(`/report?q=${encodeURIComponent(cleanQuery)}`); 
        }
    };

    // If Enter button is pressed call handleSearch (Navigate to Report Page)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return(
        <div className = {styles.searchGroup}>
            <InputGroup className={styles.customSearchBar}>
                
                <Form.Control
                
                className= {styles.customInput}
                placeholder="Search Applications"
                aria-label="Search Applications"
                aria-describedby="basic-addon2" 
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={handleKeyDown}            
                />
                
                <Button 
                    className ={styles.customButton}
                    variant="outline-secondary" 
                    onClick={handleSearch}
                >
                    <CiSearch />
                </Button>    
            </InputGroup>
        </div>
        
    )
}