from supabase import create_client, Client
import os
import json
from dotenv import load_dotenv

load_dotenv()  # carga variables de .env

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def guardar_registro_completo(user_id: str, datos_limpios: list, resultado_modelo: dict):
    # Guardar datos limpios
    cleaned_payload = {
        "user_id": user_id,
        "data": json.dumps(datos_limpios)
    }
    response_cleaned = supabase.table("cleaned_data").insert(cleaned_payload).execute()
    if response_cleaned.error:
        print("Error al guardar cleaned_data:", response_cleaned.error)

    # Guardar resultado del modelo
    result_payload = resultado_modelo.copy()
    result_payload["user_id"] = user_id
    response_model = supabase.table("model_results").insert(result_payload).execute()
    if response_model.error:
        print("Error al guardar model_results:", response_model.error)

    return {"cleaned_data": response_cleaned.data, "model_results": response_model.data}
