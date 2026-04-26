const baseURL = 'http://localhost:8000';


async function getApps(name){
    const searchAppEndpoint = '/api/search/';
    const urlToFetch =  `${baseURL}${searchAppEndpoint}?name=${name}`
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const apps = jsonResponse.apps
            
            return apps;
        }
        
    }catch(error){
        console.log(error)
    }
}

async function getAppDetails(id){
    const appDetailsEndpoint = '/api/reviews/';
    const urlToFetch =  `${baseURL}${appDetailsEndpoint}?trackId=${id}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const appDetails = jsonResponse.reviews;
            return appDetails;
        }

    }catch(error){
        console.log(error)
    }


}


export { getApps, getAppDetails };