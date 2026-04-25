const baseURL = 'http://localhost:8000';


async function getApps(name){
    const searchAppEndpoint = '/api/search/';
    const urlToFetch =  `${baseURL}${searchAppEndpoint}?name=${name}`
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const apps = jsonResponse.apps
            console.log(apps)
            return apps;
        }
        
    }catch(error){
        console.log(error)
    }
}


export default getApps;