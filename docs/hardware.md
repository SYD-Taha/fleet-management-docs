---
sidebar_position: 4
title: "Hardware"
---

# Hardware


## Introduction

This chapter presents the hardware design and implementation of the AI-powered Real-Time Fleet Tracking and Visibility System. It provides detailed descriptions of each hardware component, their working principles, interfacing details, and the way they integrate to form a complete system. Circuit diagrams, block diagrams, wokwi online simulation and a breadboard implementation overview are also included to illustrate the interconnections.

As discussed in Section 1.6 of Chapter 1, the proposed system follows a layered architecture consisting of hardware, communication, data processing and application layers. This chapter focuses on the physical realization of the Hardware/Device Layer described in Chapter 1.

## Hardware Components Overview

The selection of hardware components directly aligns with the system requirements and layered architecture presented in Chapter 1, particularly the Hardware/Device Layer and Communication Layer.

The hardware components used in this project are listed in (Table  <a href="#tab:3.1" data-reference-type="ref" data-reference="tab:3.1">[tab:3.1]</a>):

## Individual Component Descriptions

### ESP32-S3 Microcontroller

The ESP32-S3 is the main controller in the system. It connects all the hardware parts and handles the main processing. It works like the brain by getting authentication information from the NFC reader, location details from the GPS and then controls communication with both the GSM module, which sends updates to the cloud or server and the local display, which is the LCD screen (Figure  <a href="#fig:3.1" data-reference-type="ref" data-reference="fig:3.1">1.1</a>):

<figure id="fig:3.1" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.1.png" style={{width:"80.0%"}} />
<figcaption>ESP32-S3</figcaption>
</figure>

When a crew member scans their NFC card for confirmation, the ESP32 checks and records the ID. At the same time, it gets the GPS coordinates to link the location. This information is saved on the SD card and also sent to the control center via the GSM module. The ESP32 also shows real-time updates on the TFT LCD, like “Fault details and location etc.” Basically, the ESP32 handles data collection, checking, storing, showing and sending all at once. This functionality directly supports the real-time data acquisition and processing requirements defined in Chapter 1.

### PN532 NFC Reader

PN532 is an NFC module that enables authentication using RFID or NFC tags. Every worker or driver has an NFC-enabled ID card that uniquely identifies them (Figure  <a href="#fig:3.2" data-reference-type="ref" data-reference="fig:3.2">1.2</a>):

<figure id="fig:3.2" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.2.png" style={{width:"80.0%"}} />
<figcaption>PN532 NFC Reader</figcaption>
</figure>

The NFC-based authentication mechanism supports the crew identification and task validation features described in Sections 1.3.3 and 1.4.1 of Chapter 1. When the card is tapped on the NFC reader, the PN532 sends the card’s unique ID (UID) to the ESP32. The ESP32 checks this ID against a list of approved IDs. If the ID is correct, the crew member is authenticated, their entry is recorded with a time stamp and GPS location and a confirmation message appears on the TFT LCD. If the ID is not recognized, an error message is shown and no entry is made.

### SIM900A GSM Module

The SIM900A GSM module supports GPRS and SMS and offers cellular connection to communicate with the backend server or control center for sending updates (Figure  <a href="#fig:3.3" data-reference-type="ref" data-reference="fig:3.3">1.3</a>):

<figure id="fig:3.3" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.3.png" style={{width:"80.0%"}} />
<figcaption>SIM900A GSM Module</figcaption>
</figure>

The SIM900A GSM module fulfills the communication requirements defined in the Communication Layer discussed in Section 1.6 and the connectivity technologies listed in Section 1.4.1 of Chapter 1. Once the ESP32 collects attendance and GPS information, it organizes the data into a clear message and sends it via the SIM900A module using specific commands. This information travels through GPRS to reach the server’s API. When there’s no internet connection, the module can send text messages, like alerts for unauthorized location entries. This helps fleet managers keep track of employee check-ins and vehicle positions from a distance in real time.

### NEO M8L GPS Module

The Neo-M8L GPS module gives real-time information about the vehicle’s location and speed (Figure  <a href="#fig:3.4" data-reference-type="ref" data-reference="fig:3.4">1.4</a>):

<figure id="fig:3.4" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.4.png" style={{width:"80.0%"}} />
<figcaption>NEO M8L GPS Module</figcaption>
</figure>

