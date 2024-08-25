from collections import defaultdict, deque



class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = defaultdict(list)
        self.distances = {}
    
    def add_node(self, value):
        self.nodes.add(value)
    
    def add_edge(self, from_node, to_node, distance):
        self.edges[from_node].append(to_node)
        self.edges[to_node].append(from_node)
        self.distances[(from_node, to_node)] = distance
        self.distances[(to_node, from_node)] = distance

# Sample data
airports = {
    'JFK': {'name': 'John F. Kennedy International Airport', 'coords': (40.6413, -73.7781)},
    'LAX': {'name': 'Los Angeles International Airport', 'coords': (33.9416, -118.4085)},
    'ORD': {'name': 'O\'Hare International Airport', 'coords': (41.9742, -87.9073)},
    'ATL': {'name': 'Hartsfield-Jackson Atlanta International Airport', 'coords': (33.6407, -84.4277)},
    'DFW': {'name': 'Dallas/Fort Worth International Airport', 'coords': (32.8998, -97.0403)}
}

flights = [
    {'from': 'JFK', 'to': 'LAX', 'distance': 3983},
    {'from': 'JFK', 'to': 'ORD', 'distance': 1182},
    {'from': 'ORD', 'to': 'LAX', 'distance': 2805},
    {'from': 'JFK', 'to': 'ATL', 'distance': 1389},
    {'from': 'ATL', 'to': 'DFW', 'distance': 1181},
    {'from': 'DFW', 'to': 'LAX', 'distance': 1993}
]

# Initialize the graph
airport_graph = Graph()

# Add nodes (airports)
for airport_code in airports:
    airport_graph.add_node(airport_code)

# Add edges (flights)
for flight in flights:
    from_airport = flight['from']
    to_airport = flight['to']
    distance = flight['distance']
    airport_graph.add_edge(from_airport, to_airport, distance)

def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return [path]
    if start not in graph.edges:
        return []
    paths = []
    for node in graph.edges[start]:
        if node not in path:
            new_paths = find_all_paths(graph, node, end, path)
            for p in new_paths:
                paths.append(p)
    return paths

def calculate_path_distance(graph, path):
    distance = 0
    for i in range(len(path) - 1):
        distance += graph.distances[(path[i], path[i + 1])]
    return distance

def find_all_paths_with_distances(graph, start, end):
    paths = find_all_paths(graph, start, end)
    paths_with_distances = []
    for path in paths:
        distance = calculate_path_distance(graph, path)
        paths_with_distances.append((path, distance))
    return paths_with_distances

# Example usage
origin_airport = 'JFK'
destination_airport = 'LAX'

all_paths = find_all_paths_with_distances(airport_graph, origin_airport, destination_airport)

for path, distance in all_paths:
    print(f"Path: {path} with distance {distance} km")
