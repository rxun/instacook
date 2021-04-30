from flask import Blueprint, request
from src.core import create_response
from src import db
import random

recipes = Blueprint("recipes", __name__)


@recipes.route('/', methods=['GET'])
def get_recipes():
    args = request.args
    keyword = args.get('keyword')

    try:
        conn = db.connect()
        if keyword:
            query_results = conn.execute(
                f'SELECT recipe_id, steps FROM Recipe WHERE steps LIKE \'%%{keyword}%%\' LIMIT 20;').fetchall()
        else:
            query_results = conn.execute(
                "SELECT * FROM Recipe LIMIT 20;").fetchall()
        conn.close()

        results = [dict(obj) for obj in query_results]
        return create_response(data={'result': results})
    except:
        return create_response(status=400)


@recipes.route('/<id>', methods=['GET'])
def get_recipe_by_id(id):
    conn = db.connect()
    query_results = conn.execute(
        f"SELECT recipe_id, steps FROM Recipe WHERE recipe_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@recipes.route('/', methods=['POST'])
def create_recipe():
    data = request.json
    steps = data.get('steps')

    conn = db.connect()
    max_recipe_id = conn.execute(
        f'SELECT MAX(recipe_id) FROM Recipe;').fetchall()
    new_recipe_id = max_recipe_id[0][0] + 1
    conn.execute(
        f'INSERT INTO Recipe VALUES({new_recipe_id}, \'{steps}\');')
    conn.close()

    return create_response(data={'recipe_id': new_recipe_id})


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
    args = request.args
    recipe_id = args.get('recipe_id')

    conn = db.connect()
    conn.execute(f'DELETE FROM Recipe WHERE recipe_id = {recipe_id}')
    conn.close()

    return create_response()

@recipes.route('/ingredients', methods=['GET'])
def get_ingredients():
    args = request.args
    id = args.get('id')

    conn = db.connect()
    query_results = conn.execute(
        f"SELECT i.name FROM Recipe r JOIN RecipeContains rc ON r.recipe_id = rc.recipe_id JOIN Ingredient i ON rc.ingredient_id = i.ingredient_id WHERE r.recipe_id = {id};").fetchall()
    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})