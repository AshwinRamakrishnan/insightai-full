from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
from universal_trainer import train_model  # Correct function name here
from prediction import predict_from_input

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'models/trained_model.pkl'


@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json.get('data')
        print("🔎 Received Input:", data)

        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        prediction = predict_from_input(data, MODEL_PATH)
        return jsonify({'result': prediction})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/train', methods=['POST'])
def train():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        # Save the uploaded CSV temporarily
        csv_path = 'uploads/train.csv'
        file.save(csv_path)

        # Call universal trainer with correct function name
        train_model(csv_path)

        return jsonify({'message': '✅ Model trained successfully!'})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'❌ Training failed: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
