document.getElementById('generate').addEventListener('click', main)

function main(event){
    event.preventDefault()
    const location = document.querySelector("#location").value.toLowerCase();
    const startDate = document.querySelector("#startDate").value;
    const endDate = document.querySelector("#endDate").value;
    const geoURL = `http://api.geonames.org/searchJSON?formatted=true&q=${location}&username=ghufran&style=full`
    
    getGeoData(location, geoURL)
    checkDate(startDate, endDate)
}

const getGeoData = (location, geoURL) =>{
    fetch(geoURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
            // return data
            // console.log(data.geonames[0].lat)
        const geoLatitude = data.geonames[0].lat;
        const geoLongitude = data.geonames[0].lng;
        const geoCountryCode = data.geonames[0].countryCode; //'FR'
        const geoCountryName = data.geonames[0].countryName; //'FRANCE'
        console.log(geoLatitude,geoLongitude, geoCountryCode, geoCountryName)
        getWeatherbitData(geoLatitude, geoLongitude)
        return data
    })
    .catch(error => console.log(error))
}

const checkDate = (start, end) =>{
    //create countdown
    //if the trip is within a week, you will get the current weather forecast
    // if the trip is in the future, you'll get a predicted forecast

    //first select start date and end date
    // sutract the two values to know wether the trip within a week or more
    // save the difference to display correct forecast to UI
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // display number of days
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

}


const getWeatherbitData = (lat, lng) => {
// https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY
const weatherbitKey = '41b437b4560749ae8ffd4a9e0ab8a1be'
const weatherbitURL = `http://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${weatherbitKey}`;
fetch(weatherbitURL)
.then(res => res.json())
.then(data => console.log(data.data[0].temp))
.catch(error => console.log(error))
}
export { main }
