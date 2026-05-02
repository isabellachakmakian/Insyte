import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ListPage = () => {
    const navigate = useNavigate()

    const savedApps = [
        {
            appName: 'Spotify',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
            trackId: 'spotify-app-002',
            genre: 'Productivity',
        },
        {
            appName: 'Netflix',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
            trackId: 'netflix-app-003',
            genre: 'Photography',
        },
        {
            appName: 'Discord',
            iconUrl: 'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1.png',
            trackId: 'discord-app-001',
            genre: 'Health & Fitness',
        },
    ]

    const handleCardClick = (trackId, appName) => {
        navigate(`/report/${trackId}/${appName}`)
    }

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1>Saved Apps</h1>
                    <p>Click any app card to go to its details page.</p>
                </Col>
            </Row>

            <Row xs={1} sm={2} md={3} className="g-4">
                {savedApps.map((app) => (
                    <Col key={app.trackId}>
                        <Card
                            className="h-100"
                            onClick={() => handleCardClick(app.trackId, app.appName)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Img
                                variant="top"
                                src={app.iconUrl}
                                alt={`${app.appName} icon`}
                                style={{ height: '220px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{app.appName}</Card.Title>
                                <Card.Text>{app.genre}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ListPage