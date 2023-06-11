import smtplib
from email.mime.text import MIMEText

smtpHost = "smtp.gmail.com"
smtpPort = 587
senderAddr = "naratmalssafy@gmail.com"

def send_mail(email, fontOrgName):
    s=smtplib.SMTP(smtpHost, smtpPort)
    text = "[나랏말싸피] " + fontOrgName + " 폰트가 완성되었습니다. 사이트에 와서 확인해주세요."
    msg = MIMEText(text.encode('utf-8'), _charset='UTF-8')
    recipientAddr = email
    msg['Subject']="[나랏말싸피] " + fontOrgName + " 폰트가 완성되었습니다."
    msg['From']=senderAddr
    msg['To']=recipientAddr
    s.starttls()
    s.login(senderAddr, "saxrodkrbryydiir")
    s.sendmail(senderAddr,[recipientAddr],msg.as_string())
    s.close()