FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY ./dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
