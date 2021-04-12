from flask import Blueprint
from src.core import create_response
from src import db

hello = Blueprint("hello", __name__)


@hello.route('/')
def get_hello():
    conn = db.connect()
    query_results = conn.execute("SELECT * FROM Account;").fetchall()
    conn.close()

    print("HERE: ", query_results)
    return create_response(message="Hello!")
