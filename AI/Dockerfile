From python:3.6.13

COPY ./ ./AI/

WORKDIR ./AI/app

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

RUN pip install --use-deprecated=legacy-resolver -r requirements.txt

RUN pip install --use-deprecated=legacy-resolver -r fontmaker/requirements.txt


CMD ["uvicorn", "main:app", "--port", "18080"]
