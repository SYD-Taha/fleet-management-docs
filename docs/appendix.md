---
sidebar_position: 11
title: Appendix
---

# Appendix

## Feasibility Comparison Table

<div class="adjustbox">

max width=

<div id="tab:feasibility">

<table>
<caption>Feasibility Comparison Table</caption>
<thead>
<tr>
<th style={{textAlign:"left"}}><strong>Feasibility Type</strong></th>
<th style={{textAlign:"left"}}><strong>Description</strong></th>
<th style={{textAlign:"left"}}><strong>Key Factors Considered</strong></th>
<th style={{textAlign:"left"}}><strong>Conclusion</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style={{textAlign:"left"}}>Technical Feasibility</td>
<td style={{textAlign:"left"}}>Checks if the suggested technologies can be effectively put into use and combined with existing systems.</td>
<td style={{textAlign:"left"}}><ul>
<li><p>Cloud computing allows for easy scaling and access to resources from anywhere.</p></li>
<li><p>GPS and NFC technologies offer precise real-time tracking capabilities.</p></li>
<li><p>AI-driven route optimization improves overall efficiency.</p></li>
<li><p>Secure compatibility with current K-Electric systems is ensured.</p></li>
</ul></td>
<td style={{textAlign:"left"}}>Feasible – The needed technology is already available, works well, and can be used with the organization’s current systems.</td>
</tr>
<tr>
<td style={{textAlign:"left"}}>Economic Feasibility</td>
<td style={{textAlign:"left"}}>Checks if the project offers a good value for money and explains why the investment is worthwhile.</td>
<td style={{textAlign:"left"}}><ul>
<li><p>Better route planning can save up to 15% on fuel expenses.</p></li>
<li><p>Using predictive maintenance helps cut down on equipment breakdowns and repair bills.</p></li>
<li><p>Enhancing how operations run leads to higher levels of productivity.</p></li>
</ul></td>
<td style={{textAlign:"left"}}>Feasible – The system will result in long-term cost savings, which makes the investment a good choice.</td>
</tr>
<tr>
<td style={{textAlign:"left"}}>Cost Feasibility</td>
<td style={{textAlign:"left"}}>Checks if the project’s cost stays within the budget and can be maintained over a long period.</td>
<td style={{textAlign:"left"}}><ul>
<li><p>The first expenses involve buying hardware like GPS and NFC devices, developing the software, and connecting everything together.</p></li>
<li><p>Ongoing costs come from using cloud services, keeping the system running, and making regular updates.</p></li>
<li><p>The return on investment happens because the system helps save time and lowers overall operating costs.</p></li>
</ul></td>
<td style={{textAlign:"left"}}>Feasible – The project needs some initial spending, but the money saved on fuel, repairs, and better performance makes it a good choice for lasting success.</td>
</tr>
</tbody>
</table>

</div>

</div>

This comparison shows that the proposed Real-Time Fleet Tracking System works well from a technical, economic, and cost point of view. It ensures efficient, scalable, and cost-effective fleet management for K-Electric.

## Additional References Consulted

These sources were consulted during the literature review to support discussions on real-time fleet tracking benefits, response times, predictive maintenance, and security standards.

1.  Aberdeen Group. (2015). *Improving Fleet Efficiency with Real-Time Tracking*.

2.  JIMI IoT. *Boost Your Business with Real-Time Fleet Tracker*. Retrieved from: https://www.jimiiot.com/news/boost-your-business-with-real-time-fleet-tracker.html

3.  FieldLogix. *Fleet Tracking Improves Customer Service via Better Response Times*. Retrieved from: https://fieldlogix.com/news/fleet-tracking-improves-customer-service-via-better-response-times/

4.  Fleetx. *The Transformative Impact of Vehicle Tracking Solutions on Service and Satisfaction*. Retrieved from: https://blog.fleetx.io/the-transformative-impact-of-vehicle-tracking-solutions-on-service-and-satisfaction/

5.  GoFleet. (2021). *How Real-Time GPS Tracking Improves Fleet Response Times*. Retrieved from: https://www.gofleet.com/advantages-of-real-time-tracking/

6.  FieldLogix. (2020). *The Benefits of Fleet Tracking for Service Response Times*. Retrieved from: https://www.fieldlogix.com

7.  IETF. *RFC 5246: The Transport Layer Security (TLS) Protocol Version 1.2*. Retrieved from: https://datatracker.ietf.org/doc/html/rfc5246

8.  NIST. *FIPS PUB 197: Advanced Encryption Standard (AES)*. Retrieved from: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf

9.  Emerald Insight. Article on related fleet topics. Retrieved from: https://www.emerald.com/insight/content/doi/10.1108/meq-07-2018-0134/full/html

