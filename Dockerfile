# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json (if exists) into the container
ADD package*.json ./

# Install application dependencies. This step is done before copying all the application files for caching purposes.
RUN npm install


# Copy the rest of the application into the container
COPY . .

# Set the API to listen on port 3000 by default

EXPOSE 4000

# Start the application using npm
CMD ["npm", "start"]
