import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './CompareModal.module.css';

const CompareModal = ({ show, onHide, currentApp, savedApps }) => {
  const navigate = useNavigate();
  
  const handleSelection = (targetApp) => {

    // Navigate to the compare route with both IDs in the URL
    navigate(`/compare?app1=${currentApp.trackId}&app2=${targetApp.appId}`, { 
      state: { 
          app1Data: currentApp, 
          app2Data: targetApp 
      } 
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName={styles.customModalDialog} contentClassName={styles.modalContent} centered>
      <Modal.Header className = {styles.modalHeader} closeButton>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Row className={styles.splitPane}>
          
          {/* LEFT: Source App */}
          <Col md={4} className={styles.sourceSection}>
            <div className={styles.sourceCard}>

              <span className={styles.tagLabel}>Compare From</span>
              
              <div 
              className={styles.sourceIcon} 
              style={{ backgroundImage: `url(${currentApp?.iconUrl})` }}>
              </div>

              <div className={styles.sourceName}>{currentApp?.appName}</div>
              <div className={styles.sourceDev}>{currentApp?.developerName}</div>

              {/* Divider inside the card */}
              <div style={{ 
                width: '40px', 
                height: '2px', 
                backgroundColor: '#4facfe', 
                borderRadius: '2px',
                marginTop: '10px' 
              }} />

            </div>
          </Col>

          {/* RIGHT: List of saved apps  */}
          <Col md={8} className={styles.targetSection}>
            <h5 className="mb-4">Select an app to compare</h5>
            <div className={styles.scrollContainer}>
              {savedApps.map((app) => (
                <div 
                  key={app.id} 
                  className={styles.selectableCard}
                  onClick={() => handleSelection(app)}
                >
                  <div 
                    className={styles.appIcon} 
                    style={{ backgroundImage: `url(${app.iconUrl})`, backgroundColor: '#f0f0f0' }}>
                  </div>
                  <div>
                    <div className={styles.appName}>{app.appName}</div>
                    <div className={styles.appDev}>{app.developerName} • {app.genre}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;