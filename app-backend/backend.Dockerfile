FROM python:3.11-slim

WORKDIR /app-backend

COPY app-backend/api/requirements.txt .

RUN python -m venv venv && 
RUN venv/bin/pip install --upgrade pip 
RUN venv/bin/pip install -r appbackend/api/requirements.txt

# Copy application code
COPY appbackend/ .

ENV PATH="/app/venv/bin:$PATH"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
