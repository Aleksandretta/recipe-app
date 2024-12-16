# /frontend/Dockerfile

# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the frontend code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Expose the port on which the app will run
EXPOSE 3000

# Step 8: Start the app (for development)
CMD ["npm", "start"]
