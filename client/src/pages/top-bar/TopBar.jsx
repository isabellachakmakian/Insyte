import styles from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";

import { FaBookmark } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.topBar}>
      
      {/*Logo + Site Name */}
      <button className={styles.Insyte} onClick={() => navigate("/")}>
        <MdQueryStats className={styles.logo} />
        <span className={styles.siteName}>Insyte</span>
      </button>

      {/*Right-Side Navigation Buttons */}
      <div className={styles.Navigation}>
        {/*Saved Apps*/}
        <button className={styles.savedButton } onClick={() => navigate("/list")}>
          <FaBookmark className={styles.navIcons}/>
        </button>

        {/*User Icon*/}
        <button className={styles.userButton}> 
          <FaUserCircle className={styles.navIcons} />
          <span>Username</span>
          <MdKeyboardArrowDown className={styles.arrow} />
        </button>
      </div>

    </div>
  );
}