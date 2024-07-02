import os
import json
import requests
from bs4 import BeautifulSoup
from elasticsearch import Elasticsearch
import pandas as pd
# import openpyxl
import dotenv


class VisaIndexer:
    def __init__(self, index_name, index_config_file, excel_file):
        dotenv.load_dotenv()
        self.index_name = index_name
        self.index_config_file = index_config_file
        self.excel_file = excel_file
        self.es_client = self.setup_elasticsearch()

    def setup_elasticsearch(self):
        """
        Configura la conexión con Elasticsearch y crea un índice a partir de un archivo de configuración.
        
        Returns:
        Elasticsearch: El cliente de Elasticsearch configurado.
        """
        es_client = Elasticsearch(
            [{'host': 'localhost', 'port': 9200, 'scheme': 'http'}],
            basic_auth=("elastic", os.getenv('ELASTICSEARCH_PASSWORD'))
        )
        try:
            with open(self.index_config_file) as f:
                index_body = json.load(f)
            es_client.options(ignore_status=[400, 404]).indices.delete(
                index=self.index_name)
            es_client.indices.create(index=self.index_name, body=index_body)
            return es_client
        except Exception as e:
            print(f"Error setting up Elasticsearch index: {e}")
            return None

    def fetch_and_parse_url(self, url):
        """
        Descarga el contenido de una URL y lo parsea, eliminando elementos innecesarios.
        
        Args:
        url (str): La URL a descargar y parsear.
        
        Returns:
        BeautifulSoup: El contenido parseado.
        """

        # Configurar los headers para simular una petición de postman
        headers = {
            "User-Agent": "PostmanRuntime/7.39.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive"
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            for script in soup(['script', 'style']):
                script.decompose()
            for element in soup(['header', 'footer', 'nav']):
                element.decompose()
            return soup
        except requests.RequestException as e:
            print(f"Error fetching URL {url}: {e}")
            return None

    def row_to_json(self, row):
        """
        Convierte una fila de un DataFrame a un documento JSON para Elasticsearch.
        
        Args:
        row (pd.Series): La fila del DataFrame a convertir.
        
        Returns:
        dict: El documento JSON.
        """
        url = row['URL']
        soup = self.fetch_and_parse_url(url)
        content = soup.get_text(separator="\n", strip=True) if soup else ""

        return {
            "title": row['Title'],
            "destination_country": row['Destination Country'],
            "country_code": row['Country Code'],
            "categories": row['Categories'],
            "processing_time": row['Processing Time'],
            "processing_fee": row['Processing Fee (USD)'],
            "visa_duration": row['Visa Duration'],
            "extension_possibility": row['Possibility of Extension'],
            "evisa_availability": row['E-visa Availability'],
            "type_of_visa": row['Type of Visa'],
            "capital_required": row['Monetary Capital Required(USD)'],
            "url": url,
            "content": content
        }

    def index_documents(self):
        """
        Lee el archivo Excel y indexa los documentos en Elasticsearch.
        """
        if not self.es_client:
            print("Failed to setup Elasticsearch. Exiting.")
            return

        # Leer el archivo Excel
        df = pd.read_excel(self.excel_file, na_values=[],
                           keep_default_na=False)
        df.columns = [col.strip() for col in df.columns]

        for i, row in df.iterrows():
            document = self.row_to_json(row)
            try:
                self.es_client.index(index=self.index_name,
                                     id=row["URL"], document=document)
            except Exception as e:
                print(f"Error indexing document {row['URL']}: {e}")

        print("Indexing complete.")


def main():
    indexer = VisaIndexer(
        index_name="visas", index_config_file="index_config.json", excel_file="Visas2.xlsx")
    indexer.index_documents()


if __name__ == "__main__":
    main()
