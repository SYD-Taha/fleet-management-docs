---
sidebar_position: 5
title: "Backend"
---

# Backend

# Backend Implementation in AI-Powered Real-Time Fleet Tracking and Dispatch System

## Introduction

The backend is the main part of the AI-powered real-time fleet tracking and dispatch system. It manages secure communication between drivers, vehicles and attached hardware devices (GPS, NFC, Sensors) (as discussed in hardware chapter) and ensures it works together smoothly. It also connects field data with the system’s user interface, making sure everything stays reliable and secure.

Main functions of the backend in our system includes:

- Provide secure login and role-based access.

- Assign drivers to vehicles and trips.

- Collect and process real-time GPS, NFC and sensor data.

- Generate faults and alerts.

- AI-enabled dispatch engine to optimize trip assignments.

- Integrate with hardware devices for notifications.

The backend has been built to be scalable, reliable and secure, supporting large fleets without compromising performance.

## Backend Design Overview

The AI-powered real-time fleet tracking and dispatch system’s backend works as a middle part that connects physical devices with the frontend application. It enables seamless communication, keeps data in synchronization and lets the system control all its parts.

Below are the main parts of the backend system.

1)  **Framework**\
    The backend is built using Node.js and the Express.js framework. This setup creates a quick, event-based and asynchronous environment that handles many client requests smoothly, making it great for real-time apps.

2)  **Database**\
    The system uses MongoDB, a NoSQL database hosted on MongoDB Atlas to keep and manage dynamic fleet data. The Mongoose Object Data Modeling (ODM) library is used to create data models, check data rules and connect smoothly with the database, which helps keep data consistent and reliable.

3)  **API Layer**\
    The backend offers RESTful APIs that help the hardware and the front-end dashboard talk to each other. These APIs do important tasks like getting data, storing it and updating it, which makes the exchange of information between parts organized and clear.

4)  **Real-Time Communication**\
    The MQTT protocol is used to track vehicles live. It helps with fast and low-latency communication between hardware parts like ESP32, GPS and GSM modules and the backend server. This allows for constant monitoring of fleet movements as they happen.

5)  **Business Logic**\
    This part of the system takes care of the main functions of the backend, including authentication, data parsing and AI-based dispatch management (as discussed in ai chapter). It ensures data integrity, processed right and that all parts of the system work together smoothly.

6)  **Deployment**\
    The backend is made to work cloud-ready and scalable. It supports simple setup on cloud platforms, which allows for real-time tracking, adding new features and linking with future tools for analysis or reports without affecting how well it works.

The backend integrates various components to ensure complete real-time visibility of fleet activities is shown in Figure <a href="#fig:5.1" data-reference-type="ref" data-reference="fig:5.1">1.1</a>.

<figure id="fig:5.1" data-latex-placement="H">
<img src="chapter5/figs/5.1.png" style="width:80.0%" />
<figcaption>Backend Components Overview</figcaption>
</figure>

## Backend Architecture

The backend follows a layered architectural design where each layer performs a dedicated function from hardware data collection to frontend data presentation. This structured design using a modular and scalable architecture ensures efficient data handling, real-time updates and secure communication between hardware devices and the frontend interface.

<figure id="fig:5.2" data-latex-placement="H">
<img src="chapter5/figs/5.2.png" style="width:80.0%" />
<figcaption>High-level architecture connecting frontend, Express backend, MQTT, Socket.io, ML, cache and Mongo DB</figcaption>
</figure>

The architecture includes the following layers:

- **Frontend Layer (Dashboard):** It displays real-time fleet information such as location, trip status and alerts.

- **Real-Time Communication Layer (MQTT):** It manages live updates of GPS and sensor data.

- **API Layer (Node.js):** It handles REST requests and responses between the dashboard and database.

- **Business Logic Layer:** It executes authentication, dispatch logic and data parsing operations.

- **Database Layer (MongoDB):** It stores data persistently using Mongoose ODM(Library).

