from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


def ask_prompt(prompt):
    response = requests.post(
        "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium",
        headers={
            "Content-Type": "application/json",
            "X-API-KEY": os.environ["WRITESONIC_API_KEY"],
        },
        data=json.dumps({
            "enable_google_results": "true",
            "enable_memory": "false",
            "input_text": prompt,
        }),
    )

    response_json = response.json()
    return response_json["message"]


@app.route("/bot", methods=["POST"])
def bot():
    incoming_msg = request.values.get("Body", "").lower()
    resp = MessagingResponse()
    msg = resp.message()

    r = ask_prompt(incoming_msg)

    if r:
        msg.body(r)
    else:
        msg.body("We found an error")

    return str(resp)


@app.route("/ask", methods=["POST"])
def ask():
    request_data = request.get_json()

    prompt = request_data["prompt"]

    r = ask_prompt(prompt)

    return {"message": r}


if __name__ == "__main__":
    app.run()
