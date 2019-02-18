#!/bin/bash

#
# copied from https://glitch.com/~python3
#
MD5=$(md5sum .requirements.txt | cut -f1 -d' ')
if ! [ -d ".local/lib/python3/$MD5-site-packages" ]; then
    rm -rf .local/lib/python3/*-site-packages
    pip3 install -U -r .requirements.txt -t ".local/lib/python3/$MD5-site-packages" 
fi
exec env PYTHONPATH="$PWD/.local/lib/python3/$MD5-site-packages" python3 backend/main.py
