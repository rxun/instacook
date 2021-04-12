from flask import Blueprint, request
from src.core import create_response
from src import db

account = Blueprint("account", __name__)


@account.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')

    conn = db.connect()
    query = 'SELECT * FROM Account WHERE username={} AND password={};'.format(username, password)
    query_results = conn.execute(query).fetchall()
    conn.close()

    if len(query_results) == 1:
        data = {}
        for result in query_results:
            data["username"] = result[7]
        return create_response(status=200, data=data)
    return create_Response(status=401)
