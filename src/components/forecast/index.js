// import preact
import { h, render, Component } from 'preact';
import style from '../forecast/iphone_forecast';
// an empty array of objects for the 5 forecasted day of the week
var weekData=[
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
];

export default class Forecast extends Component {

	render(props) {
		const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		//assign the prop locally only once the data has been fetched
		if(props.dayforecast!=undefined){
			weekData = props.dayforecast;
			//store the weekday name inside each object instead
		}
		return (
			<div class={style.forecastbox}>
				<div class={style.container}>
					{weekData.map(({ day, icon, maxtemp, mintemp }) => {
						//defines our variables that will be rendered
						const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
						const date = new Date(day);
						const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
						return (
						<div class={style.daybox}>
							<div class={style.day}>{dayOfWeek}</div>
							<img src={weatherIconUrl} alt="" />
							<div>
							<span>H: {maxtemp}°C </span>
							<span>L: {mintemp}°C</span>
							</div>
						</div>
						);
					})}
					</div>
				
			</div>
		);
	}
}