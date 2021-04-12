from flask import Blueprint, request, jsonify
from src.core import create_response
from src import db

post = Blueprint("post", __name__)

@post.route('/feed', methods=['GET'])
def feed():
    req = request.get_json()

    try:
        conn = db.connect()
        query = 'SELECT * FROM Post WHERE account_id="{}";'.format(req['account_id'])
        query_results = conn.execute(query).fetchall()
        conn.close()

        data = query_results[0]

        return create_response(status=200, data=data)
    except:
        return create_response(status=401)

@post.route('/create', methods=['POST'])
def create_post():
    req = request.get_json()

    try:
        conn = db.connect()
        query = 'SELECT MAX(post_id) FROM Post;'
        query_results = conn.execute(query).fetchall()
        for result in query_results:
            post_id = result[0] + 1 
        query = 'INSERT INTO Post (post_id, title, picture, description, account_id) VALUES ("{}", "{}", "{}", "{}", "{}");'.format(post_id, req['title'], req['picture'], req['description'], req['account_id'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)
