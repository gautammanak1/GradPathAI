import firebase_admin
from firebase_admin import credentials, firestore
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to fetch email addresses from Firebase
def get_email_addresses():
    users_ref = db.collection('subscribers')
    docs = users_ref.stream()
    emails = [doc.to_dict().get('email') for doc in docs]
    return emails

# Function to send emails
def send_email(to_email, content):
    sender_email = "gk596503@gmail.com"
    sender_password = "gycl sest azgy lzqp"
    
    # Create the email message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "New Job Alert!"
    msg["From"] = sender_email
    msg["To"] = to_email

    # Email content
    text_content = MIMEText(content, "plain")
    msg.attach(text_content)

    # Send the email via SMTP
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, msg.as_string())
    except smtplib.SMTPAuthenticationError as e:
        print(f"SMTP Authentication Error: {e}")
    except Exception as e:
        print(f"Error sending email: {e}")

# Updated function to notify all subscribers about a new job
def notify_subscribers(job_details):
    title = job_details.get('title', 'Unknown Title')
    company = job_details.get('company', 'Unknown Company')
    experience = job_details.get('experience', 'Experience not specified')
    job_type = job_details.get('jobType', 'Job Type not specified')
    apply_link = job_details.get('applyLink', 'No link provided')
    description = job_details.get('description', 'No description provided')
    technologies = ', '.join(job_details.get('technologies', []))
    
    content = f"""
    New Job Posting:
    
    **Title:** {title}
    **Company:** {company}
    **Experience Required:** {experience}
    **Job Type:** {job_type}
    
    **Technologies Required:** {technologies}
    
    **Job Description:**
    {description}
    
    **Apply Here:** {apply_link}
    """

    email_addresses = get_email_addresses()
    
    for email in email_addresses:
        send_email(email, content)
        print(f"Sent new job notification to {email}")

# Define the JobUpdateAgent
JobUpdateAgent = Agent(
    name="JobUpdateAgent",
    port=8008,
    seed="Job Agent secret phrase",
    endpoint=["http://127.0.0.1:8008/submit"],
)

# Register agent on Almanac and fund it if necessary
fund_agent_if_low(JobUpdateAgent.wallet.address())

# On agent startup, print the address
@JobUpdateAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'JobUpdateAgent Address is {JobUpdateAgent.address}')

    # Set up a Firestore listener to detect new job postings
    def on_snapshot(_, changes, __):
        for change in changes:
            if change.type.name == 'ADDED':
                job_data = change.document.to_dict()
                print(f"New job detected: {job_data}")
                notify_subscribers(job_data)
    
    job_ref = db.collection('jobs')
    job_ref.on_snapshot(on_snapshot)

# Starting agent
if __name__ == "__main__":
    JobUpdateAgent.run()
