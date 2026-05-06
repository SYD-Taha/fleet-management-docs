---
sidebar_position: 8
title: "Vehicle Simulator"
---

# Vehicle Simulator

# Vehicle Simulator

## Introduction

Vehicle Simulation is a software-based system that behaves like real vehicle. It sends fake GPS location and updates to the Fleet Management System which are similar to real vehicles. Rather than employing actual vehicles with hardware devices, such as GPS trackers in cars, this software simulator can perform full system testing on a pc.

## What It Does

The simulator works in following manner:

- Sends GPS location updates every 3 seconds (pretending to be a vehicle moving)

- Checks backend server every 5 seconds to see if there’s new work to do

- Moves vehicles along calculated routes on maps

- Publishes location and status updates through MQTT (a messaging system) (as discussed in Chapter 4 Backend Implementation)

- Talks to the backend server through API calls (like sending messages)

- Calculates travel routes automatically

- Simulates work time at each location

## Main Uses (Why Do We Need It?)

- Test how the dispatch system works without buying real vehicles

- Show customers how the fleet tracking system looks and works

- Use software instead of ESP32/Arduino devices

- Integration Testing: Test if the dispatch engine sends work correctly

- Train team members how the system works

- No need for real vehicles or expensive GPS hardware to test

## Technology Used

The Vehicle Simulator uses these technologies:

- Runtime: Node.js

- HTTP Communication: Axios library for API calls

- MQTT Messaging: mqtt v5.3.0 for GPS and status publishing (as discussed in Chapter 4 Backend Implementation)

- Configuration: dotenv for environment variables

## System Architecture

<figure id="fig:7.1" data-latex-placement="H">
<img src="chapter8/figs/8.1.png" style="width:90.0%" />
<figcaption>Architecture of system which shows how the vehicle simulator communicates with the backend, MQTT broker, and routing services to manage vehicle movement.</figcaption>
</figure>

This diagram shows the overall architecture of the vehicle simulator and how it interacts with the backend, MQTT broker, and routing service. The Node.js vehicle simulator uses an API client to talk to the backend REST APIs, an MQTT publisher to send GPS and status messages to the MQTT broker, and a routing service that calculates OSRM routes with a Haversine fallback when OSRM is not available.

## Main Components

### Vehicle Simulator (Main Controller)

This is the brain of the system.

Responsibilities:

- Manages all vehicles

- Moves vehicles step by step

- Sends GPS every 3 seconds

- Checks for new dispatches every 5 seconds

- Detects arrival and completion of work

Each vehicle stores

- Current location

- Speed and direction

- Status (available, onRoute, working)

- Assigned fault

### API Client (Backend Communication)

It connects with the backend server.

It is used to:

- Fetch vehicles

- Send GPS data

- Update vehicle status

- Get assigned faults

It also supports: Auto login, Token handling, Retry on errors

### MQTT Publisher

MQTT is used to simulate real hardware communication. (as discussed in Chapter 4)

It sends:

- GPS updates

- Vehicle status updates

- Work completion messages (forwarded to the frontend via WebSocket, as discussed in the Frontend chapter)

Automatically reconnects if the MQTT connection is lost.

MQTT Topics: vehicle/{number}/gps, vehicle/{number}/status, vehicle/{number}/resolved

### Routing Service

This service calculates routes between two points.

Routing methods:

1.  OSRM (Primary): Calculating routes using OSRM (Open Source Routing Machine) as the primary method.

2.  Haversine (Fallback): Using the Haversine formula as a fallback when OSRM is unavailable.

It also:

- Caches routes for 5 minutes

- Calculates distance, duration, and waypoints

## Vehicle Status Flow

Each vehicle changes status automatically:

available → onRoute → working → available

Description:

- **Available:** The vehicle is idle and ready to receive a new assignment.

- **OnRoute:** The vehicle is traveling to the assigned fault location.

- **Working:** The vehicle has reached the location and is performing the assigned task.

After completing the work, the vehicle status is reset to available, making it ready for the next assignment.

## System Workflow

### Initialization Workflow

<figure id="fig:7.2" data-latex-placement="H">
<img src="chapter8/figs/8.2.png" style="width:90.0%" />
<figcaption>Initialization Workflow Auto Login, MQTT Connection, Vehicle Fetch and State Setup</figcaption>
</figure>

