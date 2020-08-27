let tripInfo = {};

document.getElementById('generate').addEventListener('click', main);

function main(event){
    event.preventDefault();
    let location = document.querySelector("#location").value;
    let startDate = document.querySelector("#startDate").value;
    let endDate = document.querySelector("#endDate").value;

    Client.checkLocationInput(location, startDate, endDate);

    location = location[0].toUpperCase() + location.slice(1).toLowerCase();
    let startDateDash = startDate.replace(/\-/g, '/');
    let endDateDash = endDate.replace(/\-/g, '/');
    tripInfo.location = location;
    tripInfo.startDate = startDateDash;
    tripInfo.endDate = endDateDash;
    const geoURL = `http://api.geonames.org/searchJSON?formatted=true&q=${location}&username=ghufran&style=full`;
    getGeoData(geoURL) 
    checkDate(startDate, endDate)
    pixabayData()
}

const getGeoData = (geoURL) =>{
    fetch(geoURL)
    .then(res => res.json())
    .then(data => {
        const geoLatitude = data.geonames[0].lat;
        const geoLongitude = data.geonames[0].lng;
        const geoCountryCode = data.geonames[0].countryCode; //'FR'
        const geoCountryName = data.geonames[0].countryName; //'FRANCE'
        tripInfo.geoLatitude = geoLatitude;
        tripInfo.geoLongitude = geoLongitude;
        tripInfo.geoCountryName = geoCountryName;
        getWeatherbitData() 
        return data;
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
    tripInfo.diffDays = diffDays;
    tripInfo.diffTime = diffTime;
}

const getWeatherbitData = () => {
    const weatherbitKey = '41b437b4560749ae8ffd4a9e0ab8a1be'
    const weatherbitURL = `http://api.weatherbit.io/v2.0/current?&lat=${tripInfo.geoLatitude}&lon=${tripInfo.geoLongitude}&key=${weatherbitKey}`;
    fetch(weatherbitURL)
    .then(res => res.json())
    .then(data => {
        const temp = data.data[0].temp;
        const description = data.data[0].weather.description;
        const futureTemp = data.data[0].app_temp;
        tripInfo.temp = temp;
        tripInfo.description = description;
        tripInfo.futureTemp = futureTemp;
        const iconID = data.data[0].weather.icon;
        // add an ICON image representing the weather
        const imgIcon = document.querySelector("#icon");
        let img = document.createElement('img');
        img.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${iconID}.png`);
        img.setAttribute('id', `iconIMG`);
        imgIcon.appendChild(img);
        updateUI() 
        return data;
    })
    .catch(error => console.log(error))
}

const pixabayData = ()=> {
   const pixabayKey = `8552189-617f002655aaf0fbaf8bbb686`;
   const pixabayURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${tripInfo.location}&image_type=photo&orientation=horizontal&pretty=true&category=places`;
   fetch(pixabayURL)
   .then(res => res.json())
   .then(data => {
        const imgCon = document.querySelector("div #image");
        let img = document.createElement('img');
        img.setAttribute('src', data.hits[0].largeImageURL);
        imgCon.appendChild(img);
        return data;
   })
   .catch(error => console.log(error))
}

const updateUI = () => {
    const section = document.createElement('section');
    const sectiontwo = document.createElement('section');
    const infoSection = document.querySelector('#info');
    section.innerHTML = `
        <p>My trip: <span id="trip-location">${tripInfo.location}, ${tripInfo.geoCountryName}</span> </p> 
        <p>Departing: <span id="departing-date">${tripInfo.startDate}</span></p>
        <p id="statement">${tripInfo.location}, ${tripInfo.geoCountryName} is ${tripInfo.diffDays} days away</p>
        <p>Tempreture: <span id="temp"></span></p>
    `

    sectiontwo.innerHTML = `
        <p>Typical weather for then is: <span id="description">${tripInfo.description} throughout the day.</span></p>
    `

    infoSection.appendChild(section);
    infoSection.appendChild(sectiontwo);

    const temp = document.querySelector('#temp');
    if(tripInfo.diffDays <= 7){
        temp.innerHTML = `${tripInfo.temp}&deg;`
    }else{
        temp.innerHTML = `${tripInfo.futureTemp}&deg;`
    }

    const postData = (url, data) => {
        fetch(url, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},      
            body: JSON.stringify(data), 
            })
        } 
        postData('http://localhost:8081/trip',{
            city: tripInfo.location,
            temp: tripInfo.temp,
            description: tripInfo.description,
            travelDate: tripInfo.startDate,
            endDate: tripInfo.endDate,
            country: tripInfo.geoCountryName,
            futureTemp: tripInfo.futureTemp,
            diffDays: tripInfo.diffDays
        })
}

export { main }
