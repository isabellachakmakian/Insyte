const baseURL = 'http://localhost:8000';

async function getApps(name) {
    const cleanName = name?.trim();
    if (!cleanName) return [];

    const searchAppEndpoint = '/api/search/';
    const urlToFetch = `${baseURL}${searchAppEndpoint}?name=${encodeURIComponent(cleanName)}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.apps || [];
        }

        console.error('Search API error', response.status);
        return [];
    } catch (error) {
        console.error('Search API fetch error', error);
        return [];
    }
}

async function getTrackedApps() {
    const appsEndpoint = '/api/apps/';
    const urlToFetch = `${baseURL}${appsEndpoint}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.apps || [];
        }

        console.error('Tracked apps API error', response.status);
        return [];
    } catch (error) {
        console.error('Tracked apps API fetch error', error);
        return [];
    }
}

async function saveApp(app) {
    const appsEndpoint = '/api/apps/';
    const urlToFetch = `${baseURL}${appsEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(app),
        });

        if (response.ok) {
            return await response.json();
        }

        console.error('Save app API error', response.status);
        return null;
    } catch (error) {
        console.error('Save app API fetch error', error);
        return null;
    }
}

async function getAppDetails(id) {
    const appDetailsEndpoint = '/api/reviews/';
    const urlToFetch = `${baseURL}${appDetailsEndpoint}?trackId=${id}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }

        console.error('Reviews API error', response.status);
        return null;
    } catch (error) {
        console.error('Reviews API fetch error', error);
        return null;
    }
}

export { getApps, getAppDetails, getTrackedApps, saveApp };