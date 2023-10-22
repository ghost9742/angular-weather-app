import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './services/weather.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  faTemperatureLow = faTemperatureLow;
  faTemperatureHigh = faTemperatureHigh;
  faDroplet = faDroplet;
  faWind = faWind;

  cityName: string = '';
  temp: number = 0;
  temp_max: number = 0;
  temp_min: number = 0;
  wind: number = 0;
  humidity: number = 0;
  weather: string = '';

  cities: any = [];
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedCities: any = [];

  public testGroup = this.formBuilder.group({});

  constructor(
    private weatherService: WeatherService,
    private formBuilder: FormBuilder
  ) {
    this.cities = [
      'Abidjan',
      'Abu Dhabi',
      'Abuja',
      'Accra',
      'Addis Ababa',
      'Ahmedabad',
      'Aleppo',
      'Alexandria',
      'Algiers',
      'Almaty',
      'Amman',
      'Amsterdam',
      'Anchorage',
      'Andorra la Vella',
      'Ankara',
      'Antananarivo',
      'Apia',
      'Arnold',
      'Ashgabat',
      'Asmara',
      'Asuncion',
      'Athens',
      'Auckland',
      'Avarua',
      'Baghdad',
      'Baku',
      'Bamako',
      'Banda Aceh',
      'Bandar Seri Begawan',
      'Bandung',
      'Bangkok',
      'Bangui',
      'Banjul',
      'Barcelona',
      'Barranquilla',
      'Basrah',
      'Basse-Terre',
      'Basseterre',
      'Beijing',
      'Beirut',
      'Bekasi',
      'Belem',
      'Belgrade',
      'Belmopan',
      'Belo Horizonte',
      'Bengaluru',
      'Berlin',
      'Bern',
      'Bishkek',
      'Bissau',
      'Bogota',
      'Brasilia',
      'Bratislava',
      'Brazzaville',
      'Bridgetown',
      'Brisbane',
      'Brussels',
      'Bucharest',
      'Budapest',
      'Buenos Aires',
      'Bujumbura',
      'Bursa',
      'Busan',
      'Cairo',
      'Cali',
      'Caloocan',
      'Camayenne',
      'Canberra',
      'Cape Town',
      'Caracas',
      'Casablanca',
      'Castries',
      'Cayenne',
      'Charlotte Amalie',
      'Chengdu',
      'Chennai',
      'Chicago',
      'Chisinau',
      'Chittagong',
      'Chongqing',
      'Colombo',
      'Conakry',
      'Copenhagen',
      'Cordoba',
      'Curitiba',
      'Daegu',
      'Daejeon',
      'Dakar',
      'Dallas',
      'Damascus',
      'Dar es Salaam',
      'Delhi',
      'Denver',
      'Dhaka',
      'Dili',
      'Djibouti',
      'Dodoma',
      'Doha',
      'Dongguan',
      'Douala',
      'Douglas',
      'Dubai',
      'Dublin',
      'Durban',
      'Dushanbe',
      'Faisalabad',
      'Fort-de-France',
      'Fortaleza',
      'Freetown',
      'Fukuoka',
      'Funafuti',
      'Gaborone',
      'George Town',
      'Georgetown',
      'Gibraltar',
      'Gitega',
      'Giza',
      'Guadalajara',
      'Guangzhou',
      'Guatemala City',
      'Guayaquil',
      'Gujranwala',
      'Gustavia',
      'Gwangju',
      'Hamburg',
      'Hanoi',
      'Harare',
      'Havana',
      'Helsinki',
      'Ho Chi Minh City',
      'Hong Kong',
      'Honiara',
      'Honolulu',
      'Houston',
      'Hyderabad',
      'Hyderabad',
      'Ibadan',
      'Incheon',
      'Isfahan',
      'Islamabad',
      'Istanbul',
      'Izmir',
      'Jaipur',
      'Jakarta',
      'Jeddah',
      'Jerusalem',
      'Johannesburg',
      'Juarez',
      'Juba',
      'Kabul',
      'Kaduna',
      'Kampala',
      'Kano',
      'Kanpur',
      'Kaohsiung',
      'Karachi',
      'Karaj',
      'Kathmandu',
      'Kawasaki',
      'Kharkiv',
      'Khartoum',
      'Khulna',
      'Kigali',
      'Kingsburg',
      'Kingston',
      'Kingstown',
      'Kinshasa',
      'Kobe',
      'Kolkata',
      'Kota Bharu',
      'Kowloon',
      'Kuala Lumpur',
      'Kumasi',
      'Kuwait',
      'Kyiv',
      'Kyoto',
      'La Paz',
      'Lagos',
      'Lahore',
      'Libreville',
      'Lilongwe',
      'Lima',
      'Lisbon',
      'Ljubljana',
      'Lome',
      'London',
      'Los Angeles',
      'Luanda',
      'Lubumbashi',
      'Lusaka',
      'Luxembourg',
      'Macau',
      'Madrid',
      'Majuro',
      'Makassar',
      'Malabo',
      'Male',
      'Mamoudzou',
      'Managua',
      'Manama',
      'Manaus',
      'Manila',
      'Maputo',
      'Maracaibo',
      'Maracay',
      'Mariehamn',
      'Marigot',
      'Maseru',
      'Mashhad',
      'Mbabane',
      'Mecca',
      'Medan',
      'Medellin',
      'Medina',
      'Melbourne',
      'Mexico City',
      'Miami',
      'Minsk',
      'Mogadishu',
      'Monaco',
      'Monrovia',
      'Montevideo',
      'Montreal',
      'Moroni',
      'Moscow',
      'Mosul',
      'Multan',
      'Mumbai',
      'Muscat',
      "N'Djamena",
      'Nagoya',
      'Nairobi',
      'Nanchong',
      'Nanjing',
      'Nassau',
      'Nay Pyi Taw',
      'New York',
      'Niamey',
      'Nicosia',
      'Nouakchott',
      'Noumea',
      'Novosibirsk',
      "Nuku'alofa",
      'Nur-Sultan',
      'Nuuk',
      'Oranjestad',
      'Osaka',
      'Oslo',
      'Ottawa',
      'Ouagadougou',
      'Pago Pago',
      'Palembang',
      'Palo Alto',
      'Panama',
      'Papeete',
      'Paramaribo',
      'Paris',
      'Perth',
      'Philadelphia',
      'Phnom Penh',
      'Phoenix',
      'Podgorica',
      'Port Louis',
      'Port Moresby',
      'Port of Spain',
      'Port-Vila',
      'Port-au-Prince',
      'Porto Alegre',
      'Porto-Novo',
      'Prague',
      'Praia',
      'Pretoria',
      'Pristina',
      'Puebla',
      'Pune',
      'Pyongyang',
      'Quezon City',
      'Quito',
      'Rabat',
      'Rawalpindi',
      'Recife',
      'Reykjavik',
      'Riga',
      'Rio de Janeiro',
      'Riyadh',
      'Road Town',
      'Rome',
      'Roseau',
      "Saint George's",
      'Saint Helier',
      "Saint John's",
      'Saint Peter Port',
      'Saint Petersburg',
      'Saint-Denis',
      'Saint-Pierre',
      'Saipan',
      'Salvador',
      'San Antonio',
      'San Diego',
      'San Francisco',
      'San Jose',
      'San Juan',
      'San Marino',
      'San Salvador',
      'Sanaa',
      'Santa Cruz de la Sierra',
      'Santiago',
      'Santo Domingo',
      'Sao Paulo',
      'Sao Tome',
      'Sapporo',
      'Sarajevo',
      'Seattle',
      'Semarang',
      'Seoul',
      'Shanghai',
      'Sharjah',
      'Shenzhen',
      'Singapore',
      'Skopje',
      'Sofia',
      'South Tangerang',
      'Soweto',
      'Stockholm',
      'Sucre',
      'Surabaya',
      'Surat',
      'Suva',
      'Sydney',
      'Tabriz',
      'Taipei',
      'Tallinn',
      'Tangerang',
      'Tarawa',
      'Tashkent',
      'Tbilisi',
      'Tegucigalpa',
      'Tehran',
      'Tel Aviv',
      'Thimphu',
      'Tianjin',
      'Tijuana',
      'Tirana',
      'Tokyo',
      'Toronto',
      'Torshavn',
      'Tripoli',
      'Tunis',
      'Ulan Bator',
      'Vaduz',
      'Valencia',
      'Valletta',
      'Vancouver',
      'Victoria',
      'Vienna',
      'Vientiane',
      'Vilnius',
      'Warsaw',
      'Washington',
      'Wellington',
      'Willemstad',
      'Windhoek',
      'Wuhan',
      "Xi'an",
      'Yamoussoukro',
      'Yangon',
      'Yaounde',
      'Yekaterinburg',
      'Yerevan',
      'Yokohama',
      'Zagreb',
    ];
  }

  ngOnInit(): void {
    this.citySearch();
  }

  onSubmit() {
    this.cityName = '';
    console.log('submitted');
    this.setCityName(this.weatherInput.nativeElement.value);
  }

  getSelectedValue(event: any) {
    // Prints selected value
    console.log(event.target.value);
    this.setCityName(event.target.value);
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeather(cityName).subscribe({
      next: (response) => {
        // console.log(response.main.temp);
        this.cityName = response.name;
        this.temp = Math.floor(response.main.temp);
        this.temp_min = Math.floor(response.main.temp_min);
        this.temp_max = Math.floor(response.main.temp_max);
        this.wind = response.wind.speed;
        this.humidity = response.main.humidity;
        this.weather = response.weather[0].main;
        console.log((this.weather = response.weather[0].main));
      },
    });
  }

  @ViewChild('weatherSearchInput', { static: true }) weatherInput!: ElementRef;
  @Output() setcityNameEvent = new EventEmitter<{ name: string }>();
  city: string = '';

  citySearch() {
    // Adding keyup Event Listener on input field
    const search$ = fromEvent(this.weatherInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      // distinctUntilChanged(),
      tap(() => (this.isSearching = true)),
      switchMap((term) => (term ? this.getCities(term) : of<any>(this.cities))),
      tap(() => {
        (this.isSearching = false), (this.showSearches = true);
      })
    );

    search$.subscribe((data) => {
      this.isSearching = false;
      this.searchedCities = data;
    });
  }
  getCities(name: any): Observable<any> {
    return of(this.filterCities(name));
  }
  filterCities(name: any) {
    return this.cities.filter(
      (val: any) => val.toLowerCase().includes(name.toLowerCase()) == true
    );
  }

  setCityName(name: any) {
    console.log(name);
    this.searchedCities = this.filterCities(name);
    this.setcityNameEvent.emit({ name });
    this.weatherInput.nativeElement.value = name;
    this.showSearches = false;
    this.getWeatherData(name);
  }
}
