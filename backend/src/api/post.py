from flask import Blueprint, request
from src.core import create_response
from src import db

account = Blueprint("post", __name__)


@post.route('/feed')
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

@post.route('/create')
def create_post():
    req = request.get_json()

    try:
        conn = db.connect()
        query = 'INSERT INTO Post (id, title, picture, description, account_id) VALUES ("{}", "{}", "{}", "{}", "{}");'.format(req['id'], req['title'], req['picture'], req['description'], req['account_id'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)
