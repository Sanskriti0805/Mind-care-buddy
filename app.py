import os
from dotenv import load_dotenv
from omnidimension.client import OmnidimClient

# Load environment variables
load_dotenv()

api_key = os.getenv('OMNIDIM_API_KEY')
client = OmnidimClient(api_key=api_key)

def main():
    # Example: Start a conversation with your agent
    assistant_id = 'your_assistant_id_here'  # replace with real one
    user_input = "Hi, I have been feeling very anxious lately."
    
    response = client.message.create(
        agent_id=assistant_id,
        message=user_input
    )
    
    print("Assistant:", response.get('text', 'No response'))

if __name__ == "__main__":
    main()
