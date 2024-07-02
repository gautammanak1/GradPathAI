# backend/app.py
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)


@app.route('/api/jobs/<description>', methods=['GET'])
def get_jobs(description):
    try:
        # Assuming you have a job agent or API to fetch jobs
        job_agent_url = f'http://your_job_agent_address_here/{description}'
        response = requests.get(job_agent_url)
        jobs_data = [
            {'title': 'Software Engineer', 'company': 'Example Inc.'},
            {'title': 'Web Developer', 'company': 'Another Company'}
        ]
        return jsonify(jobs_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug="")
