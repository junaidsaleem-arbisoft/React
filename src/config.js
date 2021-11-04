var urls = {
    city: process.env.REACT_APP_CITY_URL,
    day: process.env.REACT_APP_DAY_URL,
    week: process.env.REACT_APP_WEEK_URL
}

var params = {
    city: process.env.REACT_APP_CITY_PARAM,
    forecast: process.env.REACT_APP_FORECAST_PARAM
}

var key = process.env.REACT_APP_API_KEY

export {urls, params, key}