- **Hardware Layer:** It comprises GPS, GSM and ESP32 modules that transmit data to the backend. (as discussed in hardware chapter)

## Technology Stack

The backend is implemented using modern and reliable technologies to ensure robustness and scalability. Table <a href="#tab:5.1" data-reference-type="ref" data-reference="tab:5.1">1.1</a> lists the technologies used and their specific purposes.

<div id="tab:5.1">

| **Technology** | **Purpose** |
|:---|:---|
| Node.js & Express.js | Runtime and web framework |
| MongoDB & Mongoose ODM | NoSQL database and ODM for structured data |
| JWT (jsonwebtoken) | Secure authentication and role-based access |
| CORS Middleware | Secure cross-origin requests |
| Web Sockets (Socket.io) (as discussed in frontend chapter) | Real-time updates for GPS, NFC, sensors, AI dispatch |
| MQTT (HiveMQ Cloud) | Messaging |
| OSRM (Open Source Routing Machine)(as discussed in chapter 7) | Routing |
| Customer Validation Utilities | Validation |

Backend Technology Stack and their purposes

</div>

Each component in Table <a href="#tab:5.1" data-reference-type="ref" data-reference="tab:5.1">1.1</a> contributes to the overall performance and reliability of the backend system.

## Code Structure

The backend codebase follows a modular structure, improving scalability and maintainability.

The structure is divided into three main components

- **Models:** It defines MongoDB data schemas and relationships using Mongoose.

- **Controllers:** It contains business logic and data processing operations.

- **Routes:** It define and manage API endpoints for frontend and hardware interaction.

This modular approach ensures readability, scalability and easier debugging.

## Entity Relationship Diagram (ERD)

The Entity Relationship Diagram (ERD) represents the logical structure of the database used in the backend. It shows how different entities such as User, Driver, Vehicle, Trip and GPS interact with each other through one-to-one and one-to-many relationships.

<figure id="fig:5.3" data-latex-placement="H">
<img src="chapter5/figs/5.3.png" style="width:80.0%" />
<figcaption>Entity Relationship Diagram (ERD)</figcaption>
</figure>

The ERD ensures data consistency and efficient relationship mapping across various backend operations.

<div id="tab:5.2">

| **Entity** | **Fields** | **Role** | **Relationships** |
|:---|:---|:---|:---|
| User | user_id, name, email, password, role_id | Stores login & profile info | One Role → Many Users |
| Role | role_id, role_name, description, permission | Access control | One Role → Many Users |
| Driver | driver_id, name, license_number, contact, assigned vehicle | Driver identity | One Driver → One Vehicle, One Driver → Many Trips |
| Vehicle | vehicle_id, vehicle_number, status, assigned_driver, assigned_device | Central entity | One Vehicle → One Driver, One Vehicle → Many Devices |
| Trip | trip_id, vehicle_id, driver_id, start_time, end_time, start_location, end_location, speed, status | Stores trip details | One Trip → One Vehicle, One Trip → One Driver |
| GPS | gps_id, vehicle_id, latitude, longitude, speed, timestamp | Tracks vehicle movement | One GPS → One Vehicle |
| Hardware Device | device_id, vehicle_id, device_type, status, installed at | GPS, NFC, sensors | One Device → One Vehicle |
| Alert | fault_id, vehicle_id, priority, solved, acknowledged by, timestamp | Stores alerts | One Alert → One Vehicle |
| Fault | Category_name, assigned_vehicle, fault_type, fault location, category, latitude, longitude, detail, reported_date, status | Stores fault | One fault → One Vehicle |

Entities, Fields and their Role and Relationships

</div>

## API Endpoints

The backend provides RESTful APIs to manage users, vehicles, trips, GPS data and dispatch operations. These APIs ensure consistent communication between the frontend application and hardware devices.

<div id="tab:5.3">

