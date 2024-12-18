# /backend/Dockerfile

# Step 1: Use Python base image
FROM rockylinux:9

# Step 2: Set the working directory in the container
WORKDIR /app/backend

# Step 3: Install system dependencies
RUN dnf install -y python3 python3-pip gcc libpq-devel

# Step 4: Copy the requirements file
#COPY backend/backend/requirements.txt /app/backend/requirements.txt

RUN pip install --upgrade pip

# Step 5: Install Python dependencies
COPY backend/ /app/backend/

RUN pip install --no-cache-dir -r backend/requirements.txt

# Step 6: Copy the rest of the backend code
#COPY backend/ /app/backend/

# Step 7: Expose the port on which the app will run
EXPOSE 8000

# Step 8: Run migrations (if using SQLite, it will create the DB file in the container)
#RUN python3 manage.py migrate

# Step 9: Start the Django app
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
