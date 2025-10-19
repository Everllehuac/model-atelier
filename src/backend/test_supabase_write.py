from supabase import create_client
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Probar lectura ---
try:
    response = supabase.table("model_results").select("*").execute()
    print("Lectura exitosa. Datos actuales:")
    print(response.data)
except Exception as e:
    print("Error al leer:", e)

# --- Probar escritura ---
try:
    resultado = {"model": "test_model", "accuracy": 0.99}
    response = supabase.table("model_results").insert(resultado).execute()
    print("Escritura exitosa. Registro insertado:")
    print(response.data)
except Exception as e:
    print("Error al escribir:", e)
