import firebase_admin
from firebase_admin import credentials, firestore
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import logging

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

# Define the job registration model
class JobAddRequest(Model):
    title: str
    company: str
    location: str
    description: str
    technologies: str
    employmentType: str
    applyLink: str
    name: str
    email: str
    mobile: str
    logo: str
    salaryPackage: str = 'Negotiable'
    experience: str
    jobType: str
    jobCategory: str
    postedAt: str

# Define the response model
class JobResponse(Model):
    success: bool
    message: str

# Define the Job Agent
JobAddAgent = Agent(
    name="JobUpdateAgent",
    port=8011,
    seed="New Job Agent secret phrase",
    endpoint=["http://127.0.0.1:8011/submit"],
)


# Fund the agent
fund_agent_if_low(JobAddAgent.wallet.address())

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# On agent startup, print the address
@JobAddAgent.on_event('startup')
async def agent_details(ctx: Context):
    logger.info(f'Job Add Agent Address is {JobAddAgent.address}')

# Handle job add requests
@JobAddAgent.on_query(model=JobAddRequest, replies={JobResponse})
async def query_handler(ctx: Context, sender: str, msg: JobAddRequest):
    try:
        job_data = {
            'title': msg.title,
            'company': msg.company,
            'location': msg.location,
            'description': msg.description,
            'technologies': msg.technologies,
            'employmentType': msg.employmentType,
            'applyLink': msg.applyLink,
            'name': msg.name,
            'email': msg.email,
            'mobile': msg.mobile,
            'logo': msg.logo,
            'salaryPackage': msg.salaryPackage,
            'experience': msg.experience,
            'jobType': msg.jobType,
            'jobCategory': msg.jobCategory,
            'postedAt': firestore.SERVER_TIMESTAMP
        }
        db.collection('jobs').add(job_data)
        logger.info(f"Added job: {job_data}")
        await ctx.send(sender, JobResponse(success=True, message="Job added successfully!"))
    except Exception as e:
        logger.error(f"Error adding job: {e}")
        await ctx.send(sender, JobResponse(success=False, message=f"Failed to add job: {str(e)}"))

# Start the agent
if __name__ == "__main__":
    JobAddAgent.run()
