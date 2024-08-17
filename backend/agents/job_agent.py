import json
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

# Define the job request model
class JobRequest(Model):
    job_description: str

# Define the response model
class JobResponse(Model):
    jobs: list

# Define the error response model
class ErrorResponse(Model):
    error: str

# Function to get job details from the JSON file
def get_job_details(job_role):
    with open('job.json', 'r') as file:
        data = json.load(file)
        return [job for job in data if job_role.lower() in job.get('position', '').lower()]

# Define the JobAgent
JobAgent = Agent(
    name="JobAgent",
    port=8002,
    seed="Job Agent secret phrase",
    endpoint=["http://127.0.0.1:8002/submit"],
)

# Register agent on Almanac and fund it if necessary
fund_agent_if_low(JobAgent.wallet.address())

# On agent startup, print the address
@JobAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Job Agent Address is {JobAgent.address}')

# Define the handler for job requests
@JobAgent.on_query(model=JobRequest, replies={JobResponse, ErrorResponse})
async def query_handler(ctx: Context, sender: str, msg: JobRequest):
    try:
        ctx.logger.info(f"Received job request: {msg.job_description}")
        
        details = get_job_details(msg.job_description)
        
        if not details:
            raise Exception("No job details found.")
        
        # Prepare jobs response
        jobs = []
        for detail in details:
            job_data = {
                "company": detail.get('company', 'No company name available'),
                "website": detail.get('website', 'No website available'),
                "position": detail.get('position', 'No position available'),
                "job_link": detail.get('job_link', 'No job link available'),
                "location": detail.get('location', 'No location available'),
                "work_type": detail.get('work_type', 'No work type available'),
                "date_posted": detail.get('date_posted', 'Just posted')
            }
            jobs.append(job_data)

        ctx.logger.info(f"Job details sent for {msg.job_description}: {jobs}")
        await ctx.send(sender, JobResponse(jobs=jobs))

    except Exception as e:
        error_message = f"An error occurred while fetching job details: {e}"
        ctx.logger.error(error_message)
        await ctx.send(sender, ErrorResponse(error=str(error_message)))

# Starting agent
if __name__ == "__main__":
    JobAgent.run()
