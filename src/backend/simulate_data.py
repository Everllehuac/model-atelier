import pandas as pd
import numpy as np

def generar_datos_simulados(n=100):
    """
    Genera un DataFrame de prueba similar a un CSV subido por el usuario.
    n: número de filas
    """
    df = pd.DataFrame({
        "feature1": np.random.randint(0, 100, n),
        "feature2": np.random.rand(n) * 10,
        "feature3": np.random.choice(["A", "B", "C"], n),
        "target": np.random.randint(0, 2, n)  # ejemplo clasificación binaria
    })
    
    # Convertir columnas categóricas a números
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].astype('category').cat.codes
    
    return df
