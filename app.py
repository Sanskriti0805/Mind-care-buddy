import os
from dotenv import load_dotenv
from omnidimension.client import OmnidimClient

# ✅ Load environment variables from .env file
load_dotenv()

# ✅ Get your Omnidim API key securely
api_key = os.getenv('OMNIDIM_API_KEY')

# ✅ Initialize the Omnidim client
client = OmnidimClient(api_key=api_key)

def main():
    # Your assistant's unique ID from dashboard
    assistant_id = '2985'  # Mira's Assistant ID

    print("🌸 Welcome to Mira – Your MindCare Buddy 🌸")
    print("Type 'exit' to end the chat.\n")

    while True:
        # Ask user for input
        user_input = input("You: ")

        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye! Take care 🌼")
            break

        # Send the message to Omnidim agent
        response = client.message.create(
            agent_id=assistant_id,
            message=user_input
        )

        # Print assistant's reply
        print("Mira:", response.get('text', 'No response'))

if __name__ == "__main__":
    main()
