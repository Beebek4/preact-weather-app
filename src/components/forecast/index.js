// import preact
import { h, render, Component } from 'preact';
import style from '../forecast/iphone_forecast';
console.log("From forecast")
var data = [
	{
		"day": "2023-03-22 15:00:00",
		"icon": "10d",
		"maxtemp": 14,
		"mintemp": 7
	},
	{
		"day": "2023-03-23 15:00:00",
		"icon": "10d",
		"maxtemp": 12,
		"mintemp": 7
	},
	{
		"day": "2023-03-24 15:00:00",
		"icon": "10d",
		"maxtemp": 12,
		"mintemp": 8
	},
	{
		"day": "2023-03-25 15:00:00",
		"icon": "10d",
		"maxtemp": 12,
		"mintemp": 6
	},
	{
		"day": "2023-03-26 15:00:00",
		"icon": "10d",
		"maxtemp": 7,
		"mintemp": 1
	}
]
export default class Forecast extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.forecastbox}>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.container}>
					{data.map(({ day, icon, maxtemp, mintemp }) => {
						const date = new Date(day);
						const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
						const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

						return (
						<div class={style.daybox}>
							<div>{dayOfWeek}</div>
							<img src={weatherIconUrl} alt="" />
							<div>
							<span>Max: {maxtemp}°C</span>
							<span>Min: {mintemp}°C</span>
							</div>
						</div>
						);
					})}
					</div>
				
			</div>
		);
	}
}