10. Translogixs. *How Predictive Maintenance Can Save Your Fleet Time and Money*. Retrieved from: https://www.translogixs.com/blog-posts/how-predictive-maintenance-can-save-your-fleet-time-and-money

11. Fleet Owner. (n.d.). *Fleets Save More with Predictive Maintenance*. Retrieved from: https://www.fleetowner.com/technology/article/21260642/fleets-save-more-with-predictive-maintenance

12. Prolius. *Predictive Maintenance*. Retrieved from: https://www.prolius.com/news/predictive-maintenance

## Hardware Components Specifications and Pin Configurations

This appendix provides detailed technical specifications, pin configurations, and logical diagrams for the key hardware components used in the project.

## ESP32-S3 Microcontroller

**Technical Specifications**

- Supply Voltage: 3.0V – 3.6V (typical 3.3V)

- CPU: Dual-core Xtensa LX7, 240 MHz

- RAM: 512 KB SRAM + external PSRAM support

- Flash: 8 MB (typical module)

- Communication Interfaces: UART, SPI, I2C, GPIO, PWM, ADC, DAC

- Wireless: Wi-Fi (2.4 GHz, 802.11 b/g/n), Bluetooth 5.0 LE

**Pin Configuration**

<div id="tab:esp32_pins">

| **Pin No.** | **Name** | **Function**        | **Connection in Project**  |
|:------------|:---------|:--------------------|:---------------------------|
| 1           | 3V3      | Power supply (3.3V) | Power regulator output     |
| 2           | GND      | Ground              | Common ground              |
| 3           | GPIO21   | I2C SDA             | PN532 NFC SDA              |
| 4           | GPIO22   | I2C SCL             | PN532 NFC SCL              |
| 5           | GPIO16   | UART RX             | GPS TX                     |
| 6           | GPIO17   | UART TX             | GPS RX                     |
| 7           | GPIO5    | SPI SCK             | SD Card + LCD              |
| 8           | GPIO18   | SPI MOSI            | SD Card + LCD              |
| 9           | GPIO19   | SPI MISO            | SD Card                    |
| 10          | GPIO23   | UART TX             | GSM RX (via level shifter) |
| 11          | GPIO25   | UART RX             | GSM TX (via level shifter) |

ESP32-S3 Microcontroller Pin Configuration

</div>

<figure id="fig:esp32_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c1.png" />
<figcaption>ESP32-S3 full logical pinout</figcaption>
</figure>

## PN532 NFC Reader

**Technical Specifications**

- Operating Voltage: 3.3V / 5V

- Communication Interfaces: I2C, SPI, UART

- Frequency: 13.56 MHz

- Reading Range: 0–5 cm (depending on antenna & card type)

**Pin Configuration**

<div id="tab:pn532_pins">

| **Pin No.** | **Name** | **Function**  | **Connection in Project** |
|:------------|:---------|:--------------|:--------------------------|
| 1           | VCC      | Power         | 3.3V                      |
| 2           | GND      | Ground        | Common ground             |
| 3           | SDA      | I2C Data      | ESP32 GPIO21              |
| 4           | SCL      | I2C Clock     | ESP32 GPIO22              |
| 5           | IRQ      | Interrupt Pin | Not used                  |

PN532 NFC Reader Pin Configuration

</div>

<figure id="fig:pn532_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c2.png" style={{width:"80.0%"}} />
<figcaption>PN532 NFC Reader full logical pinout</figcaption>
</figure>

## SIM900A GSM Module

**Technical Specifications**

- Operating Voltage: 3.4–4.4V (recommended 4V)

- Peak Current: 2A (during transmission bursts)

- Network: Quad-band GSM 850/900/1800/1900 MHz

- Interface: UART (AT commands)

**Pin Configuration**

<div id="tab:sim900a_pins">

| **Pin No.** | **Name** | **Function**  | **Connection**                 |
|:------------|:---------|:--------------|:-------------------------------|
| 1           | VCC      | Power 4V      | External Regulator             |
| 2           | GND      | Ground        | Common GND                     |
| 3           | TXD      | UART Data Out | ESP32 RX25 (via level shifter) |
| 4           | RXD      | UART Data In  | ESP32 TX23 (via level shifter) |

SIM900A GSM Module Pin Configuration

</div>

<figure id="fig:sim900a_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c3.png" style={{width:"80.0%"}} />
<figcaption>SIM900A GSM Module full logical pinout</figcaption>
</figure>

## NEO M8L GPS Module

**Technical Specifications**

- Voltage: 3.0–5.0V

- Current:  45 mA

- Communication: UART (9600 baud default)

- Accuracy: 2.5 m CEP

- Cold Start Time: 27 s (average)

