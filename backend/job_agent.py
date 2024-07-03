import requests
import os
from pydantic import Field
from uagents import Agent, Context, Model
from ai_engine import UAgentResponse, UAgentResponseType
from uagents.setup import fund_agent_if_low

class JobRequest(Model):
    job_description: str = Field(description="Give details of job you are looking for")

# Function to get job details from the API
async def get_job_details(job_role, rapidapi_key):
    url = "https://indeed11.p.rapidapi.com/"
    payload = {
        "search_terms": job_role,
        "location": "United States",
        "page": "1"
    }
    headers = {
        'x-rapidapi-key': rapidapi_key,
        'x-rapidapi-host': "indeed11.p.rapidapi.com",
        'Content-Type': "application/json"
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.status_code, "message": response.text}

# Hardcoded values for job role and RapidAPI key
job_role = "Software Engineer, Web Developer, Sales, AI Engineer, Community Manager, HR"
rapidapi_key = os.getenv('911d4d6013mshe47e761d58e4b09p11e35djsn88fd7c2d401c')  # Ensure your RapidAPI key is set in environment variables

# Define the agent
agent = Agent(
    name="JobAgent",
    port=8002,
    seed="Job Agent secret phrase",
    endpoint=["http://127.0.0.1:8002/submit"],
)

# Registering agent on Almanac and funding it
fund_agent_if_low(agent.wallet.address())

# Define the handler for job requests
@agent.on_query(model=JobRequest, replies={UAgentResponse})
async def load_job(ctx: Context, sender: str, msg: JobRequest):
    ctx.logger.info(f"Received job request: {msg.job_description}")
    
    if not callable(get_job_details):
        ctx.logger.error("get_job_details is not a callable function.")
        message = "Internal error: get_job_details function is not defined correctly."
        await ctx.send(sender, UAgentResponse(message=message, type=UAgentResponseType.FINAL))
        return

    try:
        details = await get_job_details(msg.job_description, rapidapi_key)
        if 'error' in details:
            raise Exception(details['message'])
            
        ctx.logger.info(f"Job details for {msg.job_description}: {details}")
        message = ""
        for detail in details:
            job_url = detail.get('url', 'No URL available')
            job_title = detail.get('job_title', 'No title available')
            company_name = detail.get('company_name', 'No company name available')
            location = detail.get('location', 'No location available')
            salary = detail.get('salary', 'No salary information available')
            summary = detail.get('summary', 'No summary available')
            job_date = detail.get('date', 'Just posted')

            message += (f"<a href='{job_url}'>{job_title}</a> - {job_date}\n"
                        f"Company: {company_name}\n"
                        f"Location: {location}\n"
                        f"Salary: {salary}\n"
                        f"Summary: {summary}\n\n")
    except Exception as e:
        ctx.logger.error(f"An error occurred while fetching job details: {e}")
        message = f"An unexpected error occurred: {e}"

    await ctx.send(sender, UAgentResponse(message=message, type=UAgentResponseType.FINAL))

# On agent startup, print the address
@agent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Job Agent Address is {agent.address}')

# Starting agent
if __name__ == "__main__":
    agent.run()
