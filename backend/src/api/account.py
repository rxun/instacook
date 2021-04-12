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
