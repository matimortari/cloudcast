interface GlobalContextType {
  forecast: any;
  weeklyForecast: any;
  geoCodedList: any[];
  inputValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
  airQuality: any;
  activeCityName: string;
}

interface GlobalContextUpdateType {
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
  updateCityName: (name: string) => void;
  getClickedCityCoords: (
    latitude: number,
    longitude: number,
    cityName: string,
  ) => void;
}
