import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import styles from './SearchPage.module.css'; 
import { CiSearch } from "react-icons/ci";
import SearchResultForm from './SearchResultForm.jsx';
import {getApps}  from '../../api/searchApps.js';
export default function SearchBar({onSearchSuccess}){

    const [appName, setAppName] = useState(""); 

    const handleSearch = async() => {
        const cleanQuery = appName.trim();
        
        if (cleanQuery) {
            try{
                const results = await getApps(cleanQuery);
                onSearchSuccess(results);
            }catch(error){
                console.log(error);
            }
            
        }
    }

    // If Enter button is pressed call handleSearch (Navigate to Report Page)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (        
        <div className = {styles.searchGroup}>
            <InputGroup className={styles.customSearchBar}>
                <Form.Control
                className= {styles.customInput}
                placeholder="Search Applications"
                aria-label="Search Applications"
                aria-describedby="basic-addon2" 
                value={appName}
                onChange={(e) => setAppName(e.target.value)} 
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