**Pin Configuration**

<div id="tab:neo_pins">

| **Pin No.** | **Name** | **Function** | **Connection** |
|:------------|:---------|:-------------|:---------------|
| 1           | VCC      | Power        | 3.3V/5V        |
| 2           | GND      | Ground       | Common GND     |
| 3           | TX       | Data Out     | ESP32 RX16     |
| 4           | RX       | Data In      | ESP32 TX17     |

NEO M8L GPS Module Pin Configuration

</div>

<figure id="fig:neo_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c4.png" style={{width:"80.0%"}} />
<figcaption>NEO M8L GPS Module full logical pinout</figcaption>
</figure>

## Micro SD Card Module

**Technical Specifications**

- Voltage: 3.3V (with onboard regulator for 5V input)

- Interface: SPI

- Supported: FAT32 file system

**Pin Configuration**

<div id="tab:sd_pins">

| **Pin No.** | **Name** | **Function** | **Connection** |
|:------------|:---------|:-------------|:---------------|
| 1           | VCC      | Power        | 3.3V/5V        |
| 2           | GND      | Ground       | Common GND     |
| 3           | SCK      | SPI Clock    | ESP32 GPIO5    |
| 4           | MOSI     | SPI Data     | ESP32 GPIO18   |
| 5           | MISO     | SPI Read     | ESP32 GPIO19   |
| 6           | CS       | Chip Select  | ESP32 GPIO4    |

Micro SD Card Module Pin Configuration

</div>

<figure id="fig:sd_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c5.png" style={{width:"80.0%"}} />
<figcaption>Micro SD Card Module (a) and (b) full logical pinout</figcaption>
</figure>

## 2.8" TFT LCD Display

**Technical Specifications**

- Voltage: 3.3V

- Interface: SPI

- Resolution: 240x320 pixels

- Display Size: 2.8 inches

**Pin Configuration**

<div id="tab:lcd_pins">

| **Pin No.** | **Name** | **Function** | **Connection** |
|:------------|:---------|:-------------|:---------------|
| 1           | VCC      | Power        | 3.3V           |
| 2           | GND      | Ground       | Common GND     |
| 3           | SCK      | SPI Clock    | ESP32 GPIO5    |
| 4           | MOSI     | SPI Data     | ESP32 GPIO18   |
| 5           | MISO     | SPI Read     | ESP32 GPIO19   |
| 6           | CS       | Chip Select  | ESP32 GPIO15   |

2.8" TFT LCD Display Pin Configuration

</div>

<figure id="fig:lcd_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c6.png" style={{width:"80.0%"}} />
<figcaption>2.8" TFT LCD Display full logical pinout</figcaption>
</figure>

## Power Supply and Voltage Regulation

**Technical Specifications**

- Input: 5V (USB or adapter)

- Regulator: AMS1117 (5V → 3.3V)

- Max Current: 800mA (per regulator)

<figure id="fig:power_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c7.png" style={{width:"80.0%"}} />
<figcaption>Power supply and Regulator Circuit full logical pinout Diagram</figcaption>
</figure>

## XL6009 Buck Converter

**Technical Specifications**

- Input Voltage Range: 5 V to 32 V

- Output Voltage Range: 1.25 V to 30 V (adjustable)

- Maximum Output Current: Up to 3 A (with cooling)

- Switching Frequency: Approximately 200 kHz

- Efficiency: Up to 94%

- Output Voltage Ripple: Typically, less than 50 mV

- Protection Features: Overcurrent and thermal shutdown

- Dimensions: Approx. 43 mm × 21 mm × 14 mm

<figure id="fig:xl6009_pinout" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/c8.png" style={{width:"80.0%"}} />
<figcaption>XL6009 Buck Converter full logical pinout Diagram</figcaption>
</figure>

## Sir Freed Alvi’s Review on Circuit Diagram

<figure id="fig:Sir Freed Alvi&#39;s Review on Circuit Diagram" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/sir fareed&#39; review.png" style={{width:"80.0%"}} />
<figcaption>Sir Freed Alvi’s Review on Circuit Diagram</figcaption>
</figure>

## Wokwi Simulation Code and Configuration

This appendix presents the complete code and configuration files used in the Wokwi online simulator to prototype and test the vehicle tracking system’s core functionality, including LCD display, SD card logging, and simulated GPS data.

### Main Sketch (sketch.ino)

