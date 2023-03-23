// import preact
import { h, render, Component } from 'preact';
import style from '../forecast/iphone_forecast';
// an empty array of objects for the 5 forecasted day of the week
var weekData=[
    {
        "day": "2023-03-24 00:00:00",
        "icon": "04n",
        "maxtemp": 12,
        "mintemp": 7
    },
    {
        "day": "2023-03-25 00:00:00",
        "icon": "10n",
        "maxtemp": 12,
        "mintemp": 7
    },
    {
        "day": "2023-03-26 00:00:00",
        "icon": "04n",
        "maxtemp": 8,
        "mintemp": 5
    },
    {
        "day": "2023-03-27 00:00:00",
        "icon": "04n",
        "maxtemp": 8,
        "mintemp": 3
    },
    {
        "day": "2023-03-28 00:00:00",
        "icon": "01n",
        "maxtemp": 8,
        "mintemp": 1
    }
];

export default class Forecast extends Component {

	render(props) {
		const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		//method to attain the corresponding weekday name from the date format of the API
		function getWeekdayName(dateString) {
  			const date = new Date(dateString);
  			const day = date.getDay();
  			return weekdayNames[day];
		}
		//assign the prop locally only once the data has been fetched
		if(props.dayforecast!=undefined){
			weekData = props.dayforecast;
			//store the weekday name inside each object instead
			for (let i = 0; i < weekData.length; i++) {
				weekData[i].day=getWeekdayName(weekData[i].day);
			}
		}
		return (
			<div class={style.forecastbox}>
				<div class={style.container}>
					{weekData.map(({ day, icon, maxtemp, mintemp }) => {
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