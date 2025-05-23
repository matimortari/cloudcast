// Get UV index rating and description based on the UV index value
export const UV_RATING = (uvIndex: number) => {
  if (uvIndex <= 2)
    return {
      rating: "Low",
      description: "No protection required. You can safely stay outside.",
    };
  else if (uvIndex <= 5)
    return {
      rating: "Moderate",
      description: "Protection recommended. Seek shade during midday hours.",
    };
  else if (uvIndex <= 7)
    return {
      rating: "High",
      description: "Protection required. Seek shade during midday hours.",
    };
  else
    return {
      rating: "Extreme",
      description: "Protection required. Avoid exposure during midday.",
    };
};

// Get air quality description based on the Air Quality Index value
export const AQ_RATING = (aqIndex: number) => {
  if (aqIndex <= 50) return "Air quality is good. Enjoy the fresh air!";
  else if (aqIndex <= 100)
    return "Air quality is moderate. Enjoy the fresh air!";
  else if (aqIndex <= 150)
    return "Unhealthy for Sensitive Groups. Limit outdoor activities.";
  else if (aqIndex <= 200)
    return "Unhealthy air quality. Limit outdoor activities.";
  else if (aqIndex <= 300)
    return "Very unhealthy air quality. Avoid outdoor activities.";
  else
    return "Hazardous air quality. Stay indoors and avoid outdoor activities.";
};

// Get feels like description based on the apparent temperature
export const FEELS_LIKE_RATING = (feelsLike: number, currentTemp: number) => {
  if (feelsLike < currentTemp - 2)
    return "Feels colder than the actual temperature.";
  else if (feelsLike <= currentTemp + 2)
    return "Feels close to the actual temperature.";
  else return "Feels warmer than the actual temperature.";
};

// Get precipitation description based on the precipitation value
export const PRECIPITATION_RATING = (precipitation: number) => {
  if (precipitation < 0.1) return "No precipitation expected.";
  else if (precipitation < 1) return "Light precipitation expected.";
  else if (precipitation < 5) return "Moderate precipitation expected.";
  else return "Heavy precipitation expected.";
};

// Get humidity description based on the humidity value
export const HUMIDITY_RATING = (humidity: number) => {
  if (humidity < 30) return "Low humidity: stay hydrated!";
  else if (humidity < 50) return "Comfortable humidity.";
  else if (humidity < 70) return "Moderate humidity.";
  else return "High humidity: stay cool!";
};

// Get visibility description based on the visibility value
export const VISIBILITY_RATING = (visibility: number) => {
  if (visibility > 10) return "Excellent: Clear and vast view.";
  else if (visibility > 5) return "Good: Easily navigable.";
  else if (visibility > 2) return "Moderate: Some limitations.";
  else return "Poor: Restricted and unclear view.";
};
