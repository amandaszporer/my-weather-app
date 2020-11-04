let now = new Date()
let apiKey = "5245c70173752e9c7a1ea0e23d87c083"

function updateTime (){
  let time = document.querySelector("#time")
  let hour = now.getHours();
  let minutes = now.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  } 
  if (hour < 10) {
    hour = `0${hour}`
  }
  time.innerHTML = (`${hour}:${minutes}`)}
  
  updateTime();
  
  function updateDay (weekday){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = document.querySelector("#day")  
    day.innerHTML = (days[weekday])
  }
  updateDay(now.getDay());
  
  let searchCity = document.querySelector("#search-city");
  
  function updateTemperature (response){
    console.log(response.data)
    document.querySelector("h1").innerHTML = response.data.name
    document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)} `
    document.querySelector("#humidity").innerHTML = response.data.main.humidity
    document.querySelector ("#wind").innerHTML = response.data.wind.speed
    document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min)
    document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max)
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like)
    document.querySelector("#description").innerHTML = response.data.weather[0].description
  }

  function search(city){

    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`
    axios.get(apiEndPoint).then(updateTemperature)
  }

  function handleSubmit(event){
    event.preventDefault()
    let city = document.querySelector("#city")
    search(city.value);
  }
  
  searchCity.addEventListener("submit", handleSubmit)
  
  search("Tel Aviv")
  

let farenheit = document.querySelector("#farenheit-temp")

function convertFarenheit (event){
  event.preventDefault()
  let tempFarenheit = document.querySelector("#current-temp")
  let temperature =  tempFarenheit.innerHTML
  tempFarenheit.innerHTML = `${Math.round((temperature * 9) / 5 + 32)} `
}

  farenheit.addEventListener("click", convertFarenheit)

let celsius = document.querySelector("#celsius-temp")

function convertCelsius (event){
  event.preventDefault()
  let tempCelsius = document.querySelector("#current-temp")
  let temperature = tempCelsius.innerHTML
  tempCelsius.innerHTML = `${Math.round((temperature -32) * 5/9)} `}
celsius.addEventListener("click", convertCelsius)


function handlePosition(position){
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`
  axios.get(apiUrl).then(updateTemperature)

}



function getLocation(event){
  navigator.geolocation.getCurrentPosition(handlePosition)
}



let currentLocation = document.querySelector("#current-location")
currentLocation.addEventListener("click", getLocation)