FROM python:3-alpine3.21

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN adduser -D appuser
USER appuser


CMD ["python", "app.py"]
