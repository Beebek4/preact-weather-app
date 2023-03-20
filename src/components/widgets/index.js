// import preact
import { h, render, Component } from 'preact';
	
export default class Widgets extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			<div>
				<button onClick={cFunction}>
					Display Weather
				</button>
			</div>
		);
	}
}