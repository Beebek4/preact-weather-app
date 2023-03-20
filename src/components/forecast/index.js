// import preact
import { h, render, Component } from 'preact';
import style from '../forecast/iphone_forecast';
	
export default class Forecast extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.forecastbox}>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
				<div class={style.daybox}>
					<p>yae</p>
				</div>
			</div>
		);
	}
}