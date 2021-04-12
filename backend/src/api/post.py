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

@post.route('/', methods=['POST'])
def create_post():
    data = request.json
    print(data)

    try:
        conn = db.connect()
        title = data.get('title')
        picture = data.get('picture')
        description = data.get('description')
        account_id = data.get('account_id')

        query = 'SELECT MAX(post_id) FROM Post;'
        query_results = conn.execute(query).fetchall()
        new_post_id = 0
        for result in query_results:
            new_post_id = result[0] + 1 
        query = 'INSERT INTO Post (post_id, title, picture, description, account_id) VALUES ("{}", "{}", "{}", "{}", "{}");'.format(new_post_id, title, picture, description, account_id)
        conn.execute(query)
        conn.close()
        return create_response(data={'post_id':new_post_id})
    except:
        return create_response(status=400)

@post.route('/', methods=['GET'])
def get_posts():
    args = request.args
    keyword = args.get('keyword')

    # try:
    conn = db.connect()
    if keyword:
        print(f"SELECT * FROM Post WHERE title LIKE '%%{keyword}%%' LIMIT 20;")
        query_results = conn.execute(
            f"SELECT * FROM Post WHERE title LIKE '%%{keyword}%%'LIMIT 20;").fetchall()
        # print(query_results)
    else:
        query_results = conn.execute("SELECT * FROM Post LIMIT 20;").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})
    # except:
    #     return create_response(status=400)

@post.route('/<id>', methods=['GET'])
def get_post_by_id(id):
    conn = db.connect()
    query_results = conn.execute(
        f"SELECT * FROM Post WHERE post_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result':results})

@post.route('/', methods=['PUT'])
def update_post():
    data = request.json
    print(data)
    
    try:
        post_id = data.get('post_id')
        title = data.get('title')
        picture = data.get('picture')
        description = data.get('description')

        conn = db.connect()
        conn.execute(
            f'UPDATE Post SET title = \'{title}\', picture = \'{picture}\', description=\'{description}\' WHERE post_id = {post_id}')
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@post.route('/', methods=['DELETE'])
def delete_post():
    data = request.args
    post_id = data.get('post_id')

    conn = db.connect()
    conn.execute(
        f'DELETE FROM Post WHERE post_id = {post_id}')
    conn.close()

    return create_response()