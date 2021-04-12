from flask import Blueprint, request
from src.core import create_response
from src import db

comment = Blueprint("comment", __name__)

@comment.route('/create', methods=['POST'])
def create_comment():
    req = request.get_json()


    try:
        comment_id = 0
        conn = db.connect()
        # Find the next comment_id to use
        query = 'SELECT MAX(comment_id) FROM Comment;'
        query_results = conn.execute(query).fetchall()
        comment_id = query_results[0][0] + 1
        # Insert new comment into Comment table
        query = 'INSERT INTO Comment (comment_id, post_id, account_id, text, date_posted) VALUES ({}, {}, {}, "{}", "{}");'.format(comment_id, req['postId'], req['accountId'], req['text'], req['date'])
        conn.execute(query)
        conn.close()
        return create_response(status=200, data={'comment_id': comment_id})
    except:
        return create_response(status=400)

@comment.route('/search-comment', methods=['GET'])
def search_comment():
    text = request.args.get('text')

    conn = db.connect()
    query = 'SELECT * FROM Comment WHERE text LIKE "%%{}%%";'.format(text)
    query_results = conn.execute(query).fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})

@comment.route('/update-comment', methods=['POST'])
def update_comment():
    req = request.get_json()
    commentId = req.get('commentId')
    text = req.get('text')
    print(req)
    try:
        conn = db.connect()
        query = 'UPDATE Comment SET text="{}" WHERE comment_id={};'.format(text, commentId)
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@comment.route('/delete-comment', methods=['POST'])
def delete_comment():
    req = request.get_json()
    commentId = req.get('commentId')

    try:
        conn = db.connect()
        query = 'DELETE FROM Comment WHERE comment_id={};'.format(req['commentId'])
        conn.execute(query)
        conn.close()
        return create_response(status=200)
    except:
        return create_response(status=400)

@comment.route('/get-short-recipes', methods=['GET'])
def get_short_recipes():
    count = request.args.get('count')

    conn = db.connect()
    query = 'SELECT p.title, LENGTH(r.steps) as stepsLength FROM Post p NATURAL JOIN Recipe r WHERE LENGTH(r.steps)  < (SELECT AVG(LENGTH(steps)) as recipeAvgSteps From Recipe) ORDER BY LENGTH(r.steps) ASC LIMIT {};'.format(count)
    query_results = conn.execute(query).fetchall()
    conn.close()

    data = {}
    i = 0
    for result in query_results:
        data[i] = {
            "title": result[0],
            "steps_length": result[1]
        }
        i += 1
    return create_response(status=200, data=data)

@comment.route('/get-comment', methods=['GET'])
def get_comment():
    comment_id = request.args.get('comment_id')

    conn = db.connect()
    query = 'SELECT comment_id, text FROM Comment WHERE comment_id={}'.format(comment_id)
    query_results = conn.execute(query).fetchall()
    conn.close()

    if len(query_results):
        data = {}
        data["comment_id"] = query_results[0][0]
        data["text"] = query_results[0][1]
        return create_response(status=200, data=data)
    return create_response(status=400)