| **API** | **Function** |
|:---|:---|
| POST /api/auth/register | Register new user (authRoutes.js) |
| POST /api/auth/login | User login (authRoutes.js) |
| POST /api/users/register | Register new user (userRoutes.js) - Alternative endpoint |
| POST /api/users/login | User login (userRoutes.js) - Alternative endpoint |
| GET /api/users | Get all users (auth required) |
| GET /api/users/me | Get current user (auth required) |
| PUT /api/users/:id | Update user (auth required) |
| GET /api/vehicles | Get all vehicles (auth required in production) |
| POST /api/vehicles | Add vehicle (auth required, admin/dispatcher only) |
| PUT /api/vehicles/:id | Update vehicle (auth required in production) |
| DELETE /api/vehicles/:id | Remove vehicle (auth required, admin only) |
| POST /api/vehicles/assign-device | Assign device to vehicle (auth required, admin/dispatcher only) |
| GET /api/drivers | Get all drivers (auth required) |
| POST /api/drivers | Add driver (admin/dispatcher) |
| POST /api/drivers/assign | Assign vehicle to driver |
| GET /api/faults | Get all faults (auth required in production) |
| POST /api/faults | Report fault (auto-dispatches, auth required in production) |
| GET /api/faults/categories | Get fault categories (auth required in production) |
| POST /api/faults/categories | Add category (auth required, admin/dispatcher only) |
| POST /api/gps | Add GPS point (auth required in production) |
| GET /api/gps/latest/:vehicleId | Get latest GPS for vehicle (auth required in production) |
| GET /api/gps/track/:vehicleId | Get GPS track history for vehicle (auth required in production) |
| POST /api/dispatch/run | Run dispatch engine (auth required) |
| GET /api/trips | Get all trips (auth required) |
| POST /api/trips/start | Start trip (auth required) |
| POST /api/trips/:id/end | End trip (auth required) |
| GET /api/devices | Get all devices (auth required) |
| POST /api/devices | Register device (admin/dispatcher) |
| GET /api/routes/calculate | Calculate route between coordinates (auth required in production) |

Key API Endpoints

</div>

<figure id="fig:5.4" data-latex-placement="H">
<img src="chapter5/figs/5.4.png" style="width:80.0%" />
<figcaption>API Request Handling Flow</figcaption>
</figure>

In Figure <a href="#fig:5.4" data-reference-type="ref" data-reference="fig:5.4">1.4</a>, illustrates the end-to-end request handling flow when the frontend sends a POST request to the Fault API endpoint /api/faults. The request passes through the Express app, authentication middleware, route and controller, where input is validated, business logic is executed, data is read/written via models, and finally a JSON response is returned to the frontend to update the fault status on the UI.

## Features of Backend

The backend of the AI-Powered Real-Time Fleet Tracking and Dispatch System incorporates several core features that ensure secure, efficient and real-time system operations. These features collectively enable smooth interaction between the hardware layer, database and frontend dashboard.

- **AI Dispatch Engine:** Intelligent vehicle selection using rule-based or ML-based algorithms (as discussed in AI chapter)

- **Real-time Communication:** MQTT integration for hardware devices and Web Socket for frontend updates

- **GPS Tracking:** Real-time location tracking with route calculation

- **Automated Workflows:** Automatic trip creation, fault resolution, and status management

- **Authentication & Authorization:** JWT-based auth with role-based access control

- **Caching:** In-memory caching for performance optimization

- **Logging:** Comprehensive logging

These features collectively enhance system performance, reliability and automation. The backend ensures that all modules from authentication to dispatching operate cohesively to deliver accurate and real-time results across the entire fleet network.

## System Flow

The system flow shows the step-by-step process that the system follows to work properly. It explains how different parts of the system, like the user interface, the server side, the physical devices, the database, and the way they talk to each other, all work together to handle problems effectively.

The system is built to work on its own and responds to events as they happen.

When a problem is reported, the system takes it in, checks it using a special tool, and sends it to the best available vehicle. The system keeps in touch with the vehicle’s hardware in real time using a special communication method called MQTT. Updates about the system’s status are sent to the user interface using another method called Web Sockets. The system also keeps track of the vehicle’s location using GPS to know when it has arrived at the problem site.