```
[language=C++, caption={Main Arduino Sketch for Wokwi Simulation}, label={lst:wokwi_sketch}, basicstyle=\small\ttfamily, keywordstyle=\color{blue}, stringstyle=\color{red}, commentstyle=\color{green}, numbers=left, numberstyle=\tiny, frame=single]
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
#include <SPI.h>
#include <SD.h>

// LCD Pins
#define TFT_CS   15
#define TFT_DC   2
#define TFT_RST  4
Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_RST);

// SD Card Pin
#define SD_CS 5
File dataFile;

// Fake GPS Data
float latitude = 24.8600;
float longitude = 67.0000;

void setup() {
  Serial.begin(115200);

  tft.begin();
  tft.setRotation(1);
  tft.fillScreen(ILI9341_BLACK);
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);

  if (!SD.begin(SD_CS)) {
    tft.setCursor(0, 0);
    tft.println("SD Failed!");
    while (1);
  }

  tft.setCursor(0, 0);
  tft.println("System Ready!");

  delay(2000);
}

void loop() {
  // Simulate Dynamic GPS Data
  latitude += 0.0001;    // Fake latitude increment
  longitude += 0.0001;   // Fake longitude increment

  // Display on LCD
  tft.fillScreen(ILI9341_BLACK);
  tft.setCursor(0, 0);
  tft.print("Lat: ");
  tft.println(latitude, 6);

  tft.print("Lon: ");
  tft.println(longitude, 6);

  // Save to SD Card
  dataFile = SD.open("/gpslog.txt", FILE_APPEND);
  if (dataFile) {
    dataFile.print("Lat: ");
    dataFile.print(latitude, 6);
    dataFile.print(", Lon: ");
    dataFile.println(longitude, 6);
    dataFile.close();
    Serial.println("Data saved.");
  } else {
    Serial.println("File write error.");
  }

  delay(2000);  // 2 seconds delay (simulate tracking interval)
}
```

### Diagram Configuration (diagram.json)

```json
{
      "version": 1,
      "author": "Saman Aslam",
      "editor": "wokwi",
      "parts": [
        { "type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {} },
        { "type": "wokwi-microsd-card", "id": "sd1", "top": -86.17, "left": -124.73, "attrs": {} },
        { "type": "wokwi-ili9341", "id": "lcd1", "top": -37.6, "left": -355.5, "attrs": {} },
        { "type": "chip-gps-module", "id": "chip1", "top": -56.58, "left": 235.2, "attrs": {} },
        { "type": "chip-nfc-reader-em-18", "id": "chip2", "top": 49.02, "left": 235.2, "attrs": {} },
        {
          "type": "chip-gsm-module-sim900a",
          "id": "chip3",
          "top": 173.82,
          "left": 235.2,
          "attrs": {}
        }
      ],
      "connections": [
        [ "esp:TX", "$serialMonitor:RX", "", [] ],
        [ "esp:RX", "$serialMonitor:TX", "", [] ],
        [ "lcd1:VCC", "esp:5V", "red", [ "v9.6", "h297.6", "v-57.6" ] ],
        [ "lcd1:GND", "esp:GND.2", "black", [ "v19.2", "h412.8", "v-240" ] ],
        [ "lcd1:CS", "esp:15", "green", [ "v28.8", "h412.8", "v-48" ] ],
        [ "lcd1:RST", "esp:4", "green", [ "v38.4", "h412.8", "v-144" ] ],
        [ "lcd1:D/C", "esp:2", "green", [ "v48", "h412.8", "v-134.4" ] ],
        [ "lcd1:MOSI", "esp:23", "green", [ "v57.6", "h412.79", "v-9.6" ] ],
        [ "lcd1:SCK", "esp:18", "green", [ "v67.2", "h412.79", "v-9.6" ] ],
        [ "lcd1:LED", "esp:5V", "green", [ "v76.8", "h211.19", "v-124.8" ] ],
        [ "sd1:CS", "esp:5", "green", [ "h172.8", "v134.46" ] ],
        [ "sd1:SCK", "esp:18", "green", [ "h182.4", "v153.59" ] ],
        [ "sd1:DO", "esp:19", "green", [ "h192", "v0.11" ] ],
        [ "sd1:DI", "esp:23", "green", [ "h201.6", "v-0.09" ] ],
        [ "sd1:VCC", "esp:5V", "red", [ "h28.8", "v0.14" ] ],
        [ "sd1:GND", "esp:GND.2", "black", [ "h211.2", "v0.11" ] ],
        [ "chip1:OUT", "esp:TX", "green", [ "h21.01", "v48", "h-163.2", "v9.6" ] ],
        [ "chip2:OUT", "esp:TX", "green", [ "h21.01", "v38.4", "h-192", "v-38.4", "h-9.6" ] ],
        [ "chip3:OUT", "esp:TX", "green", [ "h21.01", "v-38.4", "h-172.8", "v-86.4" ] ],
        [ "esp:RX", "chip1:IN", "green", [ "h120.04", "v-48", "h134.4", "v-9.6" ] ],
        [ "esp:RX", "chip2:IN", "green", [ "h110.44", "v38.4", "h144", "v-38.4" ] ],
        [ "esp:RX", "chip3:IN", "green", [ "h81.64", "v153.6", "h182.4", "v-28.8" ] ]
      ],
      "dependencies": {}
    }
```

