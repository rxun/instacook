from flask import Blueprint, request
from src.core import create_response
from src import db

follows = Blueprint("follows", __name__)


@follows.route('/following/<id>', methods=['GET'])
def get_following_by_id(id):
    conn = db.connect()
    # print('we did it!')
    query_results = conn.execute(
        f"SELECT * FROM (Follows JOIN Account ON Follows.account2_id = Account.account_id) WHERE account1_id = {id};").fetchall()
    # print(query_results)

    conn.close()

    results = [dict(obj) for obj in query_results]
    print(results)
    return create_response(data={'result': results})


@follows.route('/followers/<id>', methods=['GET'])
def get_followers_by_id(id):
    conn = db.connect()
    print('we did it!')
    query_results = conn.execute(
        f"SELECT Follows.account1_id, Follows.account2_id, Account.profile_picture, Account.username FROM (Account JOIN Follows ON Follows.account1_id = Account.account_id) WHERE account2_id = {id};").fetchall()
    print(query_results)

    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@follows.route('/', methods=['POST'])
def follow():
    data = request.json
    follower = data.get('account1_id')
    following = data.get('account2_id')

    conn = db.connect()
    max_id = conn.execute(
        f'SELECT MAX(follow_id) FROM Follows;').fetchall()
    new_id = max_id[0][0] + 1
    conn.execute(
        f'INSERT INTO Follows VALUES({new_id}, {follower}, {following});')

    conn.close()

    return create_response(data={'follow_id': new_id})


@follows.route('/', methods=['DELETE'])
def unfollow():
    args = request.args
    follower = args.get('account1_id')
    following = args.get('account2_id')

    conn = db.connect()
    conn.execute(
        f'DELETE FROM Follows WHERE account1_id = {follower} AND account2_id = {following};')
    conn.close()

    return create_response()


@follows.route('/', methods=['GET'])
def get_follows():
    args = request.args
    follower = args.get('account1_id')
    following = args.get('account2_id')

    conn = db.connect()
    query_results = None

    if follower and following:
        query_results = conn.execute(f'''
        SELECT *
        FROM Follows
        WHERE account1_id = {follower} AND account2_id = {following};
        ''').fetchall()
    elif follower:
        query_results = conn.execute(f'''
        SELECT *
        FROM Follows
        WHERE account1_id = {follower};
        ''').fetchall()
    elif following:
        query_results = conn.execute(f'''
        SELECT *
        FROM Follows
        WHERE account2_id = {follower};
        ''').fetchall()
    else:
        query_results = conn.execute(f'''
        SELECT *
        FROM Follows
        LIMIT 20;
        ''').fetchall()

    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})
