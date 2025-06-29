from dotenv import load_dotenv
import os
from omnidimension import Client

load_dotenv()  # load .env

api_key = os.getenv('OMNIDIM_API_KEY')
client = Client(api_key)

agents = client.agent.list()
print(agents)