### Custom Chip Definitions

The simulation uses custom chips for GPS, NFC, and GSM modules. Their configurations and basic C implementations are provided below.

**gps-module.chip.json, nfc-reader-em-18.chip.json, and gsm-module-sim900a.chip.json** (similar structure):

```json
    {
      "name": "gps-module",
      "author": "Saman Aslam",
      "pins": [
        "VCC",
        "GND",
        "IN",
        "OUT"
      ],
      "controls": []
    }
```

**Custom Chip C Code** (identical placeholder for all three modules):

``` objectivec
#include "wokwi-api.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  // TODO: Put your chip variables here
} chip_state_t;

void chip_init() {
  chip_state_t *chip = malloc(sizeof(chip_state_t));

  printf("Hello from custom chip!\n");
}
```

### Required Libraries

- Adafruit GFX Library

- Adafruit ILI9341 Library

### Current Implemented Sketch

``` numberLines
#include <WiFi.h>
#include <WiFiClientSecure.h>  //  Changed from WiFiClient
#include <PubSubClient.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Wire.h>
#include <Adafruit_PN532.h>
#include <SPI.h>
#include "time.h"

// ----------------- Wi-Fi + MQTT -----------------
const char* ssid = "taha";
const char* password = "taha1234";

// HiveMQ Cloud Configuration
const char* mqtt_server = "84837c1224714acc85e9e0935388600d.s1.
eu.hivemq.cloud";
const int mqtt_port = 8883; // Secure MQTT port
const char* mqtt_user = "taha_user";
const char* mqtt_pass = "Strongpassword123";

// NTP server
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 5 * 3600;
const int daylightOffset_sec = 0;

WiFiClientSecure espClient;  // ✅ Changed to WiFiClientSecure
PubSubClient client(espClient);

// Device + vehicle identity
String DEVICE_ID = "DVC001";
String VEHICLE_NUM = "V001";

// ----------------- Display setup -----------------
#define TFT_CS  9
#define TFT_DC  8
#define TFT_RST 7

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);

// ----------------- NFC setup -----------------
#define SDA_PIN      21
#define SCL_PIN      47
#define PN532_IRQ     2
#define PN532_RESET   4

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET, &Wire);

// ----------------- State variables -----------------
bool waitingForDispatchTap = false;
bool waitingForResolveTap = false;
bool allowNFCTap = false;

String activeFaultId = "";
String activeFaultDetails = "";

unsigned long faultDisplayStart = 0;

// ----------------- Time -----------------
void setupTime() {
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  
  // Wait for time to sync
  Serial.print("⏳ Syncing time");
  int attempts = 0;
  while (getCurrentTimeString() == "--:--:--" && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  Serial.println();
  
  if (getCurrentTimeString() != "--:--:--") {
    Serial.println("✅ Time synced: " + getCurrentTimeString());
  } else {
    Serial.println("⚠️ Time sync failed, but continuing...");
  }
}

String getCurrentTimeString() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) return "--:--:--";
  char buffer[16];
  strftime(buffer, sizeof(buffer), "%H:%M:%S", &timeinfo);
  return String(buffer);
}

// ----------------- UI -----------------
void drawBaseUI() {
  tft.fillScreen(ST77XX_BLACK);
  tft.drawLine(0, 40, 240, 40, ST77XX_WHITE);
  tft.drawLine(0, 280, 240, 280, ST77XX_WHITE);

  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.setCursor(5, 10);
  tft.print("Time: --:--:--");

  tft.setCursor(180, 10);
  tft.print("Wi-Fi: ...");

  tft.setTextSize(2);
  tft.setCursor(60, 130);
  tft.print("On Hold...");

  tft.setTextSize(2);
  tft.setCursor(60, 285);
  tft.print("TappTrack");
}

void updateTopBar() {
  tft.fillRect(0, 0, 240, 40, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.setCursor(5, 10);
  tft.print("Time: " + getCurrentTimeString());

  tft.setCursor(180, 10);
  tft.print("Wi-Fi:");
  if (WiFi.status() == WL_CONNECTED)
    tft.print(" OK");
  else
    tft.print(" ...");
}

void showDispatchBox(String msg) {
  tft.fillRect(20, 80, 200, 160, ST77XX_BLUE);
  tft.setTextColor(ST77XX_WHITE);
  tft.setTextSize(2);
  tft.setCursor(30, 140);
  tft.print("Dispatch!");
  tft.setTextSize(1);
  tft.setCursor(30, 180);
  tft.print("Tap NFC to confirm");
}

void showFaultDetails(String details) {
  tft.fillRect(20, 80, 200, 160, ST77XX_GREEN);
  tft.setTextColor(ST77XX_BLACK);
  tft.setTextSize(1);

  int y = 90;
  int x = 25;
  String word = "";
  for (int i = 0; i < details.length(); i++) {
    char c = details[i];
    if (c == ' ' || i == details.length() - 1) {
      if (i == details.length() - 1) word += c;
      tft.setCursor(x, y);
      tft.print(word);
      y += 15;
      word = "";
    } else word += c;
  }
}

void showTapInstruction() {
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_BLACK);
  tft.setCursor(35, 210);
  tft.print("NFC enabled - Tap to mark as resolved");
}

// ----------------- MQTT -----------------
void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  Serial.println("�� Received message:");
  Serial.println("Topic: " + String(topic));
  Serial.println("Payload: " + msg);

  String expectedTopic = "device/" + DEVICE_ID + "/dispatch";
  if (String(topic) == expectedTopic) {
    int fidStart = msg.indexOf("\"fault_id\":\"");
    int detailsStart = msg.indexOf("\"fault_details\":\"");

    if (fidStart != -1) {
      fidStart += 12;
      int fidEnd = msg.indexOf("\"", fidStart);
      activeFaultId = msg.substring(fidStart, fidEnd);
    } else activeFaultId = "unknown";

    if (detailsStart != -1) {
      detailsStart += 17;
      int detailsEnd = msg.indexOf("\"", detailsStart);
      activeFaultDetails = msg.substring(detailsStart, 
      detailsEnd);
    } else activeFaultDetails = "No details";

    Serial.println("Fault ID: " + activeFaultId);
    Serial.println("Details: " + activeFaultDetails);

    showDispatchBox("Dispatch Received! Tap NFC to Confirm");
    waitingForDispatchTap = true;
  }
}

// ----------------- Wi-Fi + MQTT -----------------
void setup_wifi() {
  Serial.println("�� Connecting to WiFi: " + String(ssid));
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("✅ WiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("❌ WiFi Connection Failed!");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("�� Connecting to MQTT broker: ");
    Serial.println(mqtt_server);
    
    // Generate unique client ID
    String clientId = "ESP32_" + DEVICE_ID + "_" + String(random
    (0xffff), HEX);
    
    // ✅ Added username and password
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      Serial.println("✅ MQTT Connected!");
      
      // Subscribe to dispatch topic
      String topic = "device/" + DEVICE_ID + "/dispatch";
      if (client.subscribe(topic.c_str())) {
        Serial.println("�� Subscribed to: " + topic);
      } else {
        Serial.println("❌ Subscription failed!");
      }
    } else {
      Serial.print("❌ MQTT Connection Failed! Error code: ");
      Serial.println(client.state());
      Serial.println("Retrying in 5 seconds...");
      delay(5000);
    }
  }
}

// ----------------- Setup -----------------
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n\n�� TappTrack ESP32 Starting...");
  Serial.println("================================");
  
  // Initialize Display
  Serial.println("��️  Initializing display...");
  Wire.begin(SDA_PIN, SCL_PIN);
  tft.init(240, 320);
  drawBaseUI();
  Serial.println("✅ Display ready");

  // Initialize NFC
  Serial.println("�� Initializing NFC reader...");
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("❌ PN532 not found!");
    while (1) delay(100);
  }
  Serial.println("✅ PN532 Found!");
  nfc.SAMConfig();

  // Connect to WiFi
  setup_wifi();
  
  // Setup secure MQTT connection
  Serial.println("�� Setting up secure MQTT...");
  espClient.setInsecure();  // Skip certificate verification
  client.setServer(mqtt_server, mqtt_port);  
  // ✅ Using mqtt_port (8883)
  client.setCallback(callback);
  client.setKeepAlive(60);
  client.setSocketTimeout(30);
  Serial.println("✅ MQTT client configured");
  
  // Setup time (required for TLS)
  setupTime();
  
  // Initial MQTT connection
  reconnect();
  
  Serial.println("================================");
  Serial.println("✅ Setup Complete! Device: " + DEVICE_ID);
  Serial.println("✅ Vehicle: " + VEHICLE_NUM);
  Serial.println("✅ Waiting for dispatch...\n");
}

// ----------------- Loop -----------------
void loop() {
  updateTopBar();
  
  // Maintain MQTT connection
  if (!client.connected()) {
    Serial.println("⚠️ MQTT disconnected, reconnecting...");
    reconnect();
  }
  client.loop();

  uint8_t uid[7];
  uint8_t uidLength;

  // --- Step 1: Wait for NFC to confirm dispatch ---
  if (waitingForDispatchTap) {
    if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, 
    &uidLength)) {
      Serial.println("✅ Dispatch confirmed via NFC!");
      waitingForDispatchTap = false;

      // Notify MQTT
      String payload = "{\"confirmed\":true,\"device_id\":\""
      + DEVICE_ID +
                       "\",\"vehicle_number\":\"" + VEHICLE_NUM 
                       +
                       "\",\"fault_id\":\"" + activeFaultId + "\"}";
      
      if (client.publish(("vehicle/" + VEHICLE_NUM + 
      "/confirmation").c_str(), payload.c_str())) {
        Serial.println("�� Confirmation sent successfully");
      } else {
        Serial.println("❌ Failed to send confirmation");
      }

      // Show fault details now
      showFaultDetails(activeFaultDetails);
      faultDisplayStart = millis();
      waitingForResolveTap = true;
      allowNFCTap = false;
    }
  }

  // --- Step 2: Show fault details & enable NFC after 10s ---
  if (waitingForResolveTap) {
    if (!allowNFCTap && millis() - faultDisplayStart >= 10000) {
      allowNFCTap = true;
      showTapInstruction();
      Serial.println("�� NFC tap enabled for resolution");
    }

    // --- Step 3: Wait for NFC tap to mark resolved ---
    if (allowNFCTap) {
      if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, 
      uid, &uidLength)) {
        Serial.println("✅ NFC Tap detected, marking as
        resolved...");
        waitingForResolveTap = false;
        allowNFCTap = false;

        String payload = "{\"resolved\":true,"
                         "\"device_id\":\"" + DEVICE_ID +
                         "\",\"vehicle_number\":\"" + 
                         VEHICLE_NUM +
                         "\",\"fault_id\":\"" + activeFaultId
                         + "\"}";
        
        if (client.publish(("vehicle/" + VEHICLE_NUM +
        "/resolved").c_str(), payload.c_str())) {
          Serial.println("�� Resolution sent successfully");
        } else {
          Serial.println("❌ Failed to send resolution");
        }

        delay(1000);
        drawBaseUI(); // back to On Hold
        activeFaultId = "";
        activeFaultDetails = "";
        Serial.println("�� Back to idle state\n");
      }
    }
  }

  delay(100);
}
```

