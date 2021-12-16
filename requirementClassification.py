# coding: utf-8

import string
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
import json

def preprocessing(title, description):
    total = title + " " + description
    #lowercase
    total = total.lower()

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

    pred = {1: ['audio', 'listen', 'transcript', 'sound', 'record'],
            2: ['category', 'classify', 'content', 'identify', 'select', 'choos'],
            3: ['search', 'find', 'given', 'record', 'collect', 'data', 'input', 'inform', 'websit', 'email', 'address', 'social', 'medium'],
            4: ['transcript', 'imag', 'identify', 'inform', 'shop', 'receipt', 'enter', 'extract'],
            5: ['imag', 'tag', 'inform', 'label', 'identify', 'data'],
            6: ['survey', 'question', 'feedback', 'market', 'research', 'opinion', 'thought', 'studi'],
            7: ['write', 'transcript', 'explain', 'script', 'summary', 'word', 'creat', 'titl', 'articl', 'charact']}

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


#a_file = open("mturk-info.json", "r+")
#json_obj = json.load(a_file)

#for task in json_obj["tasks"]:
    #print('here')
#    cat = compare(preprocessing(task["title"], task["description"]))
#    task["category"] = cat

#b_file = open("mturk-info-cat.json", "w")
#json.dump(json_obj, b_file)
#a_file.close()
#b_file.close()

print(preprocessing("Answer a survey about voice assistant failures", "Voice assistants such as Siri, Alexa, and Google Assistant can fail in many different ways. Evaluate how these example failures impact your perceptions of voice assistants' abilities."))

#print(compare(preprocessing("Summary Evaluation: Consistency and Informativeness", "Evaluate whether summaries are consistent and informative to the article")))
#print(preprocessing("audio, listen, transcription, sound, recording"))
#print(preprocessing("categorize, classify, contents, identify, select, choose"))
#print(preprocessing("search, find, given, record, collect, data, input, information, website, email, address, social, media"))
#print(preprocessing("transcription, image, identify, information, shopping, receipt, enter, extract"))
#print(preprocessing("image, tag, information, label, identify, data"))
#print(preprocessing("survey, question, feedback, market, research, opinion, thought, study"))
#print(preprocessing("write, transcript, transcript, explain, script, summary, word, create, title, article, character"))
