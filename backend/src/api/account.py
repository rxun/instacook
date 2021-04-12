from flask import Blueprint, request
from src.core import create_response
from src import db

account = Blueprint("account", __name__)

@account.route('/login', methods=['POST'])
def login():
    req = request.get_json()

    conn = db.connect()
    query = 'SELECT * FROM Account WHERE username="{}" AND password="{}";'.format(req['username'], req['password'])
    query_results = conn.execute(query).fetchall()
    conn.close()

    if len(query_results) == 1:
        data = {}
        for result in query_results:
            data["username"] = result[7]
        return create_response(status=200, data=data)
    return create_response(status=401)

@account.route('/create', methods=['POST'])
def create_account():
    req = request.get_json()

    try:
        conn = db.connect()
        # Find the next account_id to use
        query = 'SELECT MAX(account_id) FROM Account;'
        query_results = conn.execute(query).fetchall()
        for result in query_results:
            account_id = result[0] + 1
        # Insert new user into Account table
        query = 'INSERT INTO Account (account_id, email, first_name, last_name, password, username) VALUES ("{}", "{}", "{}", "{}", "{}", "{}");'.format(account_id, req['email'], req['firstName'], req['lastName'], req['password'], req['username'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@account.route('/search-username', methods=['GET'])
def search_username():
    username = request.args.get('username')

    conn = db.connect()
    query = 'SELECT * FROM Account WHERE username="{}";'.format(username)
    query_results = conn.execute(query).fetchall()
    conn.close()

    if len(query_results):
        return create_response(message="Username taken")
    return create_response(message="Username available")

@account.route('/update-username', methods=['POST'])
def update_username():
    req = request.get_json()
    print(req)
    try:
        conn = db.connect()
        query = 'UPDATE Account SET username="{}" WHERE username="{}";'.format(req['newUsername'], req['oldUsername'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@account.route('/delete-account', methods=['POST'])
def delete_account():
    req = request.get_json()

    try:
        conn = db.connect()
        query = 'DELETE FROM Account WHERE username="{}";'.format(req['username'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@account.route('/get-top-likers', methods=['GET'])
def get_top_likers():
    count = request.args.get('count')

    conn = db.connect()
    query = 'SELECT topLikers.email, topLikers.username FROM (SELECT a.email, a.username, COUNT(*) as numLikes FROM Account a JOIN Likes l on a.account_id = l.account_id GROUP BY a.account_id ORDER BY numLikes DESC) topLikers LIMIT {};'.format(count)
    query_results = conn.execute(query).fetchall()
    conn.close()

    data = {}
    i = 0
    for result in query_results:
        data[i] = {
            "email": result[0],
            "username": result[1]
        }
        i += 1
    return create_response(status=200, data=data)

@account.route('/get-user', methods=['GET'])
def get_user():
    username = request.args.get('username')

    conn = db.connect()
    query = 'SELECT email, username FROM Account WHERE username="{}"'.format(username)
    query_results = conn.execute(query).fetchall()
    conn.close()

    if len(query_results):
        data = {}
        data["email"] = query_results[0][0]
        data["username"] = query_results[0][1]
        return create_response(status=200, data=data)
    return create_Response(status=400)