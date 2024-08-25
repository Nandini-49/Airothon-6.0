# Flight Route Planning and Weather Assessment

## Overview

This project provides a solution for planning flight routes while assessing weather conditions to ensure safety. The application calculates the best route between two locations and generates reports on the weather conditions along the route, advising on potential hazards and alternate routes if necessary.

## Features

- **Great Circle Route Calculation**: Computes the shortest path between two points on the Earth's surface.
- **Weather Data Integration**: Fetches real-time weather data for locations along the route.
- **Hazard Detection**: Identifies adverse weather conditions and suggests alternate routes to avoid them.
- **Crosswind Calculation**: Provides information on crosswind components for takeoff and landing.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sachin27verma/Aerothon.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Aerothon
    ```
### Route Planning

The Earth is spherical, so the shortest path between two points is an arc called the Great Circle, not a straight line on a map.

Calculation:
Uses geographic coordinates (latitude and longitude) to calculate the shortest distance, considering the Earth's curvature.
Formulae used can be seen at below link:
https://www.movable-type.co.uk/scripts/latlong.html

Benefits:
Minimizes travel distance
Reduces fuel consumption
Decreases flight time


## Error Handling

- **Weather Data Fetching**: Proper error handling is implemented to manage failures in fetching weather data from the API.
- **Adverse Weather Conditions**: If adverse weather is detected, the algorithm attempts to find a safe alternate route.

## Dependencies

- `fastapi`
- `pydantic`
- `requests`
- `numpy`
- `reactjs`

## Contributors

1. Sachin Verma.
2. Aji Jijo.
3. Nandini Gour.
4. Pabbithi Badri.
5. Sachin Pathak.

## Presentation

https://drive.google.com/file/d/1FsWGGooKVjQ9Io5tHYqSbfIi6-23OdS0/view?usp=drive_link
https://docs.google.com/presentation/d/1MiJpqk_UocqMh0T4MyvyC9ylRRlS89gXevym8yMzp68/edit?usp=drive_link
