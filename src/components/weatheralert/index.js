import { h, Component } from 'preact';
import style from './style.less';
class WeatherAlertWidget extends Component {
  state = {
    alert: null,
    isLoading: true,
    error: null
  };

  componentDidMount() {
    // You can remove the fetch call and use the mock response below for testing purposes
    // fetch('https://api.weather.com/alerts', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'YOUR_API_KEY_HERE'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     const { alert } = data;
    //     this.setState({
    //       alert,
    //       isLoading: false
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       isLoading: false,
    //       error: error.message
    //     });
    //   });
    
    //Mock response for testing purposes
    const mockResponse = {
      "alert": {
        "title": "Flood Warning",
        "description": "River levels are expected to rise significantly in the next few hours due to heavy rainfall.",
        "instruction": "Turn off gas, electricity, and water supplies if it is safe to do so. Do not walk or drive through floodwater. Stay tuned to local news and weather updates."
      }
    };
    //
   /*
    const mockResponse = {
      "alert": null
    }
    */
    const { alert } = mockResponse;
    this.setState({
      alert,
      isLoading: false
    });
  }

  render() {
    const { alert, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (!alert) {
      return ("No alerts to display");
    }

    return (
      <div class={style['red-text']}>
        <h2 class={style['alert-title']}>{alert.title}</h2>
        <p class={style['alert-description']}>{alert.description}<br />{alert.instruction}</p>
      </div>

    );
  }
}


export default WeatherAlertWidget;
