from flask import Blueprint, request
from src.core import create_response
from src import db
import random

recipes = Blueprint("recipes", __name__)


@recipes.route('/', methods=['GET'])
def get_recipes():
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM Recipe LIMIT 20;").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@recipes.route('/<id>', methods=['GET'])
def get_recipe_by_id(id):
    conn = db.connect()
    query_results = conn.execute(f"SELECT recipe_id, steps FROM Recipe WHERE recipe_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@recipes.route('/', methods=['POST'])
def create_recipe():
    data = request.json
    steps = data.get('steps')

    conn = db.connect()
    max_recipe_id = conn.execute(f'SELECT MAX(recipe_id) FROM Recipe;').fetchall()
    conn.execute(f'INSERT INTO Recipe VALUES({max_recipe_id[0][0] + 1}, \'{steps}\');')
    conn.close()

    return create_response()


@recipes.route('/', methods=['PUT'])
def update_recipe():
    data = request.json
    recipe_id = data.get('recipe_id')
    steps = data.get('steps')

    conn = db.connect()
    conn.execute(
        f'UPDATE Recipe SET steps = \'{steps}\' WHERE recipe_id = {recipe_id}')
    conn.close()

    return create_response()


@recipes.route('/', methods=['DELETE'])
def delete_recipe():
    data = request.json
    recipe_id = data.get('recipe_id')

    conn = db.connect()
    conn.execute(f'DELETE FROM Recipe WHERE recipe_id = {recipe_id}')
    conn.close()

    return create_response()
