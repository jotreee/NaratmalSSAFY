from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

import json

with open('config/mysql_conf.json') as f:
    mysql_conf = json.load(f)

HOSTNAME = mysql_conf['HOSTNAME']
PORT = mysql_conf['PORT']
USERNAME = mysql_conf['USERNAME']
PASSWORD = mysql_conf['PASSWORD']
DBNAME = mysql_conf['DBNAME']
MYSQL_URL = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DBNAME}'

Base = declarative_base()