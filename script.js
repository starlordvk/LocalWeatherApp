
var latitude;
var longitude;
var degree='°';
var appid="2ea319813add682bd524667b4f6ac44b";
var celcius=true;

var tempScales=['Desert','City','Fire','Snow'];

function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(getWeather);
		}else{
			$('loading-location').html("Location not supported");
		}
	}

function getWeather(pos){

	var lat=pos.coords.latitude;
	var long=pos.coords.longitude;
	var weatherLink="https://simple-weather.p.mashape.com/weatherdata?lat=35&lng=135";
	var fetchWeatherUrl='http://api.openweathermap.org/data/2.5/weather?';
		fetchWeatherUrl+='APPID='+appid;
		fetchWeatherUrl+='&lat='+lat;
		fetchWeatherUrl+='&lon='+long;
		fetchWeatherUrl+='&units=metric';
		console.log("URL= "+fetchWeatherUrl);
		fetchWeather(fetchWeatherUrl);

	}

	function fetchWeather(fetchWeatherUrl){
		$.ajax({
		
	 	url:fetchWeatherUrl,
	 	dataType:"jsonp",
	 	
	 	success: function(response) {
	 		console.log(response);
	 				$("#city").html(response.name+ ', '+response.sys.country);
         // $(".weatherContent").append("<span id='faren'>" + resp.current_observation.temp_f + " °F</span>");
          
                //  $('#curr-temperature').html(response.main.temp);
                  
                 	$('.loadin').hide();
					$('#curr-temperature').html(response.main.temp+' '+degree);
					if(celcius){
					$('#curr-temperature').append('C');
					}else{
					$('#curr-temperature').append('F');
					}
					$('.max-temp').html("Max: "+response.main.temp_max+' '+degree);
					if(celcius){
					$('.max-temp').append('C');
					}else{
					$('.max-temp').append('F');
					}

					$('.min-temp').html("Min: "+response.main.temp_min+' '+degree);
					if(celcius){
					$('.min-temp').append('C');
					}else{
					$('.min-temp').append('F');
					}
					
					
                  $('.wind-speed').html(response.wind.speeds);
                 // $("#curr-temperature").html(response.main.temp);
          		  $(".wind-speed").html(response.wind.speed + " m/s");
                  $(".humidity").html(response.main.humidity + " %");
                  $(".pressure").html(response.main.pressure + " hPa");
                  var sec1 =response.sys.sunrise;
                  var sec2=response.sys.sunset;
					var date1 = new Date(sec1 * 1000);
					var date2 = new Date(sec2 * 1000);
					var timestr1 = date1.toLocaleTimeString();
					var timestr2 = date2.toLocaleTimeString();

				  $(".sunrise-time").html(timestr1);
                  $(".sunset-time").html(timestr2);
                  $("#weather-main-icon").addClass("wi-owm-"+response.weather[0].id);
                  $(".description").html(response.weather[0].description);




                  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();


if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

$("#day").html(weekday[today.getDay()]);

today = dd+'/'+mm+'/'+yyyy;


$("#date").html(today);

					

					$("body").css("background",'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url("'+getQueryUrl(response)+'")');



              }


	 });

	}
	 
	


function getQueryUrl(wejson){
		var queryUrl="https://source.unsplash.com/";
		queryUrl+=$(window).width()+"x"+$(window).height()+"/?";
		var temp=wejson.main.temp;
		if(temp>40){
			queryUrl+=tempScales[0];
		}else if(temp>20){
			queryUrl+=tempScales[1];
		}else if(temp>0){
			queryUrl+=tempScales[2];
		}else{
			queryUrl+=tempScales[3];
		}
		if(wejson.weather[0].main=="Clear"){
			var millis=Math.floor((new Date()).getTime()/1000);
			if(wejson.sys.sunrise>millis || millis>wejson.sys.sunset){
				queryUrl+=",Night";
			}
		}else{
			queryUrl+=","+wejson.weather[0].main;
		}
		console.log(queryUrl);
		return queryUrl;
	}



$(document).ready(function(){
    getLocation();

  
    });





