import json
import logging
from quart import Quart, request, jsonify
from quart_cors import cors
from firebase_admin import firestore, credentials, initialize_app
from uagents.query import query
from uagents import Model

# Initialize the Quart application
app = Quart(__name__)
app = cors(app, allow_origin="http://localhost:5173")

cred = credentials.Certificate("serviceAccountKey.json")
initialize_app(cred)
db = firestore.client()

# Update with your agents' addresses
chat_agent_address = 'agent1qwt9tcayv89rhckv3vx7676p6j4r2mxulyvdtf3t0ushzttawt5qzajrqlf'
job_agent_address = 'agent1qgjwsfkyhx4pgmnfnaqa7vacjrnua0wlh62q7tzf476g8lle660pjg0sm06'
resume_agent_address = 'agent1q2emkeqs8l38djx7tn4pm3zr58gwujsx66h8xzv3mx8gsr6hju8v2re6y3u'
email_agent_address = 'agent1qfm0255qpacatwzwdxe9equfhjn8hwsg87s3f64fajnkne4g5f69cw6we7d'
mentor_agent_address = 'agent1qwu9fppvkvxl6g4la9s533zwt7gjezvwj3r7ykjcun7lcyt9vay8crfed78'

# Define the models
class ChatbotRequest(Model):
    user_message: str

class ChatbotResponse(Model):
    bot_response: str

class JobRequest(Model):
    job_description: str

class JobResponse(Model):
    jobs: list

class ResumeRequest(Model):
    resume_url: str

class ResumeResponse(Model):
    summary: str
    skills: list
    recommended_jobs: list

class MentorRequest(Model):
    filter: str

class MentorResponse(Model):
    mentors: list

class ErrorResponse(Model):
    error: str

class NewsletterRequest(Model):
    email: str

class NewsletterResponse(Model):
    message: str

class ErrorResponse(Model):
    error: str
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
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/chat/', methods=['POST'])
async def chat_with_bot():
    try:
        data = await request.json
        user_message = data.get('user_message', '')  # Changed key to match frontend
        if not user_message:
            return jsonify({'error': 'User message is required'}), 400

        logger.info("Sending query to chat agent with user message: %s", user_message)
        response = await query(destination=chat_agent_address, message=ChatbotRequest(user_message=user_message), timeout=240.0)

        if response is None:
            raise ValueError("Received no response from the agent")

        response = json.loads(response.decode_payload())

        logger.info("Received response from chat agent: %s", response)

        if isinstance(response, dict) and 'error' in response:
            raise ValueError(response['error'])

        return jsonify({'response': response['bot_response']})

    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500

@app.route('/api/jobs/', methods=['POST'])
async def get_jobs():
    try:
        data = await request.json
        description = data.get('job_description', '')  # Changed key to match backend
        if not description:
            return jsonify({'error': 'Job description is required'}), 400

        logger.info("Sending query to job agent with description: %s", description)
        response = await query(destination=job_agent_address, message=JobRequest(job_description=description), timeout=240.0)

        if response is None:
            raise ValueError("Received no response from the agent")

        response = json.loads(response.decode_payload())

        logger.info("Received response from job agent: %s", response)

        if isinstance(response, dict) and 'error' in response:
            raise ValueError(response['error'])

        return jsonify({'jobs': response['jobs']})

    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/', methods=['POST'])
async def analyze_resume():
    try:
        data = await request.json
        resume_url = data.get('resume_url', '')
        if not resume_url:
            return jsonify({'error': 'Resume URL is required'}), 400

        logger.info("Sending query to resume agent with resume URL: %s", resume_url)
        response = await query(destination=resume_agent_address, message=ResumeRequest(resume_url=resume_url), timeout=240.0)

        if response is None:
            raise ValueError("Received no response from the agent")

        response = json.loads(response.decode_payload())

        logger.info("Received response from resume agent: %s", response)

        if isinstance(response, dict) and 'error' in response:
            raise ValueError(response['error'])

        return jsonify({
            'summary': response['summary'],
            'skills': response['skills'],
            'recommended_jobs': response['recommended_jobs']
        })

    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500

@app.route('/api/mentor/', methods=['POST'])
async def find_mentor():
    try:
        data = await request.json
        filter_criteria = data.get('filter', '')  # Corrected key
        if not filter_criteria:
            return jsonify({'error': 'Mentor filter is required'}), 400

        logger.info("Sending query to mentor agent with filter: %s", filter_criteria)
        response = await query(destination=mentor_agent_address, message=MentorRequest(filter=filter_criteria), timeout=240.0)

        if response is None:
            raise ValueError("Received no response from the agent")

        response = json.loads(response.decode_payload())

        logger.info("Received response from mentor agent: %s", response)

        if isinstance(response, dict) and 'error' in response:
            raise ValueError(response['error'])

        return jsonify({'mentors': response['mentors']})

    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500
    


    # Subscribe to the newsletter
@app.route('/api/subscribe/', methods=['POST'])
async def subscribe_newsletter():
    try:
        data = await request.json
        email = data.get('email', '')
        if not email:
            return jsonify({'error': 'Email is required'}), 400

        # Add email to Firebase
        db.collection('subscribers').add({'email': email})

        # Send the email to the agent for confirmation
        logger.info("Sending email to agent for confirmation: %s", email)
        response = await query(
            destination=email_agent_address,
            message=NewsletterRequest(email=email),
            timeout=240.0
        )

        if response is None:
            raise ValueError("Received no response from the agent")

        response = json.loads(response.decode_payload())
        logger.info("Received response from email agent: %s", response)

        if isinstance(response, dict) and 'error' in response:
            raise ValueError(response['error'])

        return jsonify({'message': 'Subscription successful!'})

    except Exception as e:
        logger.error("Error occurred: %s", e)
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/add_mentor/', methods=['POST'])
async def add_mentor():
    try:
        data = await request.json
        mentor_request = MentorAddRequest(**data)

        logger.info("Sending mentor add request to agent")
        response = await query(destination=mentor_agent_address, message=mentor_request, timeout=240.0)

        if response is None:
            raise ValueError("Received no response from the agent")

        response_data = json.loads(response.decode_payload())
        logger.info("Received response from agent: %s", response_data)

        if not response_data.get('success'):
            return jsonify({'error': response_data.get('message')}), 400

        return jsonify({'message': response_data.get('message')}), 200

    except Exception as e:
        logger.error(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# Run the Quart app
if __name__ == '__main__':
    app.run(debug=True, port=5000)