To make the system easier to understand and manage, the overall process is split into smaller parts. Each part handles a specific job, like reporting a problem, sending it to the right vehicle, confirming with the driver, tracking the vehicle’s location, and solving the problem. Together, these parts help the system work smoothly, keep track of everything accurately, and handle problems quickly. The details of each part of the system are explained in the next sections, along with diagrams that show how each part works.

### Fault Reporting and Dispatch Flow

<figure id="fig:5.6" data-latex-placement="H">
<img src="chapter5/figs/5.5.png" style="width:80.0%" />
<figcaption>Workflow showing how a new fault reported through the Fault API triggers fault creation, vehicle scoring and selection, auto-dispatch and MQTT alert notification to the assigned vehicle</figcaption>
</figure>

Figure <a href="#fig:5.6" data-reference-type="ref" data-reference="fig:5.6">1.5</a> shows how a problem is added to the system and how a matching vehicle is sent out automatically using the dispatch engine.

When a problem comes from another system or someone using the system, a message is sent to the back end through the Fault Reporting API. The fault Controller gets this message and makes a new record for the problem in the database with a status of “waiting”. At the same time, any old information related to the problem is removed to keep things up to date, and a real-time event called “fault: created” is sent to update the dashboard. Once the problem is created, the system starts the process of sending out a vehicle in the background. The dispatch controller looks at all the available vehicles and uses either a set of rules or an AI system to decide which one is best. (as discussed in AI chapter) Each vehicle is given a score based on things like how well it has performed before, how tired the driver is, their experience, and how serious the problem is. The vehicle with the highest score is picked. When a good match is found, the problem’s status is changed to “pending confirmation” and the vehicle’s status is set to “on Route”.

Finally, an alert is sent to the vehicle’s device using MQTT, and a record of the alert is saved in the system.

### Driver Confirmation Flow

<figure id="fig:5.7" data-latex-placement="H">
<img src="chapter5/figs/5.6.png" style="width:80.0%" />
<figcaption>Workflow illustrating driver confirmation from the hardware device via MQTT, fault status update, trip reuse or creation and Web Socket events sent back to the frontend.</figcaption>
</figure>

Figure <a href="#fig:5.7" data-reference-type="ref" data-reference="fig:5.7">1.6</a> explains how the system handles the driver’s confirmation after they get a dispatch alert. When the driver gets the dispatch alert, they confirm the assignment using the hardware device in their vehicle. This confirmation is sent to the backend through an MQTT message on a specific topic. The mqttService listens for this message and processes it right away. Once the confirmation is received, the system finds the related vehicle and stops any active dispatch timeout. The fault status is then changed from “pending confirmation” to “assigned.” The system checks if there’s an existing trip for that vehicle. If there is, it uses that trip again. If not, it starts a new trip with details like vehicle ID, driver ID, start time, and initial location. The vehicle’s status is updated to “working,” which means the fault is being fixed.

Finally, several Web Socket events (as discussed in frontend chapter) are sent to the frontend to update the user. These events include the confirmation status, the fault update, and the change in vehicle status.

### GPS Tracking and Arrival Detection Flow

<figure id="fig:5.8" data-latex-placement="H">
<img src="chapter5/figs/5.7.png" style="width:80.0%" />
<figcaption>Workflow depicting real-time GPS updates, distance calculation, and vehicle arrival detection at fault location.</figcaption>
</figure>

This process shows how real-time GPS tracking helps know when a vehicle has reached the place where a problem is happening.

Figure <a href="#fig:5.8" data-reference-type="ref" data-reference="fig:5.8">1.7</a> shows that the device in the vehicle keeps sending GPS location information to the main system using a GPS API. The gps Controller checks these locations and saves them in a database. Old GPS data is removed, and a real-time message (vehicle:gps-update) is sent so the dashboard can show the vehicle’s current position. Once the GPS data is saved, the system checks if the vehicle is near the assigned problem spot. It figures out the distance between where the vehicle is and the problem location using special math formulas. If the vehicle is within 50 meters of the problem location, the system says the vehicle has arrived. The vehicle’s status is changed to “working” if it isn’t already, the current route is marked as done, and a timer starts for automatic resolution. A Web Socket message (vehicle:arrived) is also sent to let the main screen know the vehicle has arrived. (as discussed in frontend chapter)

