import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings

def send_email(to_email: str, subject: str, body: str):
    """
    This function sends an email to the user.
    It's like sending a letter but through the internet!
    We use SMTP which is a protocol for sending emails.
    """
    # First, we create the email message
    msg = MIMEMultipart()
    msg['From'] = 'noreply@eventhub.com'  # This is who the email is from
    msg['To'] = to_email  # This is who the email goes to
    msg['Subject'] = subject  # The title of the email

    # Attach the body of the email
    msg.attach(MIMEText(body, 'plain'))

    # Now, we need to connect to the email server
    # For this example, we'll use Gmail's SMTP server
    # But in real life, you'd use your own email service
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)  # Connect to Gmail
        server.starttls()  # Start secure connection
        # Login to the email account
        # NOTE: In real code, don't hardcode passwords! Use environment variables
        server.login('your-email@gmail.com', 'your-password')
        text = msg.as_string()  # Convert message to string
        server.sendmail('noreply@eventhub.com', to_email, text)  # Send the email
        server.quit()  # Close the connection
        print("Email sent successfully!")  # Tell us it worked
    except Exception as e:
        print(f"Failed to send email: {e}")  # If something goes wrong, tell us