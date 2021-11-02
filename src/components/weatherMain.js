import React, { Component } from 'react';
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Header from './header';
import Footer from './footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from 'react-bar-chart';

class WeatherMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData: [],
            temperatureData: [],
            apiKey: 'A43x9TpjZ8ukNRKtJWvNJ1QQNFSbsntw',
            error: null,
            citiesData: [],
            viewSelect: false,
            selectedOption: null,
            dailyForecast: null,
            weeklyForecast: null,
            apiCalled: true,
            width: 400,
            chartData: [
                { text: 'Minimum Temperature', value: 0 },
                { text: 'Maximum Temperature', value: 0 }
            ],
            weeklyData: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDayData = this.getDayData.bind(this);
        this.getWeeklyData = this.getWeeklyData.bind(this);
        this.jsonData = null;
    }

    render() {
        const margin = { top: 20, right: 0, bottom: 30, left: 40 };
        const weeklyForecastList = this.state.weeklyData.map((d) =>
            <div>
                <li>Date: {d.date}</li>
                <li>Minimum: {d.minimum}F</li>
                <li>Maximum: {d.maximum}F</li>
                <br></br>
            </div>
        );
        return (
            <div>
                <Header />
                <Container>
                    <br></br>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <Select
                                placeholder="Search a city"
                                options={this.state.citiesData}
                                onInputChange={this.handleInputChange}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <br></br>
                            <h3> Daily Temperature Graph</h3>
                        </Col>
                    </Row>
                    {this.getDayData()}
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <BarChart ylabel='Daily Forecast in F'
                                width={this.state.width}
                                height={500}
                                margin={margin}
                                data={this.state.chartData} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <br></br>
                            <h3> Weekly Forecast</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            {weeklyForecastList}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }

    getWeeklyData() {
        const data = this.jsonData;
        let max = null, min = null;
        if (this.state.selectedOption != null) {
            const city = data[this.state.selectedOption.value].Key
            fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + city + "?apikey=" + this.state.apiKey + "&language=en-us")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            weeklyForecast: result
                        });
                        const data = this.state.weeklyForecast;
                        if (data != null) {
                            for (let i = 0; i < data.DailyForecasts.length && this.state.weeklyData.length < 5; i++) {
                                min = data.DailyForecasts[i].Temperature.Minimum.Value
                                max = data.DailyForecasts[i].Temperature.Maximum.Value
                                let dateObj = new Date(data.DailyForecasts[i].Date)
                                this.state.weeklyData.push(
                                    { minimum: min, maximum: max, date: dateObj.toDateString() }
                                )
                            }
                            console.log(this.state.weeklyData)
                        }
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
    }

    getDayData() {
        const data = this.jsonData;
        let max = null, min = null;
        if (this.state.selectedOption != null && this.state.apiCalled) {
            const city = data[this.state.selectedOption.value].Key
            fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + city + "?apikey=" + this.state.apiKey + "&language=en-us")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            dailyForecast: result
                        });
                        const data = this.state.dailyForecast;
                        if (data != null) {
                            min = data.DailyForecasts[0].Temperature.Minimum.Value
                            max = data.DailyForecasts[0].Temperature.Maximum.Value
                        }
                        this.setState({
                            apiCalled: false,
                            chartData: [
                                { text: 'Minimum Temperature', value: min },
                                { text: 'Maximum Temperature', value: max }
                            ]
                        });
                        this.getWeeklyData()
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
    }

    handleChange = (selected) => {
        this.setState({
            selectedOption: selected,
        });
    };

    handleInputChange(value) {
        this.setState({
            citiesData: []
        })
        fetch("http://dataservice.accuweather.com/locations/v1/cities/search/?q=" + value + "&apikey=" + this.state.apiKey + "&language=en-us")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        locationData: JSON.stringify(result)
                    });
                    const data = JSON.parse(this.state.locationData)
                    this.jsonData = data;
                    for (let i = 0; i < data.length; i++) {
                        this.state.citiesData.push({ label: data[i].LocalizedName + "," + data[i].AdministrativeArea.LocalizedName + "," + data[i].Country.LocalizedName, value: i })
                    }
                    this.setState({
                        viewSelect: true,
                        apiCalled: true,
                        selectedOption: null
                    })
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
}

export default WeatherMain;