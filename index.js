const userTab = document.querySelector("[data-userWeather]");
// console.log(userTab)
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const  searchForm =document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


//initially variables need???
let oldTab = userTab;
const API_KEY = 'e8719eba64b7a1edc975c380283d6dc0'
oldTab.classList.add("current-tab")
//if any data of lan lat then show else not
getfromSessionStorage()

//

function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //if search is invisible them make it visible
            userInfoContainer.classList.remove("active")
            grantAccessContainer.classList.remove("active")
            searchForm.classList.add("active")
        }else{
            //if search is visible make it invisible
            searchForm.classList.remove("active")
            userInfoContainer.classList.remove("active")
            //show the userinfo weather from session storage only
            getfromSessionStorage();
        }
  }    

}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
    // console.log("it clicke")
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab)
    // console.log("it clicke1")
})


//check if cordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates")
    if(!localCoordinates){
        grantAccessContainer.classList.add("active")
    }else{
        const coordinates =JSON.parse(localCoordinates);
        //it bring data a/c to lati and longi
        fetchUserWeatherInfo(coordinates);
        
    }
}
async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates
    //make granntcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        const data = await res.json();
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data)

    } catch (error) {
        loadingScreen.classList.remove("active")
        
    }

}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]")
    const countryIcon =document.querySelector("[data-countryIcon]")
    const desc  = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity =document.querySelector("[data-humidity]") 
    const cloudness = document.querySelector("[data-cloudiness]")

    //fetch value from weather object and input in UI 
   cityName.innerHTML=weatherInfo?.name;
   countryIcon.src =`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   desc.innerText = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
   temp.innerText =weatherInfo?.main?.temp;
   windspeed.innerText = weatherInfo?.wind?.speed;
   humidity.innerText =weatherInfo?.main?.humidity;
   cloudness.innerText =weatherInfo?.clouds?.all;

}

//Grant Access Button

const grantAccessButton = document.querySelector("[data-grantAccess]")
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
        
    }else{
        alert("No geoLocation Support")
    }
}


function showPosition(position){
    const userCoordinates = {
         lat : position.coords.latitude,
         lon : position.coords.longitude

    }
  
  
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates))
    fetchUserWeatherInfo(userCoordinates)
    
}


grantAccessButton.addEventListener("click",getLocation);


const searchInput = document.querySelector("[data-searchInput]")

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName===""){
        return;
    }else{
        fetchSearchWeatherInfo(cityName)
    }
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active")
    grantAccessContainer.classList.remove("active")
    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }catch(err){
        alert("the Error",err)
    }
}












































// https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=e8719eba64b7a1edc975c380283d6dc0&units=metric

// const API_KEY = 'e8719eba64b7a1edc975c380283d6dc0'

// function renderWeatherInfo(data){
//     const newEle = document.createElement("h1")
//     newEle.textContent = data.main.temp
//     document.body.appendChild(newEle)
// }

//this function just calling data and passing to other function
// async function fetchWeatherDetails(){
//   try {
//     let city = "goa"
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//     const data = await response.json()
//     //passing data to other function
//     renderWeatherInfo(data);

//     console.log(data)
//   } catch (error) {
//     console.log("The Erorr" ,error)
//   }
// }

// const newl =fetchWeatherDetails()

// async function getCustomWeatherDetails(){
    
//     try {
//       let city = "goa"
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//       const data = await response.json()
    
  
//       console.log(data)
//     } catch (error) {
//       console.log("The Erorr" ,error)
//     }
//   }






// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition)
//     }else{
//         console.log("No geoLocation Support")
//     }
// }


// function showPosition(position){
//     let lat = position.coords.latitude
//     let longi = position.coords.longitude
//     console.log(lat,longi)

// }
