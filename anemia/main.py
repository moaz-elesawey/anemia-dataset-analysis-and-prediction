import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json


app = Flask(__name__)
CORS(app)

def read_model(model_name):
    with open(model_name, "rb") as f:
        model = pickle.load(f)

    return model

model = read_model("models/DecisionTree_Pipeline.pkl")

def generate_data(raw_data):
    data_df = pd.DataFrame([raw_data], 
            columns=['Gender', 'Hemoglobin', 'MCH', 'MCHC', 'MCV'])

    return data_df


def predict(raw_data):
    data_df = generate_data(raw_data)

    prediction = model.predict(data_df)
    confidance = model.predict_proba(data_df)

    return {"prediction": int(prediction[0]),
            "confidance": float(np.max(confidance)*100)}


@app.route("/api/predict", methods=["POST"])
def anemia_predict():
    data = json.loads(request.get_data())
    result = predict(data.get("data")) 

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)