This explains the initialization workflow where the simulator automatically logs in, connects to MQTT (as discussed in Chapter 4), and prepares its internal state. APIClient.AutoLogin obtains an authentication token, MQTTPublisher connect establishes the MQTT connection, APIClient.GetVehicles fetches all vehicles, and the simulator initializes each vehicle’s state such as GPS position and status, using either backend GPS data or a default depot location.

### Dispatch Detection Workflow

<figure id="fig:7.3" data-latex-placement="H">
<img src="chapter8/figs/8.3.png" style="width:90.0%" />
<figcaption>The simulator periodically detects new dispatch work, validates each assignment, and calculates a route to put the selected vehicle on route.</figcaption>
</figure>

This represent how the simulator periodically detects new dispatch work and decides whether and how to accept and route each fault. Every 5 seconds, the simulator calls APIClient.GetDispatchedFaults, filters faults in pending confirmation or assigned status, matches them to its vehicles, skips already processed or invalid ones, validates coordinates, checks route cache, calculates a route via RoutingService.CalculateRoute (using OSRM with Haversine fallback), and then updates the backend vehicle status to onRoute when a valid route is obtained.

### GPS Movement Workflow

<figure id="fig:7.4" data-latex-placement="H">
<img src="chapter8/figs/8.4.png" style="width:90.0%" />
<figcaption>GPS Movement Workflow, Vehicle Position Update, Publishing and Arrival Check (Every 3 Seconds)</figcaption>
</figure>

In this workflow, the simulator moves each vehicle step by step along its planned route. The route is made of waypoints, and every 3 seconds the vehicle jumps from one waypoint to the next. At each step, the simulator sets the vehicle’s new latitude and longitude from the current waypoint and calculates its speed and direction, for example using speed of 40 km/h. It then sends this GPS data out in two ways: as a GPS message through MQTT (MQTTPublisher.publishGPS) (described in Chapter 4) and as a GPS update to the backend API (APIClient.sendGPS). After sending the GPS, the simulator checks whether the vehicle has reached the final waypoint of the route. If it has not reached the end, it moves the waypoint index forward so the vehicle continues moving on the next loop; if it has reached the last waypoint, this triggers the “arrival” logic instead of continuing movement.

### Arrival and Work Completion Workflow

<figure id="fig:7.5" data-latex-placement="H">
<img src="chapter8/figs/8.5.png" style="width:90.0%" />
<figcaption>Vehicle Arrival, Working State, Completion and Reset Workflow</figcaption>
</figure>

It focuses on what happens when the simulated vehicle arrives at the fault location, performs work, and then resets to an available state. When the waypoint index reaches the end of the route, HandleArrival is called, which updates the backend vehicle status to working (with retry), publishes the working status via MQTT, starts a random work timer between 5 and 15 minutes, then completeWork marks the job as resolved, sends a resolution message and available status via MQTT and API (using the same backend and MQTT flow described in Chapter 4), and finally clears the assigned fault and route to reset the simulator vehicle state.

### Complete System Integration Flow

<figure id="fig:7.6" data-latex-placement="H">
<img src="chapter8/figs/8.6.png" style="width:90.0%" />
<figcaption>System Integration Flow in which Simulator, Backend APIs and MQTT Working Together</figcaption>
</figure>

This shows the full system integration flow from dispatch to completion in one continuous process. The backend AI dispatch engine assigns a fault to a vehicle and exposes it through the REST API, which the vehicle simulator polls every few seconds to detect any new work. When a fault is assigned to one of its vehicles, the simulator calculates a route using OSRM or a Haversine fallback, updates the vehicle status to onRoute, and starts sending GPS updates every 3 seconds through MQTT and REST so the backend always knows the live position. As the simulated vehicle arrives at the fault location, the status changes to working, and once the job is finished the simulator marks the fault as resolved and resets the vehicle back to available, while the backend updates the fault record and stores the final resolution state. (as previously described in Chapter 4)

### Dispatch Detection

- Simulator checks backend every 5 seconds

- Finds assigned faults

- Matches fault with vehicle

- Calculates route

- Updates status to onRoute

### Vehicle Movement

- Vehicle moves through route waypoints

- GPS updates sent every 3 seconds

- Speed and heading calculated

- GPS sent via MQTT and API

### Arrival and Work

- Vehicle reaches destination

- Status changes to working

- Work time starts (5–15 minutes)

- Vehicle stops moving

### Work Completion

- Work timer ends

- Resolution message sent via MQTT

- Vehicle status resets to available

- Vehicle is ready for next task

## GPS Simulation