## Hardware Components Purchase Receipts

This appendix includes scanned copies/receipts (pay slips) of the purchases for the key hardware components used in the project prototype. These documents verify the acquisition and associated costs of the components.

<figure id="fig:receipt1" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/E1.jpg" style={{width:"90.0%"}} />
<figcaption>Purchase Receipt 1 (e.g., ESP32-S3 or related component)</figcaption>
</figure>

<figure id="fig:receipt2" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/E2.png" style={{width:"90.0%"}} />
<figcaption>Purchase Receipt 2 (e.g., PN532 NFC Reader or related component)</figcaption>
</figure>

<figure id="fig:receipt3" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/E3.png" style={{width:"90.0%"}} />
<figcaption>Purchase Receipt 3 (e.g., SIM900A GSM Module or related component)</figcaption>
</figure>

<figure id="fig:receipt4" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/E4.png" style={{width:"90.0%"}} />
<figcaption>Purchase Receipt 4 (e.g., NEO M8L GPS Module or related component)</figcaption>
</figure>

<figure id="fig:receipt5" data-latex-placement="htbp">
<img src="/fleet-management-docs/img/appendix/E5.png" style={{width:"90.0%"}} />
<figcaption>Purchase Receipt 5 (e.g., Additional components such as TFT LCD, SD Card Module, or power supplies)</figcaption>
</figure>

