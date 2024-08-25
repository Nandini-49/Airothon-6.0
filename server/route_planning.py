from numpy import arctan2, degrees
from math import radians, sin, cos, asin, sqrt, floor, atan2

from weather_severity import *
from datetime import datetime

# lat1, lon1 = 25.2048, 55.2708
# lat2, lon2 = 28.7041, 77.1025
# current_dt=datetime.timestamp(datetime.now())

def get_bearing(lat1, lon1, lat2, lon2):
    dLon = (lon2 - lon1)
    x = cos(radians(lat2)) * sin(radians(dLon))
    y = cos(radians(lat1)) * sin(radians(lat2)) \
        - sin(radians(lat1)) * cos(radians(lat2)) * cos(radians(dLon))
    brng = arctan2(x, y)
    brng = degrees(brng)

    return brng


def get_dist(lat1, lon1, lat2, lon2):
    """
        Calculate the great circle distance in kilometers between two points 
        on the earth (specified in decimal degrees)
        """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [float(lon1), float(lat1), float(lon2), float(lat2)])

    # haversine formula 
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers. Use 3956 for miles. Determines return value units.
    return c * r


def get_point(lat1, lon1, lat2, lon2, fraction, ang_dist):
    lon1, lat1, lon2, lat2 = map(radians, [float(lon1), float(lat1), float(lon2), float(lat2)])

    # print(lat1,lat2,lon1,lon2,fraction,ang_dist)
    a = sin((1 - fraction) * ang_dist) / sin(ang_dist)
    b = sin(fraction * ang_dist) / sin(ang_dist)
    x = a * cos(lat1) * cos(lon1) + b * cos(lat2) * cos(lon2)
    y = a * cos(lat1) * sin(lon1) + b * cos(lat2) * sin(lon2)
    z = a * sin(lat1) + b * sin(lat2)

    lat_i = degrees(atan2(z, sqrt(x ** 2 + y ** 2)))
    lon_i = degrees(atan2(y, x))
    return (lat_i, lon_i)


def find_route(lat1, lon1, lat2, lon2, vel, curr_dt):

    dist = get_dist(lat1, lon1, lat2, lon2)

    int_points = []

    num_nodes = floor(dist / 150)

    ang_dist = dist / 6371

    int_points.append({"lat": lat1, "lon": lon1, "dt": curr_dt})

    for n in range(1,num_nodes):

        int_dist = n * 150

        fraction = int_dist / dist

        coord = get_point(lat1, lon1, lat2, lon2, fraction, ang_dist)

        est_dt = int(curr_dt + floor((int_dist / vel) * 3600))

        int_points.append({"lat": coord[0], "lon": coord[1], "dt": est_dt})

    arr_est_dt= int(curr_dt + floor(((dist-(num_nodes*150)) / vel) * 3600))

    int_points.append({"lat": lat2, "lon": lon2, "dt": arr_est_dt})

    head=get_bearing(lat1,lon1,int_points[0]["lat"],int_points[0]["lon"])

    return int_points, head


def gen_live_report(flight_data):

    arr = flight_data["arrival"]

    dest_lat, dest_lon = get_coord(arr["icao"])

    arr_dt = datetime.timestamp(datetime.fromisoformat(arr["estimated"]))

    dest_weather = get_weather(float(dest_lon), float(dest_lat), int(arr_dt), "d3c6844bff7a2935a9ab5b3cde1e097c")

    if flight_data["live"]!=None:

        curr_data = flight_data["live"]

        curr_lat, curr_lon = float(curr_data["latitude"]), float(curr_data["longitude"])

        curr_dt = datetime.timestamp(datetime.fromisoformat(curr_data["updated"]))

        vel = curr_data["speed_horizontal"]

        curr_weather = get_weather(float(curr_lon), float(curr_lat), int(curr_dt), "d3c6844bff7a2935a9ab5b3cde1e097c")

    else:

        org = flight_data["departure"]

        curr_lat,curr_lon=get_coord(org["icao"])

        curr_dt = datetime.timestamp(datetime.fromisoformat(org["estimated"]))

        curr_weather = get_weather(float(curr_lon), float(curr_lat), int(curr_dt), "d3c6844bff7a2935a9ab5b3cde1e097c")

        vel = 900

    route, bearing = find_route(curr_lat, curr_lon, dest_lat, dest_lon, vel, curr_dt)

    route_report = []

    for point in route[:-1]:

        weather_info = get_weather(point["lon"], point["lat"], int(point["dt"]), "d3c6844bff7a2935a9ab5b3cde1e097c")


        report = weather_report(weather_info, severity_ref)

        route_report.append(report)

    return dest_weather, curr_weather, route, bearing, route_report

def gen_route_report(route):

    route_report=[]

    for point in route[:-1]:

        weather_info = get_weather(point["lon"], point["lat"], int(point["dt"]), "d3c6844bff7a2935a9ab5b3cde1e097c")

        report = weather_report(weather_info, severity_ref)

        route_report.append(report)

    return route_report

