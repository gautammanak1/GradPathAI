import logging
from quart import Quart, request, jsonify
from quart_cors import cors
from uagents.query import query
from uagents import Model
import json

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Quart app
app = Quart(__name__)
app = cors(app, allow_origin="http://localhost:5173")

# Replace with your actual job agent address
job_agent_address = 'agent1qgjwsfkyhx4pgmnfnaqa7vacjrnua0wlh62q7tzf476g8lle660pjg0sm06'

# Define the job request model
class JobRequest(Model):
    job_description: str

# Define the job response model
class JobResponse(Model):
    jobs: list

@app.route('/api/jobs', methods=['POST'])
async def get_jobs():
    try:
        data = await request.json
        description = data.get('description', '')

        if not description:
            return jsonify({'error': 'Job description is required'}), 400
        
        # Query the job agent
        logger.info("Sending query to agent with description: %s", description)
        response = await query(destination=job_agent_address, message=JobRequest(job_description=description), timeout=30.0)
        
        # Extract job details from agent response
        logger.info("Received response from agent: %s", response)
        response_payload = response.json().get('payload', '{}')
        data = json.loads(response_payload)
        jobs = data.get('jobs', [])

        return jsonify(jobs)
    
    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
