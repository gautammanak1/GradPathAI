import requests
import fitz  # PyMuPDF
import re
import nltk
from nltk.tokenize import sent_tokenize
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

# Download the necessary NLTK data
nltk.download('punkt')

# Models for requests and responses
class ResumeRequest(Model):
    resume_url: str

class ResumeResponse(Model):
    summary: str
    skills: list
    recommended_jobs: list
    suggestions: list
    ats_score: float

class ErrorResponse(Model):
    error: str

# Resume Analysis Agent
class ResumeAnalysisAgent(Agent):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.job_profiles = {
            "Python Developer": ["Python", "Django", "Flask"],
            "Frontend Developer": ["JavaScript", "React", "CSS"],
            "Full Stack Developer": ["Python", "JavaScript", "React", "Node.js"],
            "AI Engineer": ["Python", "AI", "NLP", "Machine Learning"]
        }

    def download_resume(self, url):
        """Download resume from the provided URL."""
        try:
            if "drive.google.com" in url:
                file_id = re.search(r'/d/([a-zA-Z0-9_-]+)', url).group(1)
                url = f"https://drive.google.com/uc?export=download&id={file_id}"
            response = requests.get(url)
            response.raise_for_status()
            return response.content
        except requests.RequestException as e:
            raise Exception(f"Failed to download resume: {e}")

    def extract_text_from_pdf(self, pdf_bytes):
        """Extract text content from the PDF file."""
        try:
            pdf_document = fitz.open("pdf", pdf_bytes)
            text = ""
            for page in pdf_document:
                text += page.get_text()
            return text
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {e}")

    def extract_skills(self, resume_text):
        """Extract skills from the resume text."""
        skills = re.findall(r'\b(Python|JavaScript|React|Node\.js|AI|NLP|Machine Learning|Django|Flask|CSS)\b', resume_text, re.IGNORECASE)
        return list(set(skills))

    def summarize_resume(self, resume_text):
        """Generate a summary of the resume."""
        sentences = sent_tokenize(resume_text)
        return " ".join(sentences[:5])

    def recommend_jobs(self, skills):
        """Recommend jobs based on extracted skills."""
        recommended_jobs = [job for job, req_skills in self.job_profiles.items() if set(req_skills).intersection(set(skills))]
        return recommended_jobs

    def calculate_ats_score(self, resume_text):
        """Calculate the ATS score based on the alignment with job profiles."""
        ats_score = 0
        total_keywords = sum(len(skills) for skills in self.job_profiles.values())
        matched_keywords = sum(1 for keyword in re.findall(r'\b\w+\b', resume_text) if keyword in self.job_profiles)
        ats_score = (matched_keywords / total_keywords) * 100
        return round(ats_score, 2)

    def suggest_resume_improvements(self, resume_text):
        """Suggest resume improvements using traditional NLP techniques."""
        suggestions = []

        # Traditional NLP example: detecting passive voice
        if "was" in resume_text or "were" in resume_text:
            suggestions.append("Consider using active voice instead of passive voice.")

        # Placeholder for more advanced suggestions
        suggestions.append("Add more details about your achievements.")

        return suggestions

    async def process_resume(self, resume_url):
        """Process the resume by downloading, extracting text, and analyzing it."""
        try:
            pdf_bytes = self.download_resume(resume_url)
            resume_text = self.extract_text_from_pdf(pdf_bytes)
            summary = self.summarize_resume(resume_text)
            skills = self.extract_skills(resume_text)
            recommended_jobs = self.recommend_jobs(skills)
            suggestions = self.suggest_resume_improvements(resume_text)
            ats_score = self.calculate_ats_score(resume_text)

            return ResumeResponse(
                summary=summary,
                skills=skills,
                recommended_jobs=recommended_jobs,
                suggestions=suggestions,
                ats_score=ats_score
            )
        except Exception as e:
            return ErrorResponse(error=f"An error occurred: {str(e)}")

# Create and configure the ResumeAnalysisAgent instance
resume_analysis_agent_instance = ResumeAnalysisAgent(
    port=8004,
    seed="Resume Analysis Agent secret phrase",
    endpoint=["http://127.0.0.1:8004/submit"]
)

# Register and fund the agent if necessary
fund_agent_if_low(resume_analysis_agent_instance.wallet.address())

# On agent startup, print the address
@resume_analysis_agent_instance.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Resume Analysis Agent Address is {resume_analysis_agent_instance.address}')

# Define the handler for resume requests
@resume_analysis_agent_instance.on_query(model=ResumeRequest, replies={ResumeResponse, ErrorResponse})
async def query_handler(ctx: Context, sender: str, msg: ResumeRequest):
    ctx.logger.info(f"Received resume URL request from {sender}: {msg.resume_url}")

    # Process the resume
    resume_response = await resume_analysis_agent_instance.process_resume(msg.resume_url)

    # Send the response back to the sender
    if isinstance(resume_response, ResumeResponse):
        ctx.logger.info(f"Sending resume analysis response to {sender}")
        await ctx.send(sender, resume_response)
    else:
        ctx.logger.error(f"Sending error response to {sender}: {resume_response.error}")
        await ctx.send(sender, resume_response)

# Starting agent
if __name__ == "__main__":
    resume_analysis_agent_instance.run()
