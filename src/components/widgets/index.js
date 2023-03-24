// import preact
import { h, render, Component } from 'preact';
import style from '../widgets/iphone_widgets';	

export default class Widgets extends Component {

	render() {
		return (
			<div class={style.container}>
				<label class={ style.label }>
					Humidity: {this.props.humid}%
				</label>
				<label class={ style.label }>
					Wind Speed: {this.props.wind}m/sec
				</label>
				<label class={ style.label }>
					Feels Like: {this.props.feel}°C
				</label>
				<label class={ style.label }>
					Visibility: {this.props.vis} metres
				</label>
			</div>
		);
	}
}