from flask import Flask, redirect, render_template , session, flash, request
from flask_session import Session

from functions import *
app = Flask(__name__)


app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = 'This Is Some Secret Key, Change It To Something Else'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'memory'



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')

    api_key = request.form.get('api_key')
    api_secret = request.form.get('api_secret')
    group_code = request.form.get('group_code')
    contest_id = request.form.get('contest_id')

    init_data = get_standings(api_key, api_secret, group_code, contest_id)
    if(not init_data[0]):
        flash(init_data[1])
        return redirect('/')
    
    session['api_key'] = api_key
    session['api_secret'] = api_secret
    session['group_code'] = group_code
    session['contest_id'] = contest_id
    return redirect('/standings')
        

@app.route('/standings')
def standings():
    api_key = session.get('api_key')
    api_secret = session.get('api_secret')
    group_code = session.get('group_code')
    contest_id = session.get('contest_id')

    data = get_standings(api_key, api_secret, group_code, contest_id)
    if(not data[0]):
        flash(data[1])
        return redirect('/')
    
    return render_template('standings.html', data=data[1])



if __name__ == '__main__':
    app.run(debug=True)