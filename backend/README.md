# Configuración del backend

## Docker Compose

Para ejecutar la aplicación utilizando Docker Compose, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
2. Navega al directorio raíz del proyecto.
3. Abre una terminal y ejecuta el siguiente comando:
   
```
docker-compose up -d --build
```

Esto iniciará los contenedores necesarios y desplegará la aplicación.

## Obtener la Contraseña de Elastic

Para obtener la contraseña de Elastic, que necesita ser configurada como una variable de entorno en la carpeta `visa-indexer`, sigue estos pasos:

1. Accede a la instancia de Elastic que se está ejecutando en el contenedor de Docker.
2. Recupera la contraseña de los archivos de configuración de Elastic.
3. Copia la contraseña y navega a la carpeta `visa-indexer`.
4. Configura la contraseña como una variable de entorno en el archivo correspondiente.

## Ejecutar el Indexador


Para ejecutar el indexador, sigue estos pasos:

1. Navega a la carpeta `visa-indexer`.
2. Abre una terminal y ejecuta el siguiente comando, para instalar las dependencias necesarias:
   
```
pip install -r requirements.txt
```

3. Ejecuta el indexador con el siguiente comando:

```
python main.py
```