## AI Dispatch Model Features, Training, and API Integration

This appendix details the machine learning model used for intelligent vehicle dispatching, including input features, rule-based target calculation, API endpoints, backend integration, synthetic training data generation, and performance metrics.

## Model Features (6 Features)

1.  **distance_m (float)**

    - Description: Distance from vehicle to fault location in meters

    - Range: 0 to $`\sim`$<!-- -->50,000+ meters

    - Calculation: OSRM route distance (with Haversine fallback)

    - Impact: Lower distance = higher score

2.  **distance_cat (int)**

    - Description: Distance category for categorical encoding

    - Values: 0: $`<`$ 1,000 meters; 1: 1,000–5,000 meters; 2: $`\geq`$ 5,000 meters

    - Calculation: Categorized from distance_m

3.  **past_perf (float)**

    - Description: Historical performance score

    - Range: 1.0 to 10.0

    - Calculation: (performance_ratio $`\times`$ 9) + 1 (where performance ratio: 0.0 worst to 1.0 best)

    - Source: Historical fault resolution success rate

4.  **fault_history (int)**

    - Description: Count of similar fault types handled by vehicle

    - Range: 0 to unlimited

    - Calculation: Count of resolved faults for vehicle

    - Impact: Higher count = more experience = higher score

5.  **fatigue_h (float)**

    - Description: Crew fatigue in hours

    - Range: 0.0 to 24.0 hours

    - Calculation: min(fatigue_count $`\times`$ 2, 24)

    - Fatigue count: Number of faults handled today

    - Impact: Lower fatigue = higher score

