import requests , hashlib , time, random
import json

def get_standings(api_key, api_secret, group_code, contest_id):

    rand = random.randint(0, 100000)
    rand = str(rand).zfill(6)

    current_time = str(int(time.time()))

    api_sig = f'{rand}/contest.standings?apiKey={api_key}&contestId={contest_id}&groupCode={group_code}&time={current_time}#{api_secret}'
    hash = hashlib.sha512(api_sig.encode()).hexdigest()
    
    try:
        data = requests.get(f'https://codeforces.com/api/contest.standings?groupCode={group_code}&contestId={contest_id}&apiKey={api_key}&time={current_time}&apiSig={rand+hash}').json()
    except:
        return (False, 'Failed to connect to Codeforces API')


    if data['status'] == 'FAILED':
        return (False, data['comment'])


    data = data['result']

    for problem_index in range(len(data['problems'])):
        firstAcceptedTimeSeconds = 10**10
        for row in data['rows']:
            if 'bestSubmissionTimeSeconds' in row['problemResults'][problem_index]:
                firstAcceptedTimeSeconds = min(firstAcceptedTimeSeconds, row['problemResults'][problem_index]['bestSubmissionTimeSeconds'])
        if firstAcceptedTimeSeconds == 10**10:
            continue
        for row in data['rows']:
            if 'bestSubmissionTimeSeconds' in row['problemResults'][problem_index] and row['problemResults'][problem_index]['bestSubmissionTimeSeconds'] == firstAcceptedTimeSeconds:
                row['problemResults'][problem_index]['firstAccepted'] = True
            else:
                row['problemResults'][problem_index]['firstAccepted'] = False
    
    return (True, data)

    