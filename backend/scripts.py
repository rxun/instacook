from subprocess import check_call


def runserver() -> None:
    check_call(["python", "manage.py", "runserver"])

def runprod():
    check_call(["python", "manage.py", "runprod"])


def runworker():
    check_call(["python", "manage.py", "runworker"])

def format():
    check_call(["black", "api/"])
    check_call(["black", "tests/"])
    check_call(["black", "manage.py"])
    check_call(["black", "index.py"])
    check_call(["black", "scripts.py"])
