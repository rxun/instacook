import logging
import sqlalchemy

from flask import Flask, request
from flask_cors import CORS

from src.core import all_exception_handler

import os
from dotenv import load_dotenv

load_dotenv()

# Referenced from PT1 Workshop 3
def init_connection_engine():
    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username=os.environ.get('MYSQL_USER'),
            password=os.environ.get('MYSQL_PASSWORD'),
            database=os.environ.get('MYSQL_DB'),
            host=os.environ.get('MYSQL_HOST')
        )
    )

    return pool

db = init_connection_engine()

class RequestFormatter(logging.Formatter):
    def format(self, record):
        record.url = request.url
        record.remote_addr = request.remote_addr
        return super().format(record)


# why we use application factories http://flask.pocoo.org/docs/1.0/patterns/appfactories/#app-factories
def create_app():
    """
    The flask application factory. To run the app somewhere else you can:
    ```
    from api import create_app
    app = create_app()

    if __main__ == "__name__":
        app.run()
    """

    app = Flask(__name__, static_folder="../../frontend/artifacts", static_url_path="")
    CORS(app)  # add CORS

    # logging
    formatter = RequestFormatter(
        "%(asctime)s %(remote_addr)s: requested %(url)s: %(levelname)s in [%(module)s: %(lineno)d]: %(message)s"
    )
    if app.config.get("LOG_FILE"):
        fh = logging.FileHandler(app.config.get("LOG_FILE"))
        fh.setLevel(logging.DEBUG)
        fh.setFormatter(formatter)
        app.logger.addHandler(fh)

    strm = logging.StreamHandler()
    strm.setLevel(logging.DEBUG)
    strm.setFormatter(formatter)

    app.logger.addHandler(strm)
    app.logger.setLevel(logging.DEBUG)

    root = logging.getLogger("core")
    root.addHandler(strm)

    # import and register blueprints
    from src.api import (
<<<<<<< HEAD
      account,
      comment
=======
      recipes,
      ingredients,
      recipe_contains,
      account
>>>>>>> 57aa8dcfd8def6f373bbff85adc8ee180c0ebb50
    )
    
    app.register_blueprint(recipes.recipes, url_prefix='/api/recipes')
    app.register_blueprint(ingredients.ingredients, url_prefix='/api/ingredients')
    app.register_blueprint(recipe_contains.recipe_contains, url_prefix='/api/recipe_contains')
    app.register_blueprint(account.account, url_prefix='/api/account')
    app.register_blueprint(comment.comment, url_prefix='/api/comment')

    # register error handlers
    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    app.register_error_handler(Exception, all_exception_handler)

    return app