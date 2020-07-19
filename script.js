$(document).ready(function(){

    var APIKey = "6a6d81762f7d9ffba1f57aa4ff8d7ab1"

    var lat , lon

    $('#search').click(function(event){

        var date
        event.preventDefault()
        var city = $('#city').val().trim()
        getWeather(city)
        getForecast(city)   
        console.log(city)
        localStorage.setItem(city,city)

        $('#dashBoard').empty()
        $('#foreCast').empty()
        var card = $("<div>").attr("class", "card")
        var cityEl = $("<div>").text(city).attr("class", "card-body")
        card.append(cityEl)
        $("#searched").prepend(card)

        $('#city').val("")
        $('#five').empty()


    })



    function getWeather(city){

        city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){
            console.log(response)

            lon = response.coord.lon
            lat = response.coord.lat

            console.log(lon, lat)

            var dashboard = $("<div>").attr("class","border ")

            var c = $("<h3>").text(response.name + " " + moment().format("L"))
            
            var temp = $("<div>").text("Temperature: "+response.main.temp  + " F" )
            var hum = $("<div>").text("Humidity: "+response.main.humidity+ "%")
            var wind = $("<div>").text("Wind Speed: " + response.wind.speed +" MPH")
            var uv = $("<div>").text("UV index: " + response.name)

            var img = $("<img>").attr("src","http://openweathermap.org/img/wn/" +response.weather[0].icon +"@2x.png" )
            c.append(img)
            dashboard.append(c, temp, hum, wind,uv)


            $("#dashBoard").append(dashboard)


        })

        
    }

    function getForecast(city){

        city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(response){
            console.log(response)

            var header = $("<h4>").attr("class", "card-header").text("5-day forecast")

            $("#five").prepend(header)

         

            $.each(response.list, function(i, day){
               
                
                var time = moment(day.dt_txt).hour()
            
                console.log(i, day.dt_txt, time)
                if (time == 15) {
                    var card = $("<div>").attr("class", "card text-white bg-primary m-2")

                    var date = $("<div>").text(moment(day.dt_txt).format("ddd, hA")).attr("class", "card-header")
                    var body = $("<div>").attr("class", "card-body")
                    var img = $("<img>").attr("src","http://openweathermap.org/img/wn/" + day.weather[0].icon +"@2x.png" )
                    // c.append(img)
                    var temp = $("<div>").text("Temp: "+day.main.temp  + " F" ).attr("class", "card-text")
                    var hum = $("<div>").text("Humidity: "+day.main.humidity+ "%").attr("class", "card-text")
                    
                    body.append(img, temp, hum)
                    card.append(date, body)
                    $("#foreCast").append(card)

                
                }
                
       
            })


            // var wind = $("<div>").text("Wind Speed: " + response.wind.speed +" MPH")
            // var uv = $("<div>").text(response.name)


            // dashboard.append(c, temp, hum, wind,uv)


            // $("#dashBoard").append(dashboard)


        })

        
    }
 



})