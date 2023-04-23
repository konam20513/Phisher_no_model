from heapq import nlargest
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from spacy.lang.en.stop_words import STOP_WORDS

app = Flask(__name__)

CORS(app, origins='chrome-extension://ekdkdcknogcieleaaalbcljgacmpnemk', supports_credentials=True, methods=['POST', 'GET'])

stopwords = list(STOP_WORDS)
nlp = spacy.load('en_core_web_sm')

def get_summarySpacy(article, summary_length=0.3):
    from string import punctuation
    doc = nlp(article)
    punctuation += '/n'
    word_freq = {}

    # Finding word frequency
    for word in doc:
        if word.text.lower() not in stopwords:
            if word.text.lower() not in punctuation:
                if word.text not in word_freq.keys():
                    word_freq[word.text] = 1
                else:
                    word_freq[word.text] += 1
    max_freq = max(word_freq.values())

    # Finding weighted frequencies of occurrence
    for word in word_freq.keys():
        word_freq[word] = word_freq[word] / max_freq
    sentence_tokens = [sentence for sentence in doc.sents]
    sent_scores = {}

    # Calculate sentence scores
    for sent in sentence_tokens:
        for word in sent:
            if word.text.lower() in word_freq.keys():
                if sent not in sent_scores.keys():
                    sent_scores[sent] = word_freq[word.text.lower()]
                else:
                    sent_scores[sent] += word_freq[word.text.lower()]

    # Summary
    select_len = int(len(sentence_tokens) * summary_length)
    summary = nlargest(select_len, sent_scores, key=sent_scores.get)
    return summary[0]


@app.route('/')
def index():
    return "Hello!!"


@app.route('/checkPhishing', methods=['POST'])
def check_phishing():
    return jsonify({'result':'malicious'})

@app.route('/summarizeEmail', methods=['POST'])
def summarize():
    data = request.get_json()
    email_content = data.get('email', '')
    summary_length = data.get('summary_length', 0.3)

    if not email_content:
        return jsonify({'error': 'Invalid email content'}), 400

    summary = get_summarySpacy(email_content, summary_length)
    return jsonify(summary)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'chrome-extension://ekdkdcknogcieleaaalbcljgacmpnemk')
  return response


if __name__ == '__main__':
    app.run(debug=True)