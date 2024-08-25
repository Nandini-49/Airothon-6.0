from openweather import *
from datetime import datetime
import csv

current_dt=datetime.timestamp(datetime.now())

severity_ref=[]

with open("code_severity.csv",mode="r") as file:

    code_severity =  csv.reader(file)

    for line in code_severity:

        severity_ref.append({"code":int(line[0]),"severity":int(line[1])})


print(severity_ref)



def weather_report(weather_info, ref):

    data=weather_info["data"][0]

    print(weather_info["data"][0]["weather"])

    messages=[]

    limits={"VFR":[10000,8000],"MVFR":[8000,5000],"IFR":[5000,0], "zero_vis": [100,0]}

    if "visibility" in data:

        vis = data["visibility"]

        for limit in limits:

            if vis <= limits[limit][0] and vis>=limits[limit][1]:

                messages.append(limit)

    else:

        messages.append("vis unknown")

    weather_desc=(data["weather"][0]["description"])

    severity=0

    weather_code=data["weather"][0]["id"]

    print(weather_code)

    for con in ref:

        if con["code"] == weather_code:

            severity = con["severity"]

    if severity == 4:

        messages.append("high risk, alternate route recommended")

    return severity, weather_desc, messages
