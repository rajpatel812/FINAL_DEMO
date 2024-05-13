from django.core.mail import EmailMessage
import os

class Utils:

    @staticmethod
    def send_mail(data):
        email = EmailMessage(
            subject = data['subject'],
            body = data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            # from_email='pande.amul.dcs24@vnsgu.ac.in',
            to=[data['to_email']]
        )
        email.send()