The Neo-M8L GPS module implements the live vehicle tracking functionality proposed in Section 1.3.3 and provides the GPS attributes as previously mentioned in Chapter 1. The GPS module keeps sending latitude, longitude and time information to the ESP32. Whenever someone uses the NFC tag to check in, the ESP32 adds the location and time to the attendance record. Also, the GPS data is sent to the control server through the GSM network from time to time, which allows the vehicle’s position to be tracked in real time. This way, the attendance records are linked to the exact location of the vehicle, not just a general mark.

### Micro SD Card Module

The SD card module allows for local data logging. It also offers backup by storing attendance and GPS data on the card itself (Figure  <a href="#fig:3.5" data-reference-type="ref" data-reference="fig:3.5">1.5</a>):

<figure id="fig:3.5" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.5.png" style={{width:"80.0%"}} />
<figcaption>Micro SD Card Module</figcaption>
</figure>

It keeps track of all acknowledgments and location data on the device’s internal storage to ensure that it’s still available if there’s a problem with the network. Each time someone logs in or their location is checked, the information is saved on the SD card in a CSV or log file format. If the GSM connection can’t send the data, like when there’s no good network signal, the information stays safely on the SD card and is sent to the server when the connection is up again. This way, the data is always protected and never lost.

### 2.8" TFT LCD Display

The TFT LCD serves as the user interface, showing the system’s status in real time (Figure  <a href="#fig:3.6" data-reference-type="ref" data-reference="fig:3.6">1.6</a>):

<figure id="fig:3.6" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.6.png" style={{width:"80.0%"}} />
<figcaption>2.8" TFT LCD Display</figcaption>
</figure>

It shows crew authentication, GPS location and GSM connection status. When an NFC scan works, the LCD screen displays the crew ID, the time it was scanned and the GPS coordinates. It also gives real-time updates on GSM connection and any errors, This helps field workers quickly check if the system is working properly without having to look at the main system.

### Power Supply and Voltage Regulation

The whole system needs a regulated power supply that provides both 3.3V and 4.4V. This ensures that the modules receive stable 3.3V voltage (Figure  <a href="#fig:3.7" data-reference-type="ref" data-reference="fig:3.7">1.7</a>):.

<figure id="fig:3.7" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.7.png" style={{width:"80.0%"}} />
<figcaption>Power supply and Regulator</figcaption>
</figure>

The GSM module requires a stable power supply in the range of 3.4–4.4 V, particularly during high current demand. In contrast, the ESP32 and other peripheral components operate at 3.3 V. To meet this requirement, an AMS1117 voltage regulator is used to regulate the supply down to 3.3 V. If the power supply is unstable, the GSM module may shut down during data transmission. Therefore, careful power system design is essential to ensure reliable and uninterrupted operation of the entire system.

### XL6009 Buck Converter

The XL6009 buck converter is a DC–DC step-down regulator used to supply a stable 4.4V output to the GSM module. It efficiently converts a higher input voltage into a regulated 4.4V level, ensuring proper power delivery (Figure  <a href="#fig:3.8" data-reference-type="ref" data-reference="fig:3.8">1.8</a>):.

<figure id="fig:3.8" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.8.png" style={{width:"80.0%"}} />
<figcaption>XL6009 Buck Converter</figcaption>
</figure>

In our system, the XL6009 receives power from the main supply and provides a consistent 4.4V output required for GSM operation. This prevents voltage fluctuations, protects the GSM module, and supports reliable communication.

## Hardware Simulation (Wokwi)

### Introduction

Since Wokwi does not include all the specialized modules like GPS, NFC or GSM, we used custom chips and dummy data generators to mimic their behavior. This helped us test communication protocols, data parsing logic and system workflows in a virtual setup before moving on to real hardware prototyping.

### Simulation Setup

- Microcontroller: ESP32 (38-pin version)

- Modules Simulated:

  - GPS Module: Simulated using a custom UART chip that creates synthetic NMEA strings.

  - NFC Reader: Simulated with a custom data generator over I2C, sending values that look like NFC UID.

  - SIM900A GSM Module: Simulated using a dummy UART device that responds to AT commands.

  - TFT LCD Display: Realistic LCD simulation over SPI, showing parsed coordinates and messages.

  - SD Card: Simulated via SPI with file logging in Wokwi.

