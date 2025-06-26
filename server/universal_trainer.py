import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor  # use Regressor for numeric output
import joblib

def train_model(csv_path):
    try:
        data = pd.read_csv(csv_path)

        # 1. Auto-detect target column
        possible_targets = ['target', 'label', 'class', 'data_value', 'Data_value']
        target_col = None
        for col in data.columns:
            if col.lower() in possible_targets:
                target_col = col
                break
        if target_col is None:
            target_col = data.columns[-1]  # fallback to last column

        # 2. Handle missing values in target
        if data[target_col].isnull().any():
            if pd.api.types.is_numeric_dtype(data[target_col]):
                median_val = data[target_col].median()
                data[target_col].fillna(median_val, inplace=True)
            else:
                mode_val = data[target_col].mode()
                fill_val = mode_val[0] if not mode_val.empty else 'Unknown'
                data[target_col].fillna(fill_val, inplace=True)

        # 3. Handle feature columns
        for col in data.columns:
            if col == target_col:
                continue
            if pd.api.types.is_numeric_dtype(data[col]):
                data[col].fillna(data[col].median(), inplace=True)
            else:
                mode_val = data[col].mode()
                fill_val = mode_val[0] if not mode_val.empty else 'Unknown'
                data[col].fillna(fill_val, inplace=True)
                data[col] = data[col].astype('category').cat.codes

        # 4. Split features and target
        X = data.drop(columns=[target_col])
        y = data[target_col]

        # 5. Validate cleaned data
        if X.empty or y.empty:
            return {"error": "No usable features or target data after preprocessing"}
        if y.isnull().any():
            return {"error": "Target still contains NaN values"}

        # 6. Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # 7. Train model
        model = RandomForestRegressor()
        model.fit(X_train, y_train)

        # 8. Save model and feature columns together
        feature_columns = X.columns.tolist()
        joblib.dump((model, feature_columns), 'models/trained_model.pkl')

        return {"message": "✅ Model trained and saved successfully!"}

    except Exception as e:
        return {"error": f"❌ Training failed due to: {str(e)}"}
