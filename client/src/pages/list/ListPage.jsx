import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ListPage.module.css'
import { savedApps } from '../report/DummyData' 
const ListPage = () => {
    const navigate = useNavigate()
    const [compareMode, setCompareMode] = useState(false)
    const [selectedApps, setSelectedApps] = useState([])

    // Repository: git@github.com/isabellachakmakian/Insyte.git
    /*const savedApps = [
        {
            appName: 'Spotify',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
            trackId: 'spotify-app-002',
            genre: 'Music',
            developer: 'Spotify Ltd.',
        },
        {
            appName: 'Netflix',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
            trackId: 'netflix-app-003',
            genre: 'Entertainment',
            developer: 'Netflix, Inc.',
        },
        {
            appName: 'Discord',
            iconUrl: 'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1.png',
            trackId: 'discord-app-001',
            genre: 'Social',
            developer: 'Discord Inc.',
        },
    ]*/

    const toggleSelectApp = (trackId) => {
        setSelectedApps((prev) =>
            prev.includes(trackId)
                ? prev.filter((id) => id !== trackId)
                : [...prev, trackId]
        )
    }

    const handleCardClick = (app) => {
        if (compareMode) {
            toggleSelectApp(app.trackId)
            return
        }

        navigate(`/report/${app.trackId}/${app.appName}`)
    }

    const handleCompareButton = (e, app) => {
        e.stopPropagation()
        setCompareMode(true)
        setSelectedApps((prev) =>
            prev.includes(app.trackId) ? prev : [...prev, app.trackId]
        )
    }

    const handleExitCompare = () => {
        setCompareMode(false)
        setSelectedApps([])
    }

    return (
        <div className={styles.listPage}>
            <div className={styles.headerRow}>
                <div>
                    <h1>Tracked Apps</h1>
                    <p>Click any app card to view detailed analytics and insights</p>
                </div>

                <button
                    className={`${styles.topCompareButton} ${compareMode ? styles.topCompareButtonActive : ''}`}
                    onClick={() => {
                        if (compareMode) {
                            handleExitCompare()
                        } else {
                            setCompareMode(true)
                        }
                    }}
                >
                    {compareMode ? 'Exit Compare' : '+ Compare'}
                </button>
            </div>

            {compareMode && (
                <div className={styles.compareNotice}>
                    {selectedApps.length > 0
                        ? `${selectedApps.length} app(s) selected. Click cards to add or remove from comparison.`
                        : 'Click app cards to select them for comparison.'}
                </div>
            )}

            <div className={styles.appsGrid}>
                {savedApps.map((app) => {
                    const isSelected = selectedApps.includes(app.trackId)
                    return (
                        <div
                            key={app.trackId}
                            className={`${styles.appCard} ${isSelected ? styles.selectedCard : ''}`}
                            onClick={() => {
                                if (compareMode) {
                                    toggleSelectApp(app.trackId)
                                } else {
                                    handleCardClick(app)
                                }
                            }}
                        >
                            <div
                                className={styles.appIcon}
                                style={{
                                    backgroundImage: `url(${app.iconUrl})`,
                                }}
                                aria-label={`${app.appName} icon`}
                            />

                            <div className={styles.appInfo}>
                                <h2 className={styles.appName}>{app.appName}</h2>
                                <div className={styles.appMeta}>
                                    <span className={styles.developer}>{app.developer}</span>
                                    <span className={styles.metaSeparator}>•</span>
                                    <span className={styles.genreTag}>{app.genre}</span>
                                </div>
                            </div>

                            {compareMode && isSelected && (
                                <div className={styles.selectedBadge}>✓ Selected</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListPage