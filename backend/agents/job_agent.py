import os
import requests
from pydantic import Field
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

# Define the job request model
class JobRequest(Model):
    job_description: str = Field(description="Give details of job you are looking for")

# Define the response model
class Response(Model):
    jobs: list

# Function to get job details from the external API
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

# Register agent on Almanac and fund it if necessary
fund_agent_if_low(agent.wallet.address())

# Define the handler for job requests
@agent.on_query(model=JobRequest, replies=Response)
async def query_handler(ctx: Context, sender: str, msg: JobRequest):
    try:
        details = await get_job_details(msg.job_description, rapidapi_key)
        if 'error' in details:
            raise Exception(details['message'])
        
        # Prepare jobs response
        jobs = []
        for detail in details:
            job_title = detail.get('job_title', 'No title available')
            company_name = detail.get('company_name', 'No company name available')
            location = detail.get('location', 'No location available')
            salary = detail.get('salary', 'No salary information available')
            summary = detail.get('summary', 'No summary available')
            job_date = detail.get('date', 'Just posted')

            job_data = {
                "title": job_title,
                "company": company_name,
                "location": location,
                "salary": salary,
                "summary": summary,
                "date": job_date
            }
            jobs.append(job_data)

        await ctx.send(sender, Response(jobs=jobs))
        ctx.logger.info(f"Job details for {msg.job_description}: {jobs}")
    
    except Exception as e:
        ctx.logger.error(f"An error occurred while fetching job details: {e}")
        await ctx.send(sender, Response(jobs=[]))  # Send empty response on error

# On agent startup, print the address
@agent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Job Agent Address is {agent.address}')

# Starting agent
if __name__ == "__main__":
    agent.run()
