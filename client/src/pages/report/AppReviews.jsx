import { useState } from "react";
import styles from "./AppReviews.module.css";

export default function AppReviews({appReviews}) {
  console.log(`{appReviews}`)
  const reviews = appReviews?.reviews || [];
  if (appReviews.reviewCount === 0) {
  return (
    <div className={styles.appReviewSection}>
      <h3>Ratings & Reviews</h3>
      <p>No reviews available.</p>
    </div>
  );
}

  const VISIBLE_COUNT = 4; // MAX AMOUNT OF REVIEWS TO SHOW AT ONCE

  // Index of the first visible review
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Compute the 3 visible reviews (wrap around)
  const visibleReviews = Array.from({ length: VISIBLE_COUNT }).map((_, i) => {
    const index = (startIndex + i) % reviews.length;
    return reviews[index];
  });

  return (
    <div className={styles.appReviewSection}>
      {/* HEADING TITLE */}
      
      
      <div className= {styles.sectionHeader}>
        <h1>Ratings & Reviews</h1>
        <p>Use buttons to look through reviews left on the App Store</p>
      </div>
     

      <div className={styles.reviewContainer}>
        {/* LEFT ARROW BUTTON */}
        <button className={styles.arrowButton} onClick={handlePrev}>‹</button>

        <div className={styles.reviewCards}>
          {visibleReviews.map((r) => {
            const MAX_STARS = 5;
            const filledStars = Number(r.rating) || 0;

            return (
              <div key={r.id} className={styles.reviewCard}>
                {/* REVIEW TITLE */}
                <h4>{r.title}</h4>

                {/* STAR RATING */}
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                          key={i} 
                          className={i < filledStars ? styles.starFilled : styles.starEmpty}
                      >
                          ★
                      </span>
                  ))}
            
                </div>

                {/* REVIEW CONTENT */}
                <p className={styles.reviewText}>{r.content}</p>
                
                {/* REVIEWER NAME */}
                <span className={styles.reviewerName}>{r.author}</span>
              </div>
            );
          })}
        </div>
        
        {/* RIGHT ARROW BUTTON */}
        <button className={styles.arrowButton} onClick={handleNext}>›</button>
      </div>
    </div>
  );
}