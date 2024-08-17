import json
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

# Define the mentor request model
class MentorRequest(Model):
    filter: str

# Define the response model
class MentorResponse(Model):
    mentors: list

# Define the error response model
class ErrorResponse(Model):
    error: str

# Function to get mentor details from the JSON file
def get_mentor_details(filter_criteria):
    with open('mentor.json', 'r') as file:
        data = json.load(file)
        return [mentor for mentor in data if filter_criteria.lower() in mentor.get('skills', '').lower()]

# Define the MentorAgent with updated address and server
MentorAgent = Agent(
    name="MentorAgent",
    port=8007,  # Updated port
    seed="Mentor Agent secret phrase",
    endpoint=["http://127.0.0.1:8007/submit"],  # Updated endpoint
)

# Register agent on Almanac and fund it if necessary
fund_agent_if_low(MentorAgent.wallet.address())

# On agent startup, print the address
@MentorAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Mentor Agent Address is {MentorAgent.address}')

# Define the handler for mentor requests
@MentorAgent.on_query(model=MentorRequest, replies={MentorResponse, ErrorResponse})
async def query_handler(ctx: Context, sender: str, msg: MentorRequest):
    try:
        ctx.logger.info(f"Received mentor request: {msg.filter}")
        
        details = get_mentor_details(msg.filter)
        
        if not details:
            raise Exception("No mentor details found.")
        
        # Prepare mentors response
        mentors = []
        for detail in details:
            mentor_data = {
                "name": detail.get('name', 'No name available'),
                "title": detail.get('title', 'No title available'),
                "experience": detail.get('experience', 'No experience available'),
                "skills": detail.get('skills', 'No skills available'),
                "description": detail.get('description', 'No description available'),
                "profile_link": detail.get('profile_link', 'No profile link available'),
                "profile_picture": detail.get('profile_picture', 'No profile picture available'),
                "book_call_link": detail.get('book_call_link', 'No book call link available')
            }
            mentors.append(mentor_data)

        ctx.logger.info(f"Mentor details sent for filter {msg.filter}: {mentors}")
        await ctx.send(sender, MentorResponse(mentors=mentors))

    except Exception as e:
        error_message = f"An error occurred while fetching mentor details: {e}"
        ctx.logger.error(error_message)
        await ctx.send(sender, ErrorResponse(error=str(error_message)))

# Starting agent
if __name__ == "__main__":
    MentorAgent.run()
