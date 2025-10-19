from fastapi import FastAPI
from simulate_data import generar_datos_simulados
from data_processing import limpiar_datos
from model import entrenar_modelo
from supabase_client import guardar_registro_completo

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend corriendo"}

@app.post("/procesar")
def procesar_datos(user_id: str, n: int = 100):
    # 1️⃣ Generar datos
    df = generar_datos_simulados(n)

    # 2️⃣ Limpiar datos
    df_limpio = limpiar_datos(df)

    # 3️⃣ Entrenar modelo
    accuracy = entrenar_modelo(df_limpio)

    # 4️⃣ Guardar en Supabase
    datos_limpios_list = df_limpio.to_dict(orient="records")
    resultado_modelo = {"model": "SimpleNN", "accuracy": accuracy}
    guardar_registro_completo(user_id, datos_limpios_list, resultado_modelo)

    return {
        "message": "Datos procesados y guardados correctamente",
        "accuracy": accuracy,
        "datos_limpios": datos_limpios_list[:5]  # solo muestra 5 filas
    }
