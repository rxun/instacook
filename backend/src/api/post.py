from flask import Blueprint, request, jsonify
from src.core import create_response
from src import db

post = Blueprint("post", __name__)

@post.route('/by/<id>', methods=['GET'])
def get_posts_by_account(id):
    conn = db.connect()
    print('lets get it')
    query_results = conn.execute(
        f"SELECT * FROM Post WHERE account_id = {id};").fetchall()
    print(query_results)
    
    conn.close()

    results = [dict(obj) for obj in query_results]
    print(results)
    return create_response(data={'result': results})

@post.route('/', methods=['POST'])
def create_post():
    data = request.json
    # print(data)

    try:
        conn = db.connect()
        title = data.get('title')
        picture = data.get('picture')
        description = data.get('description')
        account_id = data.get('account_id')
        recipe_id = data.get('recipe_id')

        query = 'SELECT MAX(post_id) FROM Post;'
        query_results = conn.execute(query).fetchall()
        new_post_id = 0
        for result in query_results:
            new_post_id = result[0] + 1 
        query = 'INSERT INTO Post (post_id, title, picture, description, recipe_id, account_id) VALUES ("{}", "{}", "{}", "{}", "{}", "{}");'.format(new_post_id, title, picture, description, recipe_id, account_id)
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

@post.route('/comments', methods=['GET'])
def get_post_comments():
    args = request.args
    id = args.get('id')

    conn = db.connect()
    query_results = conn.execute(
        f"SELECT * FROM Post JOIN Comment ON Post.post_id = Comment.post_id WHERE Post.post_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result':results})

@post.route('/fewest', methods=['GET'])
def get_fewest_steps_posts():
    conn = db.connect()
    query_results = conn.execute(
        f"SELECT p.title, p.description, p.account_id, LENGTH(r.steps) as stepsLength FROM Post p NATURAL JOIN Recipe r WHERE LENGTH(r.steps) < (SELECT AVG(LENGTH(steps)) as recipeAvgSteps From Recipe) ORDER BY LENGTH(r.steps) ASC LIMIT 15;"
    ).fetchall()
    print(query_results)
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


@post.route('/likes/<id>', methods=['GET'])
def get_likes_from_post_id(id):
    args = request.args
    numeric = args.get('numeric')

    conn = db.connect()
    query_results = None

    if numeric:
        query_results = conn.execute(f'''
        SELECT COUNT(*) as count
        FROM Likes L JOIN Post P ON L.account_id = P.account_id
        WHERE P.post_id = {id};
        ''')
    else:
        query_results = conn.execute(f'''
        SELECT L.like_id, A.account_id, A.username, P.post_id
        FROM (Likes L NATURAL JOIN Post P) JOIN Account A ON A.account_id = L.account_id
        WHERE P.post_id = {id};
        ''')

    conn.close()
    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results});


@post.route('/likedby/<id>', methods=['GET'])
def get_liked_posts(id):
    conn = db.connect()

    query_results = conn.execute(f'''
    SELECT P.post_id, P.title, P.description, P.picture, P.account_id, P.recipe_id
    FROM (Account A NATURAL JOIN Likes L) JOIN Post P on L.post_id = P.post_id
    WHERE A.account_id = {id}
    ''').fetchall();

    conn.close();

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results});


@post.route('/comments/<id>', methods=['GET'])
def get_comments_from_post_id(id):
    args = request.args
    numeric = args.get('numeric')

    conn = db.connect()
    query_results = None

    if numeric:
        query_results = conn.execute(f'''
        SELECT COUNT(*) as count
        FROM Comment C JOIN Post P ON C.post_id = P.post_id
        WHERE P.post_id = {id};
        ''')
    else:
        query_results = conn.execute(f'''
        SELECT C.comment_id, A.account_id, A.username, P.post_id
        FROM (Comment C NATURAL JOIN Post P) JOIN Account A ON A.account_id = C.account_id
        WHERE P.post_id = {id};
        ''')

    conn.close()
    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results});


