
const apiKey = '2c3995d4709b0a1d2a9ca5f06f3c2f24';
const units = 'imperial'; //can be imperial or metric
console.log("Hellop");
function alertMessage(str){
    alert(str);
}

let temperatureSymobol = units == 'imperial' ? "°F" : "°C";
let outp="";
async function fetchWeather(cityInputtedByUser) {
    try {
        /*weatherContainer.innerHTML = '';
        error.innerHTML = '';
        city.innerHTML = '';*/


        const cnt = 10;

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputtedByUser}&appid=${apiKey}&units=${units}&cnt=${cnt}`;


        const response = await fetch(apiUrl);
        const data = await response.json();

        //Display error if user types invalid city or no city
        if (data.cod == '400' || data.cod == '404') {
            console.log = `Not valid city. Please input another city`;
            return;
        }
        //Display weather data for each 3 hour increment
        let first=true;
        data.list.forEach(hourlyWeatherData => {
            if(first){
                const hourlyWeatherDataDiv = createWeatherDescription(hourlyWeatherData);
                console.log(hourlyWeatherDataDiv);
                outp=hourlyWeatherDataDiv;
                first=false;
            }

            //weatherContainer.appendChild(hourlyWeatherDataDiv);
        });
        return outp;
        // Display city name based on latitude and longitude
        //city.innerHTML = `Hourly Weather for ${data.city.name}`;
    } catch (error) {
        console.log(error);
        return "Uh oh";
    }
}

function convertToLocalTime(dt) {

    // Create a new Date object by multiplying the Unix timestamp by 1000 to convert it to milliseconds
    // Will produce a time in the local timezone of user's computer
    const date = new Date(dt * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    // Formatted date string in the format: YYYY-MM-DD hh:mm:ss AM/PM
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${period}`;

}

function createWeatherDescription(weatherData) {
    const { main, dt } = weatherData;

    let description = "";//document.createElement("div");
    const convertedDateAndTime = convertToLocalTime(dt);

    // '2023-11-07 07:00:00 PM'
    description = "Current Tempurature: " + main.temp.toString() + temperatureSymobol;// + " - " + convertedDateAndTime.substring(10) + " - " + convertedDateAndTime.substring(5, 10);
    return description;
}
let locations=[["Grand Canyon","The Grand Canyon is in Arizona. It is one of the greatest canyons in the world. It was created by erosion over many millions of years. There are many hiking trails and scenic views.<br><img src=\"images\\grandcanyonbtm2.jpg\" alt=\"grand canyon picture\" width=90%><br>For the trip you will fly to the airport and be picked up in a van to be driven to the bottom of the canyon where you will experience living at the bottom of the Grand Canyon. You will be able to hike and see the views peacefully without any intrusions from civilization. Arizona uses MST. Temperature in console.<br><img src=\"images\\grandcanyonbtm1.png\" alt=\"grand canyon picture\" width=90%>", "Grand Canyon Village"]
,["Hạ Long Bay","Hạ Long Bay is a body of water off the coast of Hạ Long in Vietnam. It has many beautiful islands and is pretty. There are many things to do such as swimming kayaking and exploring some of the caves.<br><img src=\"images\\halongbayp1.jpg\" alt=\"ha long bay islands picture\" width=90%><br>On your trip you will be placed on one of the farthest out islands by a boat. You will be able to enjoy the natural beauty and peacefulness of the island. You can swim in the water and relax while you enjoy your vacation. Vietnam is in the Indochina Time zone, which is UTC+7. Temperature in console.", "Ha Long"]
,["not done","not done","not done"]];
function changeInfo(place){

    document.getElementById("rightContent").style.visibility="visible";
    document.getElementById("rightContent").innerHTML=locations[place][0]+" <br><p>"+locations[place][1]+"</p>"+ fetchWeather(locations[place][2]);
    //no worky
}
function submitEmailForm(){
    let email = document.getElementById('emailTxt').value;
    if(ValidateEmail(email))
    {
        alert(email+" added to mailing list");
    }
    else
    {
        alert(email+" was not a valid email")
    }
}
function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {

    //alert("Valid email address!");

    return true;

  } else {

    //alert("Invalid email address!");

    return false;

  }

}


