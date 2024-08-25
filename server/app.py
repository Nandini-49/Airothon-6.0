from flask import Flask, request, jsonify
from route_planning import fetch_route
from flask_cors import  CORS

app = Flask(__name__)
CORS(app) 

@app.route('/',methods=['GET'])
def return_home():
    return jsonify({'message':'Welcome to our API!'})
    


@app.route  ('/api/v1/getroute', methods=['POST'])
def get_route():
    data = request.get_json()
    print(data["data"][0])
    response = fetch_route(data["data"][0])
    print(response)
    return jsonify(response)  # Return the data as a JSON response

if __name__ == '__main__':
    app.run()
