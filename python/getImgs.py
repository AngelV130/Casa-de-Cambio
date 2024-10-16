import os
import json
import requests

# Definir la carpeta donde se guardarán las imágenes
carpeta_destino = 'banderas'
os.makedirs(carpeta_destino, exist_ok=True)

# URL de la REST Countries API
url_countries = 'https://restcountries.com/v3.1/all'

# Realizar la solicitud a la API de países
response_countries = requests.get(url_countries)

# Verificar que la solicitud fue exitosa
if response_countries.status_code == 200:
    paises = response_countries.json()
    datos_paises = []

    # Obtener las tasas de cambio
    exchange_url = 'https://open.er-api.com/v6/latest/USD'  # Cambia "USD" a "MXN" si deseas las tasas en pesos
    exchange_response = requests.get(exchange_url)
    tasas_cambio = exchange_response.json().get('rates', {})

    for pais in paises:
        # Obtener la URL de la bandera en formato PNG
        bandera_url = pais['flags']['png']
        nombre_archivo = os.path.join(carpeta_destino, f"{pais['name']['common']}.png")
        
        # Descargar la imagen
        try:
            bandera_response = requests.get(bandera_url)
            if bandera_response.status_code == 200:
                # Guardar la imagen en la carpeta destino
                with open(nombre_archivo, 'wb') as f:
                    f.write(bandera_response.content)
                print(f"Descargada: {nombre_archivo}")
            else:
                print(f"No se pudo descargar la bandera de {pais['name']['common']}")
        except Exception as e:
            print(f"Error al descargar la bandera de {pais['name']['common']}: {e}")
        
        # Obtener el nombre oficial en español
        nombre_oficial = pais.get('translations', {}).get('spa', {}).get('official', '')
        
        # Obtener información de la moneda
        monedas = pais.get('currencies', {})
        moneda_info = []

        if monedas:
            for key, info in monedas.items():
                simbolo = info.get('symbol', '')
                # Obtener el valor de la moneda en relación con el USD
                valor_en_usd = tasas_cambio.get(key, None)
                moneda_info.append({
                    'codigo': key,
                    'simbolo': simbolo,
                    'valor_en_usd': valor_en_usd
                })

        if nombre_oficial:
            # Agregar el nombre, la URL de la imagen y la moneda a la lista
            datos_paises.append({
                'nombre_oficial': nombre_oficial,
                'url_imagen': nombre_archivo,
                'monedas': moneda_info
            })

    # Guardar los datos en un archivo JSON
    with open('datos_paises.json', 'w', encoding='utf-8') as json_file:
        json.dump(datos_paises, json_file, ensure_ascii=False, indent=4)
    
    print("Nombres oficiales, URLs, y valores de moneda guardados en datos_paises.json")
else:
    print("Error al obtener la lista de países.")