- GPS update interval: 3 seconds

- Speed: 40 km/h (fixed)

- Movement: Waypoint-based

- Heading: Calculated using bearing formula

GPS Data Format:

- Latitude

- Longitude

- Speed

- Heading

- Timestamp

## Configuration

Configuration is managed using environment variables.

Key settings:

- MQTT Credentials: Username, password, and broker address used to connect and publish/subscribe to MQTT topics for real-time vehicle updates.

- GPS Update Interval: The time interval (in seconds) at which the simulator updates the vehicle’s GPS coordinates and sends them via MQTT and API.

- Dispatch Polling Interval: The frequency (in seconds) at which the simulator polls the backend to check for newly assigned faults.

- Vehicle Speed: The speed at which vehicles move along their route, typically in km/h, used to simulate realistic movement.

- Work Duration: The time (in minutes) it takes for a vehicle to complete a fault once it arrives at the location; usually randomized within a range (e.g., 5–15 minutes).

All values have default settings for development.

## Deployment

### Local Run

- Install dependencies

- Configure .env file

- Run simulator using Node.js

### Docker Support

- Dockerfile available

- Can be added to docker compose

- Automatically restarts if stopped

## How to Monitor the Simulator Console Output

Console Output:

- The simulator prints detailed logs in the console using emoji indicators to show success, errors, warnings, retries, MQTT operations, and vehicle operation.

Checking Vehicle State:

- The simulator stores all vehicle information in memory. You can see:

- Vehicle location updates (logged every 10 waypoints)

- Status changes

- Work assignments

- Route calculations

Monitoring MQTT Messages

- Use an MQTT client (like MQTT Explorer) to:

- Subscribe to vehicle/{vehicle_number}/gps

- Watch location updates in real-time

- Monitor status changes

- Verify completion messages

## Error Handling & Troubleshooting

- Authentication Errors: Handles cases where login to the backend fails; ensures the simulator retries or prompts for credentials.

- MQTT Connection Failures: Detects if the simulator cannot connect to the MQTT broker and attempts reconnection to maintain real-time updates.

- Missing Vehicles: Identifies vehicles that are not available in the system and ensures they are skipped or logged without stopping the simulator.

- Route Calculation Failure: Handles errors during route computation; uses fallback methods (e.g., Haversine distance) to continue simulation.

Fallback Systems Ensure:

- The simulator continues running even if some errors occur.

- Vehicles still move along routes and perform tasks despite failures in some components.

## Integration with Full System

### Backend Integration

The backend AI dispatch engine assigns faults to specific vehicles and then updates the vehicle and fault status accordingly.

The simulator continuously polls the backend, detects assignments, and starts route calculation and vehicle movement towards the fault location.

During the trip, the simulator sends regular GPS updates to the backend so the system always knows the latest vehicle position.

When work is completed, the simulator publishes a resolution message and the backend marks the fault as resolved and frees the vehicle for new tasks.

### Frontend Integration

The backend forwards GPS updates to the frontend via WebSocket (as discussed in the Frontend chapter) so the web application can receive them in real time.

The frontend map uses these GPS messages to show live vehicle movement, including position, speed, and direction on the screen. (as discussed in the Frontend chapter)

Whenever the simulator changes a vehicle’s status, the backend pushes an update and the frontend immediately reflects the new state (available, onRoute, working) for operators.

## Performance

The vehicle simulator is a small and simple Node.js application that uses input/output operations primarily and as a result, the application consumes very little CPU and is mostly using moderate memory even when running continuously.

The simulator can manage several vehicles at the same time, sending GPS and status updates for each one without heavy resource usage.

The simulator becomes a choice for developers, testers, and demo environments that often run virtual vehicles but have limited hardware resources.

## Future Enhancements

- WebSocket Integration: Real-time dispatch events instead of polling.

- Multiple Simulators: Support for distributed simulation.

- Route Optimization: Multi-vehicle route optimization.

- Performance Metrics: Track simulation performance.

- Traffic Simulation: Variable speeds based on traffic.

## Conclusion

The Vehicle Simulator is a highly practical and realistic software that takes the place of physical vehicle tracking hardware in a fleet management system.

It mimics the motion of the vehicle on the routes and continuously provides GPS and status updates while automatically managing dispatch, arrival, and work done with the faults assigned to the personnel.

Through close integration with the backend API, the MQTT broker, and the frontend map, the entire process of testing, demoing and developing can now take place without the use of real vehicles or GPS devices.
