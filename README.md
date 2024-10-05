
# Crop Analysis Backend

This repository contains the backend for the Crop Analysis application, which provides farmers with insights into crop growth and moisture management. The backend is built with Node.js and Express, and it communicates with a MongoDB database to store and retrieve crop data.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Submit crop data including crop type and seeding date.
- Retrieve ideal growth data for specified crops.
- Submit daily farmer data for moisture and height measurements.
- Provide insights through APIs to be consumed by the frontend application.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshvardhan119/Farmercropanalysis.git
 
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string and any other required environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application:**

   Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### Submit Crop Data

- **Endpoint:** `POST /submit-crop-data`
- **Request Body:**

   ```json
   {
     "cropType": "string",
     "seedingDate": "YYYY-MM-DD"
   }
   ```

- **Response:**

   ```json
   {
     "message": "Crop data submitted successfully.",
     "growthData": [
       {
         "day": 1,
         "moisture": 30,
         "height": 10
       },
       ...
     ]
   }
   ```

### Submit Farmer Data

- **Endpoint:** `POST /submit-farmer-data`
- **Request Body:**

   ```json
   {
     "day": "number",
     "moisture": "number",
     "height": "number"
   }
   ```

- **Response:**

   ```json
   {
     "message": "Farmer data submitted successfully."
   }
   ```

### Get Growth Data

- **Endpoint:** `GET /growth-data`
- **Response:**

   ```json
   {
     "growthData": [
       {
         "day": 1,
         "moisture": 30,
         "height": 10
       },
       ...
     ]
   }
   ```

## Usage

- This backend application is designed to be consumed by the Crop Analysis frontend application.
- Ensure that the frontend application makes requests to the correct API endpoints as documented above.
- Handle CORS issues by configuring the server to allow requests from your frontend's origin.

## Contributing

Contributions are welcome! If you have suggestions for improvements or additional features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Key Sections Explained:
- **Features**: Briefly describes what the backend does.
- **Installation**: Instructions on how to clone, install dependencies, set up environment variables, and run the application.
- **API Endpoints**: Details the endpoints available, including request formats and expected responses.
- **Usage**: Guidance on how the backend interacts with the frontend.
- **Contributing**: Encouragement for others to contribute to the project.
- **License**: Information about the licensing of the project.

Feel free to modify any section according to your project's specifics, especially in the API endpoints where you might need to add or remove based on your actual implementation.

![alt text](<Screenshot 2024-10-05 133848.png>)