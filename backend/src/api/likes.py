from flask import Blueprint, request
from src.core import create_response
from src import db
import random

likes = Blueprint("likes", __name__)

@likes.route('/', methods=['GET'])
def get_likes():
  return create_response();

@likes.route('/', methods=['POST'])
def create_like():
    data = request.json
    account_id = data.get('account_id')
    post_id = data.get('post_id')

    conn = db.connect()
    max_id = conn.execute(
        f'SELECT MAX(like_id) FROM Likes;').fetchall()
    new_id = max_id[0][0] + 1
    conn.execute(
        f'INSERT INTO Likes VALUES({new_id}, {account_id}, {post_id});')
    conn.close()

    return create_response(data={'like_id': new_id})


@likes.route('/', methods=['DELETE'])
def delete_like():
    args = request.args
    account_id = args.get('account_id')
    post_id = args.get('post_id')

    conn = db.connect()
    conn.execute(
        f'DELETE FROM Likes WHERE account_id = {account_id} AND post_id = {post_id};')
    conn.close()

    return create_response()

