import { h, Component } from 'preact';

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
    
    /*Mock response for testing purposes
    const mockResponse = {
      "alert": {
        "title": "Tornado Warning",
        "description": "Tornado sighted in the area. Seek shelter immediately.",
        "instruction": "Go to the lowest level of your home. Cover your head and neck with your arms and put as many walls between you and the outside as possible."
      }
    };
    */
    const mockResponse = {
      "alert": null
    }
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
      return console.log("No alerts to display");
    }

    return (
      <div style="color:red;">
        <h2 style="margin:0px;height:16px;">{alert.title}</h2>
        <p style="margin=0px;font-size:13.5px;font-weight:bold;">{alert.description}<br />{alert.instruction}</p>
      </div>
    );
  }
}


export default WeatherAlertWidget;
