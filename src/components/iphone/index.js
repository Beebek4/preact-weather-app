// import preact
import { h, render, Component, useEffect} from 'preact';
// import stylesheets for ipad & button
import style from './style';

// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import style_iphone from '../button/style_iphone';

import Forecast from '../forecast';
import Clothing from '../clothingrecs';
import Widgets from '../widgets';
import WeatherAlertWidget from '../weatheralert';



export default class Iphone extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
		
		this.state = {
			locationLongtitude : 0,
			locationLatitude : 0,
			temp: null,
            cond: null,
		}
		this.fetchLongLatData("london");
		
		
	}

	fetchForecastData(lat, lon){
		var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=40&units=metric&appid=1b7c33e6a19e20845a04bebc13db2f76";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForecastResponse,
			error : function(req, err){ console.log('Forecast API call failed ' + err); }
		});
	}

	// call to fetch longtitude and latitude of given location
	fetchLongLatData(place){
		var url = "http://api.openweathermap.org/geo/1.0/direct?q="+place+"&limit=5&appid=1b7c33e6a19e20845a04bebc13db2f76";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseLongLatResponse,
			error : function(req, err){ console.log('Longtitude and Latitude API call failed ' + err); }
		});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (lat,lon) => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&appid=1b7c33e6a19e20845a04bebc13db2f76&units=metric";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('Weather API call failed ' + err); }
		});
		
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container}>
				<div class={ style.topview }>
					<div class={style.mainView}>
						<div class={style.weatherinfo}>
							<div class={style.heading}>{ this.state.locate }</div>
							<div class={style.temp}>{ Math.trunc(this.state.temp) }°C</div>
							<p class={style.desc}>{ this.state.cond }</p>
							
							

							
						</div>
						<div class={style.weathericon}>
							<div class={ style.iconframe }>
								<img src={ this.state.image } alt="icon" height="150" />
							</div>
							
						</div>
						
						
					</div>
					<div class={style.infoRow}>
						<Widgets/>
					</div>
					<div class={style.slider}>
					</div>
					
				</div>
				<div class={ style.botview }>

					<Forecast parseForecastResponse={this.parseForecastResponse} dayforecast={this.state.dayforecast}/>
					{/*<Clothing parseResponse={this.parseResponse} temp={this.state.temp} cond={this.state.cond}/>*/}
				</div>
			</div>
		);
	}

	parseForecastResponse = (parsed_json) => {

		var day8 = [];
		
		//Compares the 3 hour interval temperatures of the same day to find the highest and lowest then stores them in an array
		for (let i = 0; i < parsed_json['cnt']; i++) {
			if (i%8 == 0){
				day8[i/8] = {day: parsed_json['list'][i]['dt_txt'],icon: parsed_json['list'][i]['weather']['0']['icon'] ,maxtemp: parseInt(parsed_json['list'][i]['main']['temp_max']),mintemp: parseInt(parsed_json['list'][i]['main']['temp_min'])};
			}
			else{
				if (day8[Math.trunc(i/8)].maxtemp < parseInt(parsed_json['list'][i]['main']['temp_max'])){
					day8[Math.trunc(i/8)].maxtemp = parseInt(parsed_json['list'][i]['main']['temp_max']);
				}
				else if (day8[Math.trunc(i/8)].mintemp > parseInt(parsed_json['list'][i]['main']['temp_min'])){
					day8[Math.trunc(i/8)].mintemp = parseInt(parsed_json['list'][i]['main']['temp_min']);
				} 
			} 
		}
		console.log(day8);
		this.setState({ 
			dayforecast: day8,
		});
		
	}

	parseLongLatResponse = (parsed_json) => {
		var lat = parsed_json['0']['lat'];
		var lon = parsed_json['0']['lon'];
		var location = parsed_json['0']['local_names']['en'];

		this.setState({ 
			locate: location,
			locationLatitude: lat,
			locationLongtitude: lon
		});
		
		// call to fetch weather data using given long and lat
		this.fetchWeatherData(this.state.locationLatitude,this.state.locationLongtitude);
		this.fetchForecastData(this.state.locationLatitude,this.state.locationLongtitude);
	}

	parseResponse = (parsed_json) => {
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var icon = parsed_json['weather']['0']['icon'];

		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : this.capitalizeFirstLetter(conditions),
			image : "https://openweathermap.org/img/wn/"+icon+"@2x.png"
		});      
	}
}
