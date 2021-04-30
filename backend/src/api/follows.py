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
    # print(results)
    return create_response(data={'result': results})

@follows.route('/followers/<id>', methods=['GET'])
def get_followers_by_id(id):
    conn = db.connect()
    # print('we did it!')
    query_results = conn.execute(
        f"SELECT * FROM (Follows JOIN Account ON Follows.account1_id = Account.account_id) WHERE account2_id = {id};").fetchall()
    # print(query_results)
    
    conn.close()

    results = [dict(obj) for obj in query_results]
    print(results)
    return create_response(data={'result': results})