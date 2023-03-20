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
    
    // Mock response for testing purposes
    const mockResponse = {
      "alert": {
        "title": "Tornado Warning",
        "description": "A tornado has been sighted in the area. Seek shelter immediately.",
        "instruction": "Go to the lowest level of your home, away from windows and exterior walls. Cover your head and neck with your arms and put as many walls between you and the outside as possible."
      }
    };
    
    // const mockResponse = {
    //     "alert": null
    //   };

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
      return <div>No alerts to display.</div>;
    }

    return (
      <div>
        <h2>{alert.title}</h2>
        <p>{alert.description}</p>
        <p>{alert.instruction}</p>
      </div>
    );
  }
}

export default WeatherAlertWidget;
