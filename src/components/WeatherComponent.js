import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import Container from 'react-bootstrap/Container';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from './ChartComponent'

class WeatherMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData: [],
            temperatureData: [],
            error: null,
            citiesData: [],
            selectedOption: null,
            dailyForecast: null,
            weeklyForecast: null,
            apiCalled: false,
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
        this.getDataService = this.getDataService.bind(this);
        this.jsonData = null;
    }

    async getDataService(url, value, param) {
        var data = await fetch(url + value + param + process.env.REACT_APP_API_KEY + "&language=en-us")
        var json = await data.json()
        return json;
    }

    async getWeeklyData() {
        const jsonData = this.jsonData;
        let max = null, min = null;
        var objs = []
        if (this.state.selectedOption != null) {
            const city = jsonData[this.state.selectedOption.value].Key
            const data = await this.getDataService(process.env.REACT_APP_WEEK_URL, city, process.env.REACT_APP_FORECAST_PARAM)
            if (data != null) {
                for (let i = 0; i < data.DailyForecasts.length && this.state.weeklyData.length < 5; i++) {
                    min = data.DailyForecasts[i].Temperature.Minimum.Value
                    max = data.DailyForecasts[i].Temperature.Maximum.Value
                    let dateObj = new Date(data.DailyForecasts[i].Date)
                    objs.push(
                        { minimum: min, maximum: max, date: dateObj.toDateString() }
                    )
                }
                this.setState({
                    weeklyData: objs
                })
            }
        }
    }

    async getDayData() {
        const jsonData = this.jsonData;
        let max = null, min = null;
        if (this.state.selectedOption != null && this.state.apiCalled) {
            const city = jsonData[this.state.selectedOption.value].Key
            const data = await this.getDataService(process.env.REACT_APP_DAY_URL, city, process.env.REACT_APP_FORECAST_PARAM)
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
            },
                () => {
                    this.getWeeklyData()
                });
        }
    }

    handleChange = (selected) => {
        this.setState({
            selectedOption: selected,
        });
    };

    async handleInputChange(value) {
        this.setState({
            citiesData: []
        })
        if (value.length > 0) {
            const data = await this.getDataService(process.env.REACT_APP_CITY_URL, value, process.env.REACT_APP_CITY_PARAM)
            this.jsonData = data;
            for (let i = 0; i < data.length; i++) {
                this.state.citiesData.push({ label: data[i].LocalizedName + "," + data[i].AdministrativeArea.LocalizedName + "," + data[i].Country.LocalizedName, value: i })
            }
            this.setState({
                apiCalled: true,
                selectedOption: null
            })
            return this.state.citiesData;
        }
    }

    async componentDidUpdate() {
        await this.getDayData()
    }

    render() {
        const weeklyForecastList = this.state.weeklyData.map((d) =>
            <div>
                <li>Date: {d.date}
                    <br></br>
                    Minimum: {d.minimum}F
                    <br></br>
                    Maximum: {d.maximum}F
                </li>
            </div>
        );
        return (
            <div>
                <Header />
                <Container>
                    <br></br>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                placeholder="Search a city"
                                loadOptions={this.handleInputChange}
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
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <Chart chartData={this.state.chartData} />
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
}

export default WeatherMain;