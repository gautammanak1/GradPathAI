import firebase_admin
from firebase_admin import credentials, firestore
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import logging

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Define the mentor request model
class MentorAddRequest(Model):
    name: str
    company: str
    tagLine: str
    description: str
    picture: str
    linkedIn: str
    twitter: str
    calendly: str
    email: str

# Define the response model
class MentorResponse(Model):
    success: bool
    message: str

# Define the Mentor Agent
MentorAgent = Agent(
    name="MentorAgent",
    port=8007,
    seed="Mentor Agent secret phrase"
)

# Fund the agent
fund_agent_if_low(MentorAgent.wallet.address())

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# On agent startup, print the address
@MentorAgent.on_event('startup')
async def agent_details(ctx: Context):
    logger.info(f'Mentor Agent Address is {MentorAgent.address}')

# Handle mentor add requests
@MentorAgent.on_query(model=MentorAddRequest, replies={MentorResponse})
async def query_handler(ctx: Context, sender: str, msg: MentorAddRequest):
    try:
        mentor_data = {
            'name': msg.name,
            'company': msg.company,
            'tagLine': msg.tagLine,
            'description': msg.description,
            'picture': msg.picture,
            'linkedIn': msg.linkedIn,
            'twitter': msg.twitter,
            'calendly': msg.calendly,
            'email': msg.email,
            'postedAt': firestore.SERVER_TIMESTAMP
        }
        db.collection('mentors').add(mentor_data)
        logger.info(f"Added mentor: {mentor_data}")
        await ctx.send(sender, MentorResponse(success=True, message="Mentor added successfully!"))
    except Exception as e:
        logger.error(f"Error adding mentor: {e}")
        await ctx.send(sender, MentorResponse(success=False, message=f"Failed to add mentor: {str(e)}"))

# Start the agent
if __name__ == "__main__":
    MentorAgent.run()
