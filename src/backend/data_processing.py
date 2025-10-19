def limpiar_datos(df):
    # Aquí puedes poner la limpieza que quieras, por ejemplo:
    df_limpio = df.copy()
    # Ejemplo simple: rellenar NA con 0
    df_limpio.fillna(0, inplace=True)
    return df_limpio
