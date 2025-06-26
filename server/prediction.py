import pandas as pd
import joblib

def predict_from_input(user_input, model_path):
    # Load model and its training features
    model, feature_columns = joblib.load(model_path)

    # Convert input to DataFrame
    df = pd.DataFrame([user_input])

    # Fill and encode based on logic
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            if df[col].isnull().any():
                df[col].fillna(df[col].median(), inplace=True)
        else:
            df[col] = df[col].astype('category').cat.codes

    # Handle missing columns (that were in training)
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[feature_columns]

    prediction = model.predict(df)[0]
    return prediction