- Connections: UART for GPS and GSM, I2C for NFC, SPI for LCD and SD.

### Simulation Circuit Diagram

The Woki Simulation circuit diagram can be seen in Figure <a href="#fig:3.9" data-reference-type="ref" data-reference="fig:3.9">1.9</a>

<figure id="fig:3.9" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.9.png" style={{width:"80.0%"}} />
<figcaption>Wokwi simulation circuit diagram</figcaption>
</figure>

### Simulation Workflow Diagram

<figure id="fig:3.10" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.10.jpg" style={{width:"80.0%"}} />
<figcaption>Wokwi simulation workflow diagram</figcaption>
</figure>

The Figure <a href="#fig:3.10" data-reference-type="ref" data-reference="fig:3.10">1.10</a> illustrates how dummy data sources like GPS, NFC and GSM were linked to the ESP32 in Wokwi for testing purposes.

- The synthetic GPS (UART) provided made-up latitude and longitude information, which the ESP32 read and displayed on the LCD screen at regular intervals.

- The synthetic NFC (I2C) sent pretend card IDs to check how the authentication process worked.

- The synthetic GSM (UART) sent back AT commands to make sure the GSM communication setup was working properly.

- The ESP32-S3 served as the main processor, managing all incoming data and sending the results to both the LCD display and the SD card for recording.

This setup proved that the firmware worked correctly in terms of data handling, parsing, and output, even when using simulated hardware instead of real devices.

### Simulation Results

<figure id="fig:3.10b" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.11.png" style={{width:"80.0%"}} />
<figcaption>Wokwi simulation circuit diagram with results</figcaption>
</figure>

- **GPS Simulation:** Synthetic NMEA data was sent through the UART. The ESP32 read the longitude and latitude values and showed them on the LCD. The LCD refreshed the coordinates every few seconds, mimicking real-time GPS tracking.

- **NFC Simulation:** Synthetic UID values were sent via I2C. The ESP32 treated them as crew IDs and showed authentication messages on the LCD.

- **SIM900A Simulation:** Although real GSM communication wasn’t possible, the AT command requests and responses were tested using synthetic responses over UART, confirming the ESP32’s GSM driver functionality.

- **LCD Display:** The LCD correctly showed the updated longitude and latitude values, simulating real-time fleet tracking.

- **SD Card Simulation:** Acknowledgment records and coordinates were saved in virtual SD memory, verifying the file handling logic.

### Limitations of Simulation

- GPS, NFC, and SIM900A were not available as built-in components in Wokwi.

- Only synthetic or static data streams were used instead of real-time signals.

- The GSM network features like SMS and GPRS couldn’t be tested in Wokwi.

### Comparison: Simulation vs Real Hardware

### Conclusion

Even though the actual hardware wasn’t available on Wokwi, using custom chips with synthetic data streams helped check the firmware logic, how data was processed, and how information moved through the system. Updating the latitude and longitude numbers on the screen regularly made it act like a real GPS. This meant that when the real hardware was finally connected, there wasn’t much need for fixing problems because the main parts had already been tested in a simulated environment.

## Hardware Architecture

The hardware architecture presented in this chapter is directly derived from the system-level layered architecture introduced in Section 1.6 of Chapter 1 ensuring consistency between system design and physical implementation. The proposed Fleet Tracking and Visibility System follows a Layered Architecture, where each layer has specific tasks to keep the system modular and reliable. The system is divided into six layers: the base layer takes care of power distribution and data collection, while the upper layers deal with sensing, processing, communication, storage, and application services. This layered approach separates different responsibilities and stops problems from spreading throughout the system, which ensures smooth data flow and dependable performance.

As shown in Figure <a href="#fig:3.11" data-reference-type="ref" data-reference="fig:3.11">1.12</a>, the architecture shows a clear structure, starting from gathering raw data up to user-level monitoring and control.

<figure id="fig:3.11" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.12.jpg" style={{width:"80.0%"}} />
<figcaption>The Fleet Tracking and Visibility System represented as a six-layer architecture, ranging from power and sensing at the base to processing, communication, storage, and application at the top, ensuring modularity and reliable data flow.</figcaption>
</figure>

