// import preact
import { h, render, Component } from 'preact';
import style from '../widgets/iphone_widgets';	

export default class Widgets extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.container}>
				<button class={ style.button } clickFunction={ this.fetchWeatherData }>
					UV Index
				</button>
				<button class={ style.button } clickFunction={ this.fetchWeatherData }>
					Gust Speed
				</button>
				<button class={ style.button } clickFunction={ this.fetchWeatherData }>
					Precipitation
				</button>
				<button class={ style.button } clickFunction={ this.fetchWeatherData }>
					Feels Like
				</button>
				<button class={ style.button } clickFunction={ this.fetchWeatherData }>
					Visibility
				</button>
			</div>
		);
	}
}