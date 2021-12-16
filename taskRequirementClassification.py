# coding: utf-8

import string
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
import json

def preprocessing(comment):
    #lowercase
    total = comment.lower()

    #remove numbers
    total = re.sub(r'\d+', '', total)

    #remove punctuation
    #table = str.maketrans("", "", total)
    #total = total.translate(table)
    total = "".join(l for l in total if l not in string.punctuation)
    #total = total.translate(string.maketrans("",""), string.punctuation)

    #remove training whitespace
    total = total.strip()

    #tokenize
    total = word_tokenize(total)

    #remove stopwords
    filtered_total = []
    stop_words = set(stopwords.words('english'))
    for w in total:
        if w not in stop_words:
            filtered_total.append(w)

    #stemming
    print(filtered_total)
    stemmed_total = []
    stemmer = PorterStemmer()
    for word in filtered_total:
        stemmed_total.append(stemmer.stem(word))

    #lemmatization
    lemmatized_total = []
    lemmatizer=WordNetLemmatizer()
    for word in stemmed_total:
        lemmatized_total.append(lemmatizer.lemmatize(word))

    return lemmatized_total

def jaccard(list1, list2):
    intersection = len(list(set(list1).intersection(list2)))
    union = (len(list1) + len(list2)) - intersection
    return float(intersection) / union

def compare(preprocessed):
    y_true = preprocessed

    pred = {1: ['time', 'long', 'run', 'out'],
            2: ['audio', 'sound', 'video'],
            3: ['screen', 'reader', 'screenreader', 'vision', 'sight', 'image'],
            4: ['task', 'instructions', 'unclear', 'complicated', 'confusing']}

    max = 0
    ind = 1
    for p in pred:
        #print(pred[p])
        #print(y_true)
        if(jaccard(pred[p], y_true) > max):
            max = jaccard(pred[p], y_true)
            ind = p
    #print(max)
    if(max == 0):
        ind = 8

    return ind

def main(comment):
    cat = compare(preprocessing(comment))
    return cat
