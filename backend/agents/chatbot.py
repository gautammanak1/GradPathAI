import requests
import json
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

# Define the chatbot request model
class ChatbotRequest(Model):
    user_message: str

# Define the chatbot response model
class ChatbotResponse(Model):
    bot_response: str

# Define the error response model
class ErrorResponse(Model):
    error: str

# Function to get chatbot response from the external API
def get_chatbot_response(user_message):
    url = "https://chatgpt-42.p.rapidapi.com/chatbotapi"
    
    payload = {
        "bot_id": "mYBqlle97bJAZPFBr5Vz7SuSfKWKbIqnFud172262784722vIhkXrUuoK2Qsy4fMJRe1QZdgO7LKzy02n1",
        "messages": [
            {
                "role": "user",
                "content": user_message
            }
        ],
        "user_id": "101607969342539364833-user",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "model": "gpt 3.5"
    }
    
    headers = {
        "x-rapidapi-key": "cf5c0e8526mshf9862937a0971b1p1b74dfjsn0f328599cc88",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e), "response": response.text if response else "No response"}

# Define the ChatbotAgent
ChatbotAgent = Agent(
    name="ChatbotAgent",
    port=8003,
    seed="Chatbot Agent secret phrase",
    endpoint=["http://127.0.0.1:8003/submit"],
)

# Register agent on Almanac and fund it if necessary
fund_agent_if_low(ChatbotAgent.wallet.address())

# On agent startup, print the address
@ChatbotAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Chatbot Agent Address is {ChatbotAgent.address}')

# Define the handler for chatbot requests
@ChatbotAgent.on_query(model=ChatbotRequest, replies={ChatbotResponse, ErrorResponse})
async def query_handler(ctx: Context, sender: str, msg: ChatbotRequest):
    try:
        ctx.logger.info(f"Received user message: {msg.user_message}")
        
        # Get chatbot response
        response = get_chatbot_response(msg.user_message)
        
        # Log the full response for debugging
        ctx.logger.info(f"Full response from API: {response}")

        # Check if the response contains an error
        if "error" in response:
            error_message = response["error"]
            ctx.logger.error(f"Error from API: {error_message}")
            await ctx.send(sender, ErrorResponse(error=error_message))
            return
        
        # Extract bot response
        bot_response = response.get("result", "I didn't get that.")
        
        # Send chatbot response
        ctx.logger.info(f"Chatbot response: {bot_response}")
        await ctx.send(sender, ChatbotResponse(bot_response=bot_response))

    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        ctx.logger.error(error_message)
        await ctx.send(sender, ErrorResponse(error=error_message))

# Starting agent
if __name__ == "__main__":
    ChatbotAgent.run()