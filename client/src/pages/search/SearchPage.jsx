import SearchBar from './SearchBar.jsx';
import styles from './SearchPage.module.css';

export default function SearchPage(){
    return (       
            <div className= {styles.searchPage}>
                <div className ={styles.aboutContent}>
                    <h1>Welcome to Insyte</h1>
                    <h2>Obtain a report on an application today</h2>
                </div>       
                <SearchBar />
            </div>  
        )

}