- **Power Management (Base Layer):** This layer includes the XL6009 buck converter, TP4056 charging circuit and voltage regulators. These components keep the power steady and reliable for all the hardware parts.

- **Sensing Layer:** This layer includes the PN532 NFC Reader, which handles authentication and acknowledgments and the Neo-M8L GPS module, which tracks the vehicle’s location in real time. These devices collect the data needed for the system to function.

- **Storage and Output Layer:** This layer includes a Micro SD card that saves local records like GPS data, time stamps and authentication details. It also features an LCD or TFT display that shows immediate updates to the driver.

- **Processing Layer:** This layer is managed by the ESP32-S3 microcontroller, acting as the main controller. It receives information from the sensing layer and controls how the system works overall.

- **Communication Layer:** This layer uses the SIM900A GSM module to send processed data to a remote server via GPRS or MQTT, allowing for real-time tracking of the fleet.

- **Application Layer:** This layer is at the top, featuring a server and a web app. These tools let admins and approved users watch over the fleet, create reports and check authentication records.

To better explain this architecture, the next sections include three different views of the system:

1)  System-Level Block Diagram

2)  Simplified Hardware Schematic

3)  Circuit-Level Schematic

### System-Level Block Diagram

Figure  <a href="#fig:3.12" data-reference-type="ref" data-reference="fig:3.12">1.13</a> illustrates the block diagram of the system, showing how data flows between components.

<figure id="fig:3.12" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.13.jpg" style={{width:"80.0%"}} />
<figcaption>The system-level block diagram of the Fleet Tracking and Visibility System, showing data flow between sensing, processing, communication, storage, and application modules.</figcaption>
</figure>

### Simplified Hardware Schematic Diagram

<figure id="fig:3.13" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.14.jpg" style={{width:"80.0%"}} />
<figcaption>Simplified Hardware Schematic of Fleet Tracking System, showing logical connections between input sensors, ESP32-S3 controller, output peripherals and power supply.</figcaption>
</figure>

Figure <a href="#fig:3.13" data-reference-type="ref" data-reference="fig:3.13">1.14</a> shows a simplified version of the hardware setup for the Fleet Tracking and Visibility system. Unlike the detailed wiring diagram in Figure <a href="#fig:3.14" data-reference-type="ref" data-reference="fig:3.14">1.15</a>, this diagram shows how the main parts of the system are connected and arranged, with the ESP32-S3 microcontroller at the center.

- **Input Modules (Top Layer):** The input modules (PN532 NFC Reader and Neo-M8L GPS Module) send their data down to the ESP32-S3 for processing.

- **Central Processing (Middle Layer):** ESP32-S3 Microcontroller: This is the main part of the system. It gets data from the sensors, runs the control program, saves records and sends information to the communication parts.

- **Output Modules (Below ESP32-S3):** The output modules (TFT LCD Display, Micro SD Card Module, SIM900A GSM Module) shows messages, location updates and the result of authentication right on the device, keeps a record of GPS positions, time stamps and authentication events locally. This sends processed information to a remote server using GPRS or HTTP.

- **Remote Server (Lower Layer):** This is the main storage and monitoring system where all the data about the fleet is collected and displayed for the administrators to see.

- **Power Supply (Base Layer):** This includes a Buck Converter (XL6009), a TP4056 charging module for charging the Lipo battery and other voltage regulators. It provides a steady 3.3V power for the ESP32-S3 and other parts and a separate 4.4V line for the GSM module. The power flow connecting the power source to each module.

### Circuit-Level Schematic

