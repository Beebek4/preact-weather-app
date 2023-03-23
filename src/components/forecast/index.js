// import preact
import { h, render, Component } from 'preact';
import style from '../forecast/iphone_forecast';
console.log("From forecast")
var weekInfo=[
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
	{"day": "", "icon": "", "maxtemp": 0, "mintemp": 0},
];
export default class Forecast extends Component {

	render(props) {
		const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		function getWeekdayName(dateString) {
  			const date = new Date(dateString);
  			const day = date.getDay();
  			return weekdayNames[day];
		}
		if(props.dayforecast!=undefined){
			weekInfo = props.dayforecast;
			for (let i = 0; i < weekInfo.length; i++) {
				weekInfo[i].day=getWeekdayName(weekInfo[i].day);
			}
		}
		return (
			<div class={style.forecastbox}>
				<div class={style.container}>
					{weekInfo.map(({ day, icon, maxtemp, mintemp }) => {
						//const date = new Date(day);
						//const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
						const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

						return (
						<div class={style.daybox}>
							<div class={style.day}>{day}</div>
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