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

# Function to send an email
def send_email(to_email, subject, html_content):
    sender_email = "gk596503@gmail.com"
    sender_password = "gycl sest azgy lzqp"
    
    # Create the email message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    # Attach HTML content
    msg.attach(MIMEText(html_content, "html"))

    # Send the email via SMTP
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, msg.as_string())
    except smtplib.SMTPAuthenticationError as e:
        print(f"SMTP Authentication Error: {e}")
    except Exception as e:
        print(f"Error sending email: {e}")

# Function to send "Thank you for subscribing" email
def send_thank_you_email(email):
    subject = "🎉 Thank you for subscribing to Job Alerts!"
    html_content = """
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333333; text-align: center;">Welcome to Job Alerts!</h2>
                <p style="color: #555555; line-height: 1.6;">
                    Thank you for subscribing to our job alerts. You'll now receive notifications for the latest job postings. Stay tuned!
                </p>
            </div>
        </body>
    </html>
    """
    send_email(email, subject, html_content)

# Updated function to send job notifications
def send_job_notification(email, job_details):
    subject = "🚀 New Job Alert!"
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333333; text-align: center;">🎉 New Job Posting!</h2>
                <p style="color: #555555; line-height: 1.6;">
                    <strong>Title:</strong> {job_details['title']}<br>
                    <strong>Company:</strong> {job_details['company']}<br>
                    <strong>Experience Required:</strong> {job_details['experience']}<br>
                    <strong>Job Type:</strong> {job_details['jobType']}<br>
                    <strong>Technologies Required:</strong> {job_details['technologies']}<br>
                </p>
                <p style="color: #555555; line-height: 1.6;">
                    <strong>Job Description:</strong><br>
                    {job_details['description']}
                </p>
                <p style="text-align: center;">
                    <a href="{job_details['applyLink']}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
                        Apply Now
                    </a>
                </p>
                <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin-top: 20px;">
                    You received this email because you subscribed to job alerts. If you no longer wish to receive these emails, please unsubscribe.
                </p>
            </div>
        </body>
    </html>
    """
    send_email(email, subject, html_content)

# Function to notify all subscribers about a new job
def notify_subscribers(job_details):
    job_details['technologies'] = ', '.join(job_details.get('technologies', []))
    
    email_addresses = get_email_addresses()
    
    for email in email_addresses:
        send_job_notification(email, job_details)
        print(f"Sent new job notification to {email}")

# To keep track of already notified jobs
notified_jobs = set()

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
                job_id = change.document.id
                if job_id not in notified_jobs:
                    print(f"New job detected: {job_data}")
                    notify_subscribers(job_data)
                    notified_jobs.add(job_id)
    
    job_ref = db.collection('jobs')
    job_ref.on_snapshot(on_snapshot)

# Function to handle new subscription
def handle_new_subscription(email):
    send_thank_you_email(email)
    print(f"Sent 'Thank you for subscribing' email to {email}")

# Starting agent
if __name__ == "__main__":
    JobUpdateAgent.run()
