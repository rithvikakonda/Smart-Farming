import requests
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from datetime import datetime

from flask import Flask, jsonify
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)
def real_value(num):
    value = num/4095
    value*=100
    real_val = 100 - value
    return real_val
def fetch_thingspeak_data(channel_id,read_api_key,data_points_len,field):
    url = f'https://api.thingspeak.com/channels/{channel_id}/feeds.json?api_key={read_api_key}&results={data_points_len}'
    response = requests.get(url)
    data = response.json()
    feeds = data['feeds']

    # Extract the required field (assuming field1 holds the values)
    values = [float(feed[field]) for feed in feeds if feed[field] is not None]
    # values.extend([2000,2000])
    return values
# Step 2: Perform polynomial regression
def polynomial_regression(values, degree=30):
    # Create X (independent variable) as the index of the values array
    X = np.array(range(len(values))).reshape(-1, 1)  # X is the index of data points
    y = np.array(values).reshape(-1, 1)  # y is the value of the data points

    # Create polynomial features of a given degree
    poly = PolynomialFeatures(degree)
    X_poly = poly.fit_transform(X)

    # Fit polynomial regression model
    model = LinearRegression()
    model.fit(X_poly, y)

    # Predict the next value
    next_x = np.array([[len(values)]])  # Predict the next point (next index)
    next_x_poly = poly.transform(next_x)
    next_value = model.predict(next_x_poly)

    return next_value[0][0], model, poly
def get_data(field):
    channel_id = '2509744'  # Replace with your channel ID
    api_key = 'LT9UAGOSE4A5N36G'  # Replace with your read API key
    num_data_points = 50
    
    values = fetch_thingspeak_data(channel_id,api_key,num_data_points,field)
    if len(values) < 50:
        print("Not enough data points.")
    next_value, model, poly = polynomial_regression(values,10)
    return next_value

@app.route('/app/data', methods=['GET'])
def main():
    Fields = ["field1","field2","field3","field4","field5","field6",]
    dataSet = list()
    for field in Fields:
        dataSet.append(get_data(field))
    context = {
    'temperature': dataSet[0],
    'humidity' : dataSet[1],
    'co2':dataSet[2],
    'voc':dataSet[3],
    'soilMoisture':dataSet[4],
    'lightIntensity':dataSet[5]
    }
    return jsonify(context)

if __name__ == '__main__':
    app.run(debug=True)