6.  **fault_severity (int)**

    - Description: Fault severity level

    - Values: 1: Low priority; 2: Medium priority; 3: High priority

    - Mapping: "Low" $`\to`$ 1; "Medium" $`\to`$ 2; "High" $`\to`$ 3

    - Source: Fault category field

## Model Training: Rule-Based Score Calculation (Training Target)

The synthetic training targets are generated using the following weighted rule-based score:

``` math
\begin{align*}
\text{rule\_score} &= 0.45 \times \text{distance\_score} & \text{\# Distance (inverse normalized)} \\
&+ 0.25 \times \text{fault\_history\_score} & \text{\# Fault history (normalized)} \\
&+ 0.15 \times \text{fatigue\_score} & \text{\# Fatigue (inverse normalized)} \\
&+ 0.05 \times \text{severity\_score} & \text{\# Severity (normalized)} \\
&+ 0.10 \times \text{performance\_score} & \text{\# Performance (normalized)}
\end{align*}
```

Normalized to 0–100 scale.

## API Endpoints

### Health Check

Example Response:

``` JSON
{
  "status": "healthy",
  "model_loaded": true,
  "model_features": 6,
  "error": null
}
```

### Model Information

Example Response:

``` JSON
{
  "loaded": true,
  "features": [
    "distance_m",
    "distance_cat",
    "past_perf",
    "fault_history",
    "fatigue_h",
    "fault_severity"
  ],
  "n_features": 6,
  "model_type": "RandomForestRegressor",
  "model_info": {
    "n_estimators": 200,
    "random_seed": 42,
    "training_samples": 2400,
    "test_samples": 600,
    "mae": 2.345,
    "r2": 0.987
  },
  "model_path": "models/dispatch_ml_model.pkl",
  "error": null
}
```

### Predict Best Vehicle

Example Request Body:

``` JSON
{
  "candidates": [
    {
      "distance_m": 1250.5,
      "distance_cat": 1,
      "past_perf": 8.2,
      "fault_history": 2,
      "fatigue_h": 4.0,
      "fault_severity": 3
    },
    {
      "distance_m": 3500.0,
      "distance_cat": 1,
      "past_perf": 6.5,
      "fault_history": 0,
      "fatigue_h": 8.0,
      "fault_severity": 3
    }
  ]
}
```

Example Response:

``` JSON
{
  "best_index": 0,
  "scores": [85.3, 72.1],
  "predictions": [ ... ]  % Full array as in document
}
```

### Train Model

Example Request and Response details as provided in the project documentation.

## Integration with Backend and Feature Extraction

The backend integrates with the ML service via environment variables and batch-optimized feature extraction (e.g., concurrent distance calculations, batch database queries for performance and fatigue).

Example extracted feature object:

``` JSON
{
  "distance_m": 1250,
  "distance_cat": 1,
  "past_perf": 8.2,
  "fault_history": 5,
  "fatigue_h": 4.0,
  "fault_severity": 3
}
```

## Project Resources

The complete source code, documentation, and related resources for the AI Powered Fleet Management and Visibility System are available online:

- **GitHub Repository:**

  https://github.com/SYD-Taha/Ai-Powered-Fleet-Management-and-Visibilty-System

- **Project Documentation:**

  https://github.com/SYD-Taha/fleet-management-docs

These resources provide access to the implementation details, setup instructions, and additional materials referenced throughout this document.

## Contact Information

For inquiries, collaboration, or further information about this project, please contact:

| **Name** | **Email** | **GitHub** |
|:---|:---|:---|
| Syed Taha Jameel | [tsyed504@gmail.com](mailto:tsyed504@gmail.com) | https://github.com/SYD-Taha |
| Rimsha Masood | [rimshamasood48@gmail.com](mailto:rimshamasood48@gmail.com) | https://github.com/RimshaMasood |
| Saman Aslam | [samanaslamdanish@gmail.com](mailto:samanaslamdanish@gmail.com) | https://github.com/ |
| Zoya Ali | [zoya56799@gmail.com](mailto:zoya56799@gmail.com) | https://github.com/Zoyaali11 |