Professor FAREED ALVI’s review can be viewed in Appendix C (see Figure <a href="#fig:Sir Freed Alvi&#39;s Review on Circuit Diagram" data-reference-type="ref" data-reference="fig:Sir Freed Alvi&#39;s Review on Circuit Diagram">[fig:Sir Freed Alvi's Review on Circuit Diagram]</a>).

<figure id="fig:3.14" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.15.png" style={{width:"100.0%"}} />
<figcaption>Circuit Level Schematic Diagram of Hardware Interfacing.</figcaption>
</figure>

In Figure <a href="#fig:3.14" data-reference-type="ref" data-reference="fig:3.14">1.15</a>, the Fleet Tracking and Visibility System is displayed with all its hardware parts connected around the ESP32-S3 microcontroller, which serves as the main control unit. The system includes various modules for sensing like GPS and NFC, processing through the ESP32-S3, communication via the SIM900A GSM modem, data storage using a Micro SD card, and a TFT LCD display for showing information locally.

The diagram shows the full circuit design, including how the ESP32-S3 is connected to other parts such as the GPS module, PN532 NFC reader, SIM900A GSM module, LCD display, and Micro SD card.

It also shows the power components like the buck converter, battery, charging module, and voltage regulators, which help keep the power steady and reliable for all the devices.

Having this level of detail is important for building the hardware, as it clearly shows how each part connects to others, ensuring the data flows properly and the system runs smoothly without any interruptions.

**Overall Working:**

The system uses parts that sense, send messages and control things to handle fleet activities as they happen. When the backend receives a fault, it sends a message to the vehicle’s hardware. The ESP32-S3 chip gets this message through the SIM900A module and shows the fault details on the LCD screen of that particular assigned vehicle. When the crew/team lead taps their NFC card, the ESP32-S3 checks their ID, acknowledges the dispatch and sends the acknowledgement to the backend.

While traveling, the GPS part keeps sending the vehicle’s current location, which is saved on an SD card and sent to the main computer through the GSM network. The screen shows messages like “Dispatch Received”, “Vehicle Status” and “Location Sent” to show the system is working.

After fault resolution, the crew/team lead uses their NFC card again to confirm fault resolution. The ESP32-S3 then sends a “Fault Resolved” message to the server, ending the process.

This way, everything stays connected in real time between the main system, the vehicle hardware and the crew, making sure dispatches are handled quickly and everyone can see where the fleet is at all times Figure  <a href="#fig:3.16" data-reference-type="ref" data-reference="fig:3.16">1.16</a> and Figure  <a href="#fig:3.17" data-reference-type="ref" data-reference="fig:3.17">1.17</a>.

<figure id="fig:3.16" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.16.png" style={{width:"75.0%"}} />
<figcaption>Complete hardware prototype of the proposed system.</figcaption>
</figure>

<figure id="fig:3.17" data-latex-placement="H">
<img src="/fleet-management-docs/img/hardware/4.17.jpeg" style={{width:"75.0%"}} />
<figcaption>Fully integrated hardware implementation.</figcaption>
</figure>

## Breadboard Implementation

For the initial testing and setup, the circuit was built on a breadboard. This setup made it easy to connect and disconnect different parts of the circuit before creating the final printed circuit board. The ESP32, GPS and NFC reader were attached directly to the breadboard, but the GSM module was connected separately because it works on 4.4v logic. Using the breadboard let us check all the connections, test the signals and find any problems before moving to a more permanent setup <span id="fig:3.18" label="fig:3.18"></span>.

<figure id="fig:4.18" data-latex-placement="H">
<div class="minipage">
<img src="/fleet-management-docs/img/hardware/4.18a.png" />
</div>
<div class="minipage">
<img src="/fleet-management-docs/img/hardware/4.18b.png" />
</div>
<div class="minipage">
<img src="/fleet-management-docs/img/hardware/4.18c.png" />
</div>
<figcaption>Breadboard-Based Hardware Testing of the Proposed System</figcaption>
</figure>

## Interfacing and Data Flow

The system integrates several data sources through the ESP32. The GPS module sends location information through the UART connection, and the PN532 NFC reader sends acknowledgement and confirmations. The ESP32 takes this data, saves it to an SD card, and shows the results on a TFT LCD screen at the same time. Important messages or new information is sent to the control center using the SIM900A GSM module. This setup has backup options, so data is stored both locally on the device and also uploaded to a remote server.

## Testing and Troubleshooting

During the process of integrating hardware, there were a few problems that came up and were fixed:

- The GPS module needed to be tested outdoors to get a reliable connection with satellites.

- The SIM900A required a separate 4.4V power supply along with capacitors to manage sudden increases in current.

- All the connections on the breadboard were checked thoroughly to prevent any pins from being left unconnected.

## Summary

This chapter gave a comprehensive overview of the hardware used in the system, how it works, how it connects with other parts, and how data moves through the system. Testing on a breadboard helped check everything before putting it all together permanently. The next chapter will cover the software part and how it connects with the main system.
