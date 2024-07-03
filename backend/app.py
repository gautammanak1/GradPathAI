from flask import Flask, json, jsonify, request
from flask_cors import CORS
from uagents.query import query
from uagents import Model

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes


job_agent_address = 'agent1qgjwsfkyhx4pgmnfnaqa7vacjrnua0wlh62q7tzf476g8lle660pjg0sm06'  # Update with your job agent's address

# Define Request and Response Models using uagents.Model

class JobRequest(Model):
    job_description: str

class JobResponse(Model):
    jobs: str

# Route for getting job listings
@app.route('/api/jobs/<description>', methods=['GET'])
def get_jobs(description):
    try:
        response = query(destination=job_agent_address, message=JobRequest(job_description=description), timeout=15.0)
        data = json.loads(response.decode_payload())
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
