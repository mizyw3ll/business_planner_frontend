# FROM python:3.13-slim

# WORKDIR /app

# COPY pyproject.toml poetry.lock ./

# RUN pip install --no-cache-dir poetry==1.8.0
# RUN poetry config virtualenvs.create false
# RUN poetry install --no-interaction --no-root --no-dev

# COPY fastapi_application ./fastapi_application

# ENV PYTHONPATH=/app/fastapi_application

# EXPOSE 8000

# CMD ["uvicorn", "main:main_app", "--host", "0.0.0.0", "--port", "8000"]


FROM node:20.11-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
