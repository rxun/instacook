from flask import Blueprint, request
from src.core import create_response
from src import db
import random

ingredients = Blueprint("ingredients", __name__)


@ingredients.route('/', methods=['GET'])
def get_ingredients():
    args = request.args
    name = args.get('name')
    itype = args.get('type')

    conn = db.connect()

    query_results = None
    if name and itype:
        query_results = conn.execute(
            f"SELECT * FROM Ingredient WHERE name LIKE '%{name}%' AND type LIKE '%{itype}%' LIMIT 20;").fetchall()
    elif name:
        print('h')
        query_results = conn.execute(
            f"SELECT ingredient_id, name, type FROM Ingredient WHERE name LIKE '%{name}%' LIMIT 20;").fetchall()
        print(query_results)
    elif itype:
        query_results = conn.execute(
            f"SELECT * FROM Ingredient WHERE type LIKE '%{itype}%' LIMIT 20;").fetchall()
    else:
        query_results = conn.execute(
            "SELECT * FROM Ingredient LIMIT 20;").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@ingredients.route('/<id>', methods=['GET'])
def get_ingredient_by_id(id):
    conn = db.connect()
    query_results = conn.execute(
        f"SELECT ingredient_id, name, type FROM Ingredient WHERE ingredient_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    print(results)
    return create_response(data={'result': results})


@ingredients.route('/', methods=['POST'])
def create_ingredient():
    data = request.json
    name = data.get('name')
    itype = data.get('type')

    conn = db.connect()
    max_ingredient_id = conn.execute(
        f'SELECT MAX(ingredient_id) FROM Ingredient;').fetchall()
    new_ingredient_id = max_ingredient_id[0][0] + 1
    conn.execute(
        f'INSERT INTO Ingredient VALUES({new_ingredient_id}, \'{name}\', \'{itype}\');')
    conn.close()

    return create_response(data={'ingredient_id': new_ingredient_id})


@ingredients.route('/', methods=['PUT'])
def update_ingredient():
    data = request.json
    ingredient_id = data.get('ingredient_id')
    name = data.get('name')
    itype = data.get('type')

    conn = db.connect()

    if name and itype:
        conn.execute(
            f'UPDATE Ingredient SET name = \'{name}\', type = \'{itype}\' WHERE ingredient_id = {ingredient_id}')
    elif name:
        conn.execute(
            f'UPDATE Ingredient SET name = \'{name}\' WHERE ingredient_id = {ingredient_id}')
    elif itype:
        conn.execute(
            f'UPDATE Ingredient SET type = \'{itype}\' WHERE ingredient_id = {ingredient_id}')

    conn.close()

    return create_response()


@ingredients.route('/', methods=['DELETE'])
def delete_ingredient():
    args = request.args
    ingredient_id = args.get('ingredient_id')

    conn = db.connect()
    conn.execute(
        f'DELETE FROM Ingredient WHERE ingredient_id = {ingredient_id}')
    conn.close()

    return create_response()
