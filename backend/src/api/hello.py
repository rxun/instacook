from flask import Blueprint
from src.core import create_response


hello = Blueprint("hello", __name__)


@hello.route('/')
def get_hello():
    return create_response(message="Hello!")
