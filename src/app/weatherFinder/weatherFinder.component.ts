import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {

  cityName: string = '';
  weatherData: CityWeather | null = null;
  loading: boolean = false;
  noResult: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  searchWeather() {
    this.loading = true;
    this.noResult = false;
    const apiUrl = `https://jsonmock.hackerrank.com/api/weather?name=${this.cityName}`;
    this.http.get<ApiResponse>(apiUrl).subscribe(
      (response) => {
        this.loading = false;
        if (response.data.length > 0) {
          this.weatherData = response.data[0];
        } else {
          this.weatherData = null;
          this.noResult = true;
        }
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.loading = false;
      }
    );
  }
}