def adj_node(lat, lon, dist, dir):

    lat, lon = radians(lat), radians(lon)

    ang_dist = dist / 6371

    new_lat = degrees(asin(sin(lat) * cos(ang_dist) + cos(lat) * sin(ang_dist) * cos(dir)))

    new_lon = degrees(lon + atan2(sin(dir) * sin(ang_dist) * cos(lat), cos(ang_dist) - sin(lat) * sin(new_lat)))

    return new_lat,new_lon

def find_node(lat1, lon1, lat2, lon2, vel,curr_dt):

    for i in range(100):

        # dist = get_dist(lat1, lon1, lat2, lon2)

        dir = get_bearing(lat1, lon1, lat2, lon2)

        new_lat,new_lon = adj_node(lat2,lon2,i*100,(dir+90)%360)

        est_dt = int(curr_dt + 3600*floor((get_dist(lat1, lon1, new_lat, new_lon)/vel)))

        if weather_report(get_weather(new_lon,new_lat,est_dt,"d3c6844bff7a2935a9ab5b3cde1e097c"),severity_ref)[0]<4:

            return (new_lat, new_lon, est_dt)

        dir = get_bearing(lat1, lon1, lat2, lon2)

        new_lat, new_lon = adj_node(lat2, lon2, i * 100, (dir - 90) % 360)

        est_dt = int(curr_dt + 3600*floor(get_dist(lat1, lon1, new_lat, new_lon)))

        if weather_report(get_weather(new_lon, new_lat, est_dt, "d3c6844bff7a2935a9ab5b3cde1e097c"), severity_ref)[
            0] < 4:

            return (new_lat, new_lon, est_dt)

    return "no route found"

def check_route(route_report):

    hazards=[]

    for i,report in enumerate(route_report):

        if report[0]>3:

            hazards.append((report[1],i))

    return hazards

def alternate_route(route, hazards, vel,curr_dt):

    new_nodes = [(route[0]["lat"], route[0]["lon"],curr_dt)]

    for hazard in hazards:

        new_node=find_node(new_nodes[0][0],new_nodes[0][1],route[hazard[1]]["lat"], route[hazard[1]]["lon"], vel,curr_dt)

        if new_node=="no node found":

            return [],[],0

        new_nodes.append(new_node)

    new_nodes.append((route[-1]["lat"],route[-1]["lon"],"None"))

    new_route = []

    route_report=[]

    for i in range(len(new_nodes) - 1):


        start = new_nodes[i]

        end = new_nodes[i + 1]

        sub_route,_ = find_route(start[0], start[1], end[0], end[1], vel, start[2])

        sub_route_report=gen_route_report(sub_route)

        hazards = check_route(sub_route_report)


        if len(hazards)>0:

            sub_route,sub_route_report,_ = alternate_route(sub_route,hazards,vel,curr_dt)

        new_route.extend(sub_route[:-1])

        route_report.extend(sub_route_report)

    bearing = get_bearing(new_route[0]["lat"],new_route[0]["lon"],new_route[1]["lat"],new_route[1]["lon"])

    new_route.append(route[-1])

    return new_route, route_report,bearing

# def fetch_route(flight_data):
#
#     dest_weather, curr_weather, route, bearing, route_report = gen_live_report(flight_data)
#
#     print(route)
#
#     hazards = check_route(route_report)
#
#     if flight_data["live"]!="null":
#
#         vel=flight_data["live"]["speed_horizontal"]
#
#         curr_dt=datetime.timestamp(datetime.fromisoformat(flight_data["live"]["updated"]))
#
#     else:
#
#         vel = 900
#
#         curr_dt=datetime.timestamp(datetime.fromisoformat(flight_data["departure"]["estimated"]))
#
#
#     if len(hazards)>0:
#
#         new_route, route_report, bearing =alternate_route(route,hazards,vel,curr_dt)
#
#     return dest_weather, curr_weather, new_route, bearing, route_re
# port


def fetch_route(flight_data):

    dest_weather, curr_weather, route, bearing, route_report = gen_live_report(flight_data)

    # print(route)

    hazards = check_route(route_report)

    if flight_data["live"]!=None:

        vel=flight_data["live"]["speed_horizontal"]

        curr_dt=datetime.timestamp(datetime.fromisoformat(flight_data["live"]["updated"]))

    else:

        vel = 900

        curr_dt=datetime.timestamp(datetime.fromisoformat(flight_data["departure"]["estimated"]))


    if len(hazards)>0:

        route, route_report, bearing =alternate_route(route,hazards,vel,curr_dt)

        if route == []:
            # return suitable error code as an alternate path could not be found
            return 0



    return {"destination_weather": dest_weather, "current_weather": curr_weather, "route": route,
                "bearing": bearing, "route_report": route_report}

# response = fetch_route(sample_rt_flights_live["data"][0])

# print(response)


