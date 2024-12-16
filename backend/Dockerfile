# /backend/Dockerfile

# Step 1: Use Python base image
FROM python:3.11-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install system dependencies
RUN apt-get update && apt-get install -y libpq-dev

# Step 4: Copy the requirements file
COPY backend/requirements.txt .

# Step 5: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 6: Copy the rest of the backend code
COPY . .

# Step 7: Expose the port on which the app will run
EXPOSE 8000

# Step 8: Run migrations (if using SQLite, it will create the DB file in the container)
RUN python manage.py migrate

# Step 9: Start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
