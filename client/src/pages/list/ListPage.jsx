import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTrackedApps } from '../../api/searchApps.js'
import styles from './ListPage.module.css'

const ListPage = () => {
    const navigate = useNavigate()
    const [compareMode, setCompareMode] = useState(false)
    const [selectedApps, setSelectedApps] = useState([])
    const [apps, setApps] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadTrackedApps = async () => {
            try {
                setLoading(true)
                const fetchedApps = await getTrackedApps()
                setApps(fetchedApps)
            } catch (err) {
                console.error(err)
                setError('Unable to load tracked apps from the backend.')
            } finally {
                setLoading(false)
            }
        }

        loadTrackedApps()
    }, [])

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

        navigate(`/report/${app.trackId}/${encodeURIComponent(app.appName)}`, {
            state: { appData: app },
        })
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
                    className={`${styles.topCompareButton} ${compareMode ? styles.topCompareButtonActive : ''
                        }`}
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

            {loading ? (
                <div className={styles.compareNotice}>Loading tracked apps...</div>
            ) : error ? (
                <div className={styles.compareNotice}>{error}</div>
            ) : apps.length === 0 ? (
                <div className={styles.compareNotice}>
                    No tracked apps found. Search for apps on the home page to populate your list.
                </div>
            ) : (
                <div className={styles.appsGrid}>
                    {apps.map((app) => {
                        const isSelected = selectedApps.includes(app.trackId)
                        return (
                            <div
                                key={app.trackId}
                                className={`${styles.appCard} ${isSelected ? styles.selectedCard : ''
                                    }`}
                                onClick={() => handleCardClick(app)}
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
                                        <span className={styles.developer}>
                                            {app.developerName || 'Unknown Developer'}
                                        </span>
                                        <span className={styles.metaSeparator}>•</span>
                                        <span className={styles.genreTag}>{app.genre || 'Unknown'}</span>
                                    </div>
                                </div>

                                {compareMode && isSelected && (
                                    <div className={styles.selectedBadge}>✓ Selected</div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ListPage