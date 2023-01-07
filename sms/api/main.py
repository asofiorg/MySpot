from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/bot", methods=["POST"])
def bot():
    incoming_msg = request.values.get("Body", "").lower()
    resp = MessagingResponse()
    msg = resp.message()

    r = requests.post("https://demo.myspot.asofi.us/api/ask", headers={ "Content-Type": "application/json" }, json={ "prompt": incoming_msg })

    if r.status_code == 200:
        data = r.json()
        msg.body(data["response"]["message"])
    else:
        msg.body("We found an error")

    return str(resp)


if __name__ == "__main__":
    app.run()