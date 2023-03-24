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
import Carousel from "../carousel";



export default class Iphone extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);

		this.state = {
			location: 'london',
			locationLongtitude : 0,
			locationLatitude : 0,
			temp: null,
			cond: null
		};

		this.fetchLongLatData("london");


	}

	// call to fetch current weather data given longtitude and latitude
	fetchForecastData(lat, lon){
		const url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=40&units=metric&appid=1b7c33e6a19e20845a04bebc13db2f76";
		$.ajax({
			url,
			dataType: "jsonp",
			success : this.parseForecastResponse,
			error(req, err){ console.log('Forecast API call failed ' + err); }
		});
	}

	// call to fetch longtitude and latitude of given location
	fetchLongLatData(place){
		let url = "http://api.openweathermap.org/geo/1.0/direct?q="+place+"&limit=5&appid=1b7c33e6a19e20845a04bebc13db2f76";
		$.ajax({
			url,
			dataType: "jsonp",
			success : this.parseLongLatResponse,
			error(req, err){ console.log('Longtitude and Latitude API call failed ' + err); }
		});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (lat,lon) => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		let url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&appid=1b7c33e6a19e20845a04bebc13db2f76&units=metric";
		$.ajax({
			url,
			dataType: "jsonp",
			success : this.parseResponse,
			error(req, err){ console.log('Weather API call failed ' + err); }
		});

	}

	//Function to turn first character of a string to capital
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//function to parse data given from forecast API call
	parseForecastResponse = (parsed_json) => {

		let day8 = [];

		//Compares the 3 hour interval temperatures of the same day to find the highest and lowest then stores them in an array
		for (let i = 0; i < parsed_json['cnt']; i++) {
			if (i%8 == 0){
				day8[i/8] = {day: parsed_json['list'][i]['dt_txt'],icon: parsed_json['list'][i]['weather']['0']['icon'] ,maxtemp: parseInt(parsed_json['list'][i]['main']['temp_max']),mintemp: parseInt(parsed_json['list'][i]['main']['temp_min'])};
			}
			else if (day8[Math.trunc(i/8)].maxtemp < parseInt(parsed_json['list'][i]['main']['temp_max'])){
				day8[Math.trunc(i/8)].maxtemp = parseInt(parsed_json['list'][i]['main']['temp_max']);
			}
			else if (day8[Math.trunc(i/8)].mintemp > parseInt(parsed_json['list'][i]['main']['temp_min'])){
				day8[Math.trunc(i/8)].mintemp = parseInt(parsed_json['list'][i]['main']['temp_min']);
			}
		}
		//setstate so updated data can be rendered
		this.setState({
			dayforecast: day8
		});

	}

	//function to parse data given from longtitude and latitude API call
	parseLongLatResponse = (parsed_json) => {
		let lat = parsed_json['0']['lat'];
		let lon = parsed_json['0']['lon'];
		let location = parsed_json['0']['local_names']['en'];

		this.setState({
			locate: location,
			locationLatitude: lat,
			locationLongtitude: lon
		});

		// call to fetch weather data using given long and lat
		this.fetchWeatherData(this.state.locationLatitude,this.state.locationLongtitude);
		// call to fetch forecast data using given long and lat
		this.fetchForecastData(this.state.locationLatitude,this.state.locationLongtitude);
	}

	parseResponse = (parsed_json) => {
		//Parsing data of current day from API callx
		let temp_c = parsed_json['main']['temp'];
		let conditions = parsed_json['weather']['0']['description'];
		let icon = parsed_json['weather']['0']['icon'];
		let feels = parsed_json['main']['feels_like'];
        let winds = parsed_json['wind']['speed'];
        let humids = parsed_json['main']['humidity'];
        let viss = parsed_json['visibility'];



		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : this.capitalizeFirstLetter(conditions),
			image : "https://openweathermap.org/img/wn/"+icon+"@2x.png",
			feel : feels,
			wind : winds,
			humid: humids,
			vis : viss,
		});
	}

	// a method to update the location state when the user submits the form
	updateLocation = (e) => {
		e.preventDefault();
		const newLocation = this.locationInput.value.trim();
		if (newLocation !== "") {
		this.fetchLongLatData(newLocation);
		}
	};
	
	// a method to render the search box and button
	renderSearchBox() {
		return (
		<form class={style.searchBox} onSubmit={this.updateLocation}>
			<input
			type="text"
			ref={(input) => (this.locationInput = input)}
			placeholder="Enter city name"
			/>
			<button type="submit">Search</button>
		</form>
		);
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container}>
				{this.renderSearchBox()}
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
						<Widgets feel={this.state.feel} wind={this.state.wind} vis={this.state.vis} humid={this.state.humid}  />
					</div>
					<div class={style.slider}>
					<WeatherAlertWidget/>
					</div>

				</div>
				<div class={ style.botview }>
					<Carousel>
						<Forecast parseForecastResponse={this.parseForecastResponse} dayforecast={this.state.dayforecast}/>
						<Clothing parseResponse={this.parseResponse} temp={this.state.temp} cond={this.state.cond}/>
					</Carousel>
				</div>
			</div>
		);
	}


}
