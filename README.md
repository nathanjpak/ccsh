# Coding Challenge

An application that sends email alerts when a clinician is out of their prescribed zone.

# Assumptions

# Solution

These are the steps I considered in approaching this problem:<br>

    1. Fetch clinician data (current position and prescribed zone) from the API.

       - Send an email if there is error in polling the API.

    2. Check if current position lies in prescribed zone.
    3. Send an email if not.
    4. Repeat this at an interval (3 minutes).

For step 2, I initially tried to come up with an original solution. However, I opted for using a 3rd party library when I realized spherical geometry would be necessary.

# Libraries/Dependencies Used

- Built with Node and Typescript.
- Used Mocha and Chai for testing.
- Dotenv was used to handle environment variables.
- Axios was used to handle html requests.
- Turf was the library used to handle the point in polygon/multipolygon problem.
  - Only @turf/boolean-point-in-polygon module was used to reduce size.
- Nodemailer was used to handle sending emails.

# How to Setup

Assuming `node` and `npm` are available to use, follow these steps to run the program:<br>

    1. Clone or Fork and Clone this repo.
    2. Move to this directory in your terminal.
    3. In the terminal, run `npm install`.
    4. In the terminal, run `npm start`.
