import sys
from textblob import TextBlob
import nltk

# Ensure NLTK knows where to look for data
nltk.data.path.append(r'C:\Users\User\AppData\Roaming\nltk_data')

def analyze_sentiment(content):
    analysis = TextBlob(content)
    sentiment = analysis.sentiment.polarity

    if sentiment > 0:
        print("positive")
    elif sentiment < 0:
        print("negative")
    else:
        print("neutral")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python sentiment_analysis.py <content>")
        sys.exit(1)

    content = sys.argv[1]
    analyze_sentiment(content)
