# /backend/Dockerfile

FROM rockylinux:9

WORKDIR /app/backend

RUN dnf install -y python3 python3-pip gcc libpq-devel

RUN pip install --upgrade pip

COPY backend/ /app/backend/

RUN pip install --no-cache-dir -r backend/requirements.txt

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
