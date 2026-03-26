FROM python:3.11-slim AS builder

WORKDIR /app

COPY api/requirements.txt .
RUN python -m venv venv 
RUN venv/bin/pip install --upgrade pip 
RUN venv/bin/pip install -r api/requirements.txt

FROM python:3.11-slim
WORKDIR /app

COPY --from=builder /app/venv venv
COPY . .

ENV PATH="/app/venv/bin:$PATH"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
