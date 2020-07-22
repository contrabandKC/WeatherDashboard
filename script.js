$(document).ready(function(){

    var APIKey = "6a6d81762f7d9ffba1f57aa4ff8d7ab1"

  
    function initSearched(){
        if (localStorage.length == 0) {
            console.log("empty")
            return
        }
        else{
            console.log(localStorage.length)

            for(var i = 0; i< localStorage.length; i++){
                var index = localStorage.key(i)
                var city = localStorage.getItem(index)
                console.log(localStorage.key(i), localStorage.getItem(index), city)
                var card = $("<div>").attr("class", "card")
                var cityEl = $("<div>").text(city).attr("class", "card-body text-capitalize searched")
                card.append(cityEl)
                $("#searched").prepend(card)      
            }
        }
    }

    initSearched()



    $('#search').click(function(event){

        var date
        event.preventDefault()
        var city = $('#city').val().trim()

        if(city){

        $('#dashBoard').empty()
        $('#foreCast').empty()

        if (city) {
            var card = $("<div>").attr("class", "card")
            var cityEl = $("<div>").text(city).attr("class", "card-body text-capitalize searched")
            card.append(cityEl)
            $("#searched").prepend(card)       
        }
        getWeather(city)
        getForecast(city)  
        console.log(city)
        localStorage.setItem(city,city)

        searched()

        $('#city').val("")
        $('#five').empty()

        }


  



    })



    function getWeather(city){

        // city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        var lat, lon, uvi
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){
            console.log(response)

            lon = response.coord.lon
            lat = response.coord.lat

            console.log(lon, lat)

            var dashboard = $("<div>").attr("class","border pl-4 pb-4")

            var c = $("<h3>").text(response.name + " " + moment().format("L")).attr("class", "")
            
            var temp = $("<div>").text("Temperature: "+response.main.temp  + " F")
            var hum = $("<div>").text("Humidity: "+response.main.humidity+ "%").attr("class", "mt-3")
            var wind = $("<div>").text("Wind Speed: " + response.wind.speed +" MPH").attr("class", "mt-3")
            


            var img = $("<img>").attr("src","http://openweathermap.org/img/wn/" +response.weather[0].icon +"@2x.png" )
            c.append(img)


            uvi = getUV(lat,lon) 
            console.log(uvi)


            dashboard.append(c, temp, hum, wind)


            $("#dashBoard").append(dashboard)

            // getUV(lat,lon) 



        })

        
    }

    function getForecast(city){

        // city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(response){
            console.log(response)

            var header = $("<h4>").attr("class", "card-header p-2 mt-4 shadow").text("5-Day Forecast:")

            $("#five").prepend(header)

         

            $.each(response.list, function(i, day){
               
                
                var time = moment(day.dt_txt).hour()
            
                console.log(i, day.dt_txt, time)
                if (time == 15) {
                    var card = $("<div>").attr("class", "card text-white bg-primary m-2 shadow")

                    var date = $("<div>").text(moment(day.dt_txt).format("ddd, hA")).attr("class", "card-header")
                    var body = $("<div>").attr("class", "card-body")
                    var img = $("<img>").attr("src","http://openweathermap.org/img/wn/" + day.weather[0].icon +"@2x.png" )
                    // c.append(img)
                    var temp = $("<div>").text("Temp: "+day.main.temp  + " F" ).attr("class", "card-text ")
                    var hum = $("<div>").text("Humidity: "+day.main.humidity+ "%").attr("class", "card-text ")
                    
                    body.append(img, temp, hum)
                    card.append(date, body)
                    $("#foreCast").append(card)

                
                }
                
       
            })



        })

        
    }
 
    function getUV(lat, lon){

        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" 
        +lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey

        $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(response){
            var uvI = response.current.uvi

            // uvI = 11

            var scale = ""
            console.log( "class uvi", uvI)
            
         
            if(1 <= uvI && uvI < 3){
                scale = "bg-success"
            }
            else if(3 <= uvI && uvI < 6){
                scale = "bg-warning"
            }
            else if (6 <= uvI && uvI < 8){
                scale = "orange"
            }
            else if(8 <= uvI && uvI < 11){
                scale = "bg-danger"; 
            }
            else{
                scale = "violet"
            }


            
            console.log("UV ",response, uv)
            var uvIndex = $("<div>").attr("class", "mt-3 d-flex flex-row")
            var uv = $("<div>").text("UV index:  " ).attr("class", "")
            var index = $("<div>").text("    "+uvI+" ").attr("class", "text-white p-1 ml-2 rounded " +scale )
            console.log(uv)
            uvIndex.append(uv, index)
            $("#dashBoard").children().append(uvIndex)
            return parseFloat(uv)

          })
    }

function searched(){

    $(".searched").click(function(event){
        console.log($(this).text())

        var city = $(this).text()
        getWeather(city)
        getForecast(city)  
        console.log(city)
        $('#dashBoard').empty()
        $('#foreCast').empty()
        $('#city').val("")
        $('#five').empty()
    })

}

searched()


})