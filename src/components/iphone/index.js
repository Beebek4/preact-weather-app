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



export default class Iphone extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.fetchWeatherData();
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?lat=51.5&lon=-0.11&appid=1b7c33e6a19e20845a04bebc13db2f76";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the buttond
		this.setState({ display: false });
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
							{ this.state.locate }<br/>
							{ this.state.cond }<br/>
							{ this.state.temp }
						</div>
						<div class={style.weathericon}></div>
						
						
					</div>
					<div class={style.infoRow}>
					</div>
					<div class={style.slider}>
					</div>
					
				</div>
				<div class={ style.botview }>
					<Forecast/>
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}
