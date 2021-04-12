from flask import Blueprint, request
from src.core import create_response
from src import db
import random

recipe_contains = Blueprint("recipe_contains", __name__)


@recipe_contains.route('/', methods=['GET'])
def get_recipe_contains():
    args = request.args
    recipe_id = args.get('recipe_id')
    ingredient_id = args.get('ingredient_id')

    conn = db.connect()
    query_results = None

    if recipe_id and ingredient_id:
        query_results = conn.execute(
            f'SELECT recipe_id, ingredient_id from RecipeContains WHERE recipe_id = {recipe_id} AND ingredient_id = {ingredient_id}')
    elif recipe_id:
        query_results = conn.execute(
            f'SELECT recipe_id, ingredient_id from RecipeContains WHERE recipe_id = {recipe_id}')
    elif ingredient_id:
        query_results = conn.execute(
            f'SELECT recipe_id, ingredient_id from RecipeContains WHERE ingredient_id = {ingredient_id}')
    else:
        query_results = conn.execute(
            "SELECT * FROM RecipeContains LIMIT 20;").fetchall()

    conn.close()

    results = [dict(obj) for obj in query_results]
    return create_response(data={'result': results})


@recipe_contains.route('/', methods=['POST'])
def create_recipe_contains():
    data = request.json
    recipe_id = data.get('recipe_id')
    ingredient_id = data.get('ingredient_id')

    conn = db.connect()
    conn.execute(
        f'INSERT INTO RecipeContains VALUES({recipe_id}, {ingredient_id});')
    conn.close()

    return create_response()


@recipe_contains.route('/', methods=['DELETE'])
def delete_recipe_contains():
    args = request.args
    recipe_id = args.get('recipe_id')
    ingredient_id = args.get('ingredient_id')

    conn = db.connect()
    conn.execute(
        f'DELETE FROM RecipeContains WHERE recipe_id = {recipe_id} AND ingredient_id = {ingredient_id};')
    conn.close()

    return create_response()
