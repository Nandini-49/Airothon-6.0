import requests
import csv
from datetime import datetime
from math import floor

airports=[]

with open("iata-icao.csv",mode="r",encoding="latin-1") as icao_file:

    for line in csv.reader(icao_file):

        airports.append(line)





sample_rt_flights_live={
    "pagination": {
        "limit": 100,
        "offset": 0,
        "count": 100,
        "total": 1669022
    },
    "data": [
        {
            "flight_date": "2019-12-12",
            "flight_status": "active",
            "departure": {
                "airport": "San Francisco International",
                "timezone": "America/Los_Angeles",
                "iata": "SFO",
                "icao": "KSFO",
                "terminal": "2",
                "gate": "D11",
                "delay": 13,
                "scheduled": "2019-12-12T04:20:00+00:00",
                "estimated": "2019-12-12T04:20:00+00:00",
                "actual": "2019-12-12T04:20:13+00:00",
                "estimated_runway": "2019-12-12T04:20:13+00:00",
                "actual_runway": "2019-12-12T04:20:13+00:00"
            },
            "arrival": {
                "airport": "Dallas/Fort Worth International",
                "timezone": "America/Chicago",
                "iata": "DFW",
                "icao": "KTUL",
                "terminal": "A",
                "gate": "A22",
                "baggage": "A17",
                "delay": 0,
                "scheduled": "2019-12-12T04:20:00+00:00",
                "estimated": "2019-12-12T04:20:00+00:00",
                "actual": None,
                "estimated_runway": None,
                "actual_runway": None
            },
            "airline": {
                "name": "American Airlines",
                "iata": "AA",
                "icao": "AAL"
            },
            "flight": {
                "number": "1004",
                "iata": "AA1004",
                "icao": "AAL1004",
                "codeshared": None
            },
            "aircraft": {
               "registration": "N160AN",
               "iata": "A321",
               "icao": "A321",
               "icao24": "A0F1BB"
            },
            "live": {
                "updated": "2019-12-12T10:00:00+00:00",
                "latitude": 36.28560000,
                "longitude": -106.80700000,
                "altitude": 8846.820,
                "direction": 114.340,
                "speed_horizontal": 894.348,
                "speed_vertical": 1.188,
                "is_ground": False
            }
        },

    ]
}

# current_dt=datetime.timestamp(datetime.now())


def get_weather(lon,lat,timestamp,key):
    # below part only for testing and demo
    anomaly=[(36,-104),(35,-104)]

    sample = {'lat': lat, 'lon': lon, 'timezone': 'America/Chicago', 'timezone_offset': -21600,
              'data': [{'dt': 1576124400, 'sunrise': 1576070445, 'sunset': 1576106532,
                        'temp': 278.97, 'feels_like': 276.25,
                        'pressure': 1029, 'humidity': 75, 'dew_point': 274.89,
                        'clouds': 75, 'visibility': 800,
                        'wind_speed': 3.6, 'wind_deg': 180,
                        'weather': [{'id': 781, 'main': 'Tornado', 'description': 'tornado', 'icon': '04n'}]}]}

    if (int(floor(lat)),int(floor(lon))) in anomaly:

        return sample
    #above part only for testing and demo
    request=f"https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={timestamp}&appid={key}"

    print(request)

    response=requests.get(request)

    if response.status_code==200:

        return response.json()

    else:

        return response.status_code

def get_coord(icao):

    for airport in airports:

        if airport[3]==icao:

            return float(airport[5]),float(airport[6])

# print(gen_report(sample_rt_flights_live["data"][0]))

# for flight in sample_rt_flights["data"]:
#
#     if flight["live"]!=None:
#
#         print(gen_report(flight))
#
#         break
# print(get_weather(152.54,-31.8886,1716139663,"d3c6844bff7a2935a9ab5b3cde1e097c"))

