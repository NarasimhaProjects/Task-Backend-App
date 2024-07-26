# Use the official Node.js image as the base image
FROM node:20

#Set the working directory in the container
WORKDIR /app

#Copy the application files into the working directory
COPY . /app

EXPOSE 8000
# Define the entry point for the container
CMD ["npm", "start"]
