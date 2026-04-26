import React, {useState} from 'react';
import SearchBar from './SearchBar.jsx';
import SearchResultForm from './SearchResultForm.jsx';
import styles from './SearchPage.module.css';

export default function SearchPage(){
    const [isSearched, setIsSearched] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const onSearchSuccess = (data)=>{
       
        setSearchResults(data);
        setIsSearched(true);
    }

    
    return (       
            <div className= {styles.searchPage}>
                <div className ={styles.aboutContent}>
                    <h1>Welcome to Insyte</h1>
                    <h2>Obtain a report on an application today</h2>
                </div>      

                <SearchBar onSearchSuccess={onSearchSuccess} />

                {isSearched && <SearchResultForm searchResults={searchResults} />}           
            </div>  
        )

}