### Fault Resolution Flow

<figure id="fig:5.9" data-latex-placement="H">
<img src="chapter5/figs/5.8.png" style="width:80.0%" />
<figcaption>Workflow showing fault resolution confirmation, trip completion, and vehicle status reset.</figcaption>
</figure>

This process explains how a fault is marked as fixed and how the system changes the vehicle’s status back to normal. As shown in Figure <a href="#fig:5.9" data-reference-type="ref" data-reference="fig:5.9">1.8</a>, once the issue is fixed at the location, the driver sends a message confirming the fix using a hardware device through MQTT. The mqttService gets this message and finds the related fault record. The fault is then changed to “resolved,” and the system looks for the trip that was affected. The trip is ended by setting its end time, end location, and status to “completed.” After the trip is done, the vehicle’s status is changed back to “available,” so it can be sent out again. Any trips that were started because of the fault are stopped, and the alert linked to the fault is marked as solved. Finally, the system sends updates via Web Socket to the dashboard about the fault being fixed, the vehicle being available, and the current state of the system. (as discussed in chapter of frontend)

## Security Implementation

The backend incorporates several security measures to protect user and system data. These include:

1.  **Authentication:**

    - JWT tokens for secure API access (7-day expiry).

    - Password hashing (bcrypt, 10 rounds).

2.  **Authorization**

    - Role-based authorization for different user levels.

    - Route-level protection.

3.  **Input Validation**

    - Coordinate validation

    - Email/username/password validation

    - Mongo DB injection prevention (Mongoose)

4.  **MQTT Security**

    - TLS encryption

    - Authentication required

Each mechanism collectively ensures that both data integrity and system security are maintained at all times.

## Challenges and Solutions

During the development and implementation of the AI-Powered Real-Time Fleet Tracking and Dispatch System, several technical and operational challenges were encountered. Each challenge was addressed through practical and efficient solutions to ensure the reliability and stability of the backend system.

The key challenges faced and the corresponding solutions adopted are

- **Authentication & Security:** Implemented with JWT, bcrypt, role-based access.

- **Data Validation & Consistency:** Mongoose schema validation.

- **Trip & Dispatch Management:** AI engine optimizes vehicle allocation.

- **Hardware Data Logging:** GPS, NFC, sensors logged in real-time.

- **Error Handling:** Controllers return structured errors.

- **Testing:** Postman used to validate APIs and real-time workflow.

The applied solutions effectively resolved each challenge, improving the overall robustness, accuracy and efficiency of the backend system. These measures ensured that the system performs reliably under real-time operational conditions.

## Testing and Validation

### Prototype Mode

When PROTOTYPE_MODE=true: Comprehensive testing was conducted to ensure correct functionality of the backend system. The tests included:

- Vehicles without devices can be dispatched.

- MQTT alerts are mocked (logged instead of sent) if device is missing.

- Auto-resolution timer starts when vehicle arrives at fault location (30 seconds).

- System works without physical hardware devices.

**Auto-Resolution Timer:**

- Starts when vehicle arrives within 50m of fault location

- Duration: 30 seconds

- Automatically resolves fault, completes trip, and resets vehicle status

- Works for all vehicles (with or without devices)

- Timer is cancelled if vehicle status changes away from “working”

All tests confirmed that the backend performs efficiently and responds accurately under real-time operational conditions.

## Conclusion

At the heart of the AI-driven Real-Time Fleet Tracking and Dispatch System is the back end, which securely and optimally stores data on vehicles, drivers, trips, GPS, NFC, sensors, and faults/alerts. The back end is scalable and dependable for deployment with the advantages of AI dispatch, real-time updates, and security. It offers a complete solution for fleet tracking, fault management, and analysis.
