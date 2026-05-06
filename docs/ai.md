---
sidebar_position: 7
title: "Artificial Intelligence"
---

# Artificial Intelligence


## Introduction

Artificial Intelligence (AI) has quickly become one of the biggest technology in many areas of work. It is the heart of everything. In fleet management and utility services, AI is now a key tool for making quick decisions, working together in advance analytics and keeping operations strong and efficient. Older fleet systems mostly responded after problems happened and dispatchers(people) made choices using not much information mostly guesswork or fixed data which often led to delays and mistakes. But today, in utility work where time is very important during power outages, storm repairs and urgent services, these old ways are not enough anymore.

The need for intelligent dispatching and decision-making arises from the limitations identified in Sections 1.2 and 1.3.2 of Chapter 1, including inefficient routing and lack of smart task allocation. This chapter looks at how AI helps improve the AI-Powered Real-Time Fleet Tracking and Dispatch System. It explains AI does not work alone and how it connects with different data sources like GPS devices, NFC tags, sensors, backend APIs and even outside data such as traffic and weather conditions and makes smart choices for sending out crews and sets up the system to grow and improve in the future. These suggestions appear on the main dashboard for easy use.

## Role of AI in Fleet Management

AI plays an important role in our system i.e. fleet management in more ways than just keeping track of vehicles. Unlike in traditional fleet system, it helps make responses faster, ensures safety rules are followed and makes the process of fixing issues more efficient. In our system, the AI/ML Dispatch Engine is a machine learning microservice that helps choose the best vehicle for sending to a fault using a Random Forest regression model. Dispatch is important because in big power utility operations, there are many vehicles and crews at different places, each with different workloads, experience levels, and ability to respond quickly. For example, imagine a transformer fault happens in a residential area. Vehicle A is closest to the fault, but its crew has been working for a long time and isn’t very experienced with transformer problems. Vehicle B is a bit farther away, but its crew is well-rested and has a good track record of fixing similar faults. When people manually assign vehicles, they often use their judgment or set rules, which might not always pick the best vehicle for the job.

The Random Forest model looks at several factors to decide which vehicle is best. These include how far the vehicle is from the fault, how tired the crew is, how well they have handled similar issues before, how serious the fault is and their past experience. The model uses many decision trees to make predictions and gives each vehicle a score showing how suitable it is for the job. The vehicle with the highest score gets chosen. This approach helps respond faster and fix problems more reliably, which helps solve the issues with task allocation mentioned in Sections 1.2 and 1.3.2 of Chapter 1. It contributes in the following ways

Key Features:

- Machine Learning-Based Prediction: Uses Random Forest model to score vehicle candidates.

- Automatic Fallback: Falls back to rule-based dispatch if ML service is unavailable.

- RESTful API: FastAPI-based microservice with health checks and model management.

- Batch Processing: Efficient batch feature extraction and prediction.

- Model Training: On-demand model training via API or standalone script

- Feature Engineering: 6 features extracted from vehicles and faults

A comparison of traditional fleet systems vs AI-enabled systems is presented in Table <a href="#tab:6.1" data-reference-type="ref" data-reference="tab:6.1">1.1</a>.

<div id="tab:6.1">

| **Feature** | **Traditional System** | **AI-enabled System (Our System)** |
|:---|:---|:---|
| Dispatching Decision | Manual, experience-based | Automated, data-driven with weighted factors |
| Fault Response | Reactive | Predictive & Proactive using historical + Live data |
| Route Planning | Static GPS based | Dynamic, AI-optimized in real-time |
| Safety Consideration | Limited | Integrated with compliance checks |
| Scalability | Low | High, supports multiple crews and vehicles |

Traditional vs AI-enabled Fleet Management

</div>

As shown in Table <a href="#tab:6.1" data-reference-type="ref" data-reference="tab:6.1">1.1</a>, there is a comparison between old ways of managing a fleet of vehicles and newer methods that use AI. The old ways depend a lot on people checking things manually and making decisions after problems happen, which can cause things to go wrong, take longer and cost more. On the other hand, AI-based methods use real-time information, predict future needs and automatically assign tasks to vehicles. This comparison shows how AI changes fleet management from just fixing problems when they occur to being able to plan and act smartly before issues happen.

## Technology Stack

- Framework: FastAPI (Python)

- ML Library: scikit-learn (RandomForestRegressor)

- Data Processing: pandas, numpy

- Model Persistence: joblib

## System Architecture

### High-Level Architecture

The AI/ML Dispatch Engine operates within the Data and Processing Layer described in Section 1.6 of Chapter 1, receiving inputs from the hardware layer via backend APIs. The AI/ML Dispatch Engine follows a microservice-based architecture as shown in figure 6.2. The backend dispatch controller communicates with a dedicated ML service implemented using FastAPI. The backend is responsible for feature extraction, while the ML service focuses solely on prediction and model management.

At a high level, the dispatch workflow consists of the following steps and the software module connectivity shown in Figure no. 6.1):

1.  The backend identifies all available vehicles.

2.  Relevant features are extracted for each vehicle-fault pair.

3.  The ML service is invoked to predict dispatch scores.

4.  The vehicle with the highest score is selected.

5.  If the ML service fails, the system automatically falls back to rule-based dispatch.

<figure id="fig:6.1" data-latex-placement="H">
<img src="/img/ai/7.1.png" style={{width:"80.0%"}} />
<figcaption>High Level Architecture of the AI/ML Dispatch Engine shows two-way synchronous REST communication between backend and ML dispatch service.</figcaption>
</figure>

### Component Architecture

The ML service is structured into clearly separated components to ensure maintainability and scalability (Figure <a href="#fig:6.2" data-reference-type="ref" data-reference="fig:6.2">1.2</a>):

- FastAPI Application Layer: Handles incoming API requests and responses.

- Model Layer: Manages model loading, caching and prediction logic.

- Training Layer: Handles model training and retraining operations.

- Schema Layer: Defines request and response validation using Pydantic.

The backend interacts with the ML service through RESTful APIs, making the system loosely coupled and deployment-friendly.

<figure id="fig:6.2" data-latex-placement="H">
<img src="/img/ai/7.2.png" style={{width:"80.0%"}} />
<figcaption>Component Architecture of the AI/ML Dispatch Engine shows internal structure of the ML service, including API layer, model management and training components.</figcaption>
</figure>

## Model Design and Details

### Model Selection

The dispatch engine uses a RandomForestRegressor due to its robustness, ability to handle non-linear relationships and resistance to overfitting. Random Forest models are well-suited for structured tabular data and provide stable performance without extensive hyper parameter tuning.

### Model Configuration

- Algorithm: RandomForestRegressor

- Estimators (Number of Trees): 200

- Output: Dispatch score on a scale of 0 - 100

- Training Data: Synthetic data generated from rule-based scoring

- Input(Model) Features: 6

### Model Features

The model evaluates each candidate vehicle using six carefully engineered features (Figure <a href="#fig:6.3" data-reference-type="ref" data-reference="fig:6.3">1.3</a>):

1.  Distance to Fault (distance_m): The physical distance between the vehicle and the fault location, measured in meters. Shorter distances result in higher dispatch suitability.

2.  Distance Category (distance_cat): A categorical representation of distance to help the model learn distance-based patterns efficiently.

3.  Historical Performance (past_perf): A normalized score representing the vehicle’s past fault resolution success rate, scaled from 1 to 10.

4.  Fault History (fault_history): The number of similar faults previously resolved by the vehicle, representing experience.

5.  Crew Fatigue (fatigue_h): Estimated fatigue level in hours based on the number of faults handled during the day.

6.  Fault Severity (fault_severity): Encodes the priority level of the fault as low, medium or high.

<figure id="fig:6.3" data-latex-placement="H">
<img src="/img/ai/7.3.png" style={{width:"80.0%"}} />
<figcaption>The decision-making process, Inputs such as distance etc are processed by the AI Dispatch Engine to generate the optimal crew assignment.</figcaption>
</figure>

A summary of factors and their role is shown in Table <a href="#tab:6.2" data-reference-type="ref" data-reference="tab:6.2">1.2</a>.

<div class="adjustbox">

max width=

<div id="tab:6.2">

| **Feature** | **Purpose** | **Example Use Case** | **Source in Our System** |
|:---|:---|:---|:---|
| Distance to Fault (distance_m) | Minimize response time | Vehicle 1.2 km away is preferred over one 5 km away | GPS device → Backend API |
| Distance Category (distance_cat) | Improve model learning efficiency | Fault categorized as Near, Medium or Far for faster prediction | Derived from GPS distance (Backend logic) |
| Historical Performance (past_perf) | Ensure reliable fault resolution | Crew with performance score 8/10 chosen over lower-rated crew | Task & resolution logs (MySQL database) |
| Fault History (fault_history) | Leverage prior experience | Crew previously fixed transformer faults | Fault records & service history (Database logs) |
| Crew Fatigue (fatigue_h) | Balance workload & safety | Crew working 9+ hours is deprioritized | NFC attendance + daily task logs |
| Fault Severity (fault_severity) | Prioritize critical faults | High-severity fault near hospital handled first | Work order & fault classification system |

Dispatching Factors, their Purpose, Example Use Case and Source in the System

</div>

</div>

These AI model features are derived from real-world operational data, such as distance, crew experience, workload and fault severity into numerical features to intelligently select and dispatch the most suitable crew in real time.

## Feature Extraction and Engineering

Feature extraction is performed in the backend to minimize ML service complexity and reduce response latency. All features are calculated in batch to improve efficiency.

### Distance Calculation (distance_m, distance_cat)

Distance is calculated using OSRM-based route estimation when available. If routing fails, the system falls back to the Haversine formula to ensure uninterrupted operation.

### Performance and Fatigue Metrics (past_perf, fault_history, fatigue_h)

Historical performance and fatigue levels are computed using batch database queries, significantly reducing system overhead. Performance values are normalized to match the ML model’s expected input range.

### Fault Severity Mapping (fault_severity)

Fault categories are mapped to numeric severity levels to enable direct use by the machine learning model.

## Model Training Strategy

### Synthetic Data Generation

Due to the unavailability of sufficient historical dispatch data, the model is trained using synthetically generated data. Statistical distributions are used to simulate realistic operational conditions, including distance, performance, fatigue and fault severity.

### Rule-Based Target Generation

Target dispatch scores are generated using an existing rule-based scoring mechanism. This allows the ML model to learn and approximate expert-defined decision logic.

### Training and Evaluation

The dataset is split into training and testing sets using an 80:20 ratios.

Model performance is evaluated using:

- Mean Absolute Error (MAE):  2-3 points (on 0-100 scale)

- R² Score:  0.98-0.99 (high accuracy)

- Training Time:  5-30 seconds (depending on n_samples)

Experimental results show high accuracy, with MAE values around 2 - 3 points and R² scores close to 0.99.

## API Design and Backend Integration

The ML service exposes RESTful APIs for health monitoring, prediction, model information and training. These APIs allow seamless integration with the backend dispatch controller.

1.  **Health Check**\

    - Endpoint: GET /api/health

    - Purpose: Check service health and model availability

    - Status Codes:

      - 200: Service is healthy

      - 503: Service unhealthy or model not loaded

2.  **Model Information**\

    - Endpoint: GET /api/model/info

    - Purpose: Get detailed model information

    - Status Codes:

      - 200: Model info retrieved successfully

      - 500: Error retrieving model info

3.  **Predict Best Vehicle**\

    - Endpoint: POST /api/predict

    - Purpose: Predict the best vehicle from candidate list

    - Status Codes:

      - 200: Prediction successful

      - 400: Invalid request (missing features, invalid values)

      - 503: Model not available

      - 500: Prediction error

    - Validation Rules:

      - distance_m: \>= 0

      - distance_cat: 0, 1, or 2

      - past_perf: 1.0 to 10.0

      - fault_history: \>= 0

      - fatigue_h: 0.0 to 24.0

      - fault_severity: 1, 2, or 3

4.  **Train Model**\

    - Endpoint: POST /api/train

    - Purpose: Train or retrain the ML model

    - Status Codes:

      - 200: Training completed successfully

      - 409: Training already in progress

      - 500: Training failed

Note: After training, the model is automatically reloaded.

### Prediction Workflow

The backend sends a batch of candidate vehicle features to the ML service. The service validates inputs, predicts dispatch scores and returns the index of the best candidate along with detailed scores.

### Backend Integration

The AI module receives real-time data from the hardware layer described in Chapter 1 through backend APIs, ensuring seamless integration between physical devices and intelligent decision-making components. The backend dynamically checks ML service availability. If the ML service responds successfully, the ML-based selection is used, otherwise, the system switches to rule-based dispatch without interrupting operations.

<figure id="fig:6.4" data-latex-placement="H">
<img src="/img/ai/7.4.png" style={{width:"80.0%"}} />
<figcaption>Layered architecture diagram showing hardware → backend → AI engine → APIs → dashboard.</figcaption>
</figure>

Functions for Integration with Backend are:

- isMLServiceAvailable(): Check if ML service is healthy and model is loaded

- predictBestVehicle(candidates): Get prediction for vehicle candidates

- getMLModelInfo(): Get model information

- trainMLModel(options): Train/retrain model

This organized process ensures that hardware, software and AI parts work well together. It helps make quick, informed dispatching decisions that improve efficiency and the reliability of operations.

## Testing and Validation

### Unit Testing

Individual ML service endpoints are tested using manual API calls and automated scripts to ensure correct functionality and validation handling.

### Integration Testing

End-to-end tests are conducted from the backend to verify correct feature extraction, ML predictions and vehicle selection.

### Performance Testing

Latency and throughput tests confirm that prediction requests typically complete within 100 ms, meeting real-time dispatch requirements.

## Challenges and Troubleshooting in AI Deployment

Using AI/ML in our real-time fleet management system face various challenges. They are listed below

- Model Not Found: Error: Model not available or Model file not found.

- ML Service Unavailable: Error: Connection refused or timeout.

- Invalid Feature Values: Error: Missing required features or Invalid candidate values.

- Prediction Returns Invalid Index: Error: best Index out of bounds

- Slow Predictions: Symptoms: High latency on prediction requests.

These challenges and their mitigation strategies are summarized in Figure <a href="#fig:6.6" data-reference-type="ref" data-reference="fig:6.6">1.5</a>.

<figure id="fig:6.6" data-latex-placement="H">
<img src="/img/ai/7.5.png" style={{width:"80.0%"}} />
<figcaption>AI Deployment Challenges and their Solutions</figcaption>
</figure>

## Limitations and Potential Extensions of AI (Future Scope)

While our current system demonstrates strong performance, it relies on synthetic training data. Future improvements include integrating real historical dispatch data, expanding feature sets, testing advanced ML models and implementing automated retraining pipelines.

### Direct Extensions (Short-term Factors)

These factors are not added yet, but they can be included in future updates.

**Model Improvements**

- Real Training Data: Replace synthetic data with historical dispatch data

- Feature Engineering: Add more features (weather, traffic, time of day)

- Model Selection: Test other algorithms (XGBoost, Neural Networks)

- Hyperparameter Tuning: Optimize RandomForest parameters

- Online Learning: Incremental model updates from new data

**Service Improvements**

- Model Versioning: Support multiple model versions

- A/B Testing: Compare ML vs rule-based performance

- Prediction Caching: Cache predictions for similar scenarios

- Batch Predictions: Support multiple faults at once

- Model Monitoring: Track prediction accuracy over time

**Integration Improvements**

- Feature Store: Centralized feature management

- Model Registry: Track model versions and performance

- Automated Retraining: Schedule periodic model retraining

- Performance Metrics: Dashboard for ML dispatch statistics

### Advanced Research-Oriented Extensions (Long-term Factors)

Future versions of the system can include more advanced AI features, such as:

- Predictive and Maintenance Models: This will help to find problems with vehicles or equipment before they happen.

- Federated Learning: This will helps improve AI models used by different utilities without actually sharing personal or raw data.

- Computer Vision Integration: This uses cameras like CCTV to spot dangerous situations, unsafe actions or damaged things.

- Dynamic Risk-aware Routing: Routes can change in real time to avoid floods, storms or dangerous areas.

- Carbon and Environmental Optimization: This helps reduce emissions and use less fuel.

- Adaptive Learning from Storm Events: After a storm, the AI learns from what happened to better prepare and respond next time.

- Clustering Algorithms: It is used to look at how faults happen in different areas of the country and groups those faults geographically to help dispatchers use resources timely and efficiently.

- Reinforcement Learning (RL): It helps in planning and selecting the best route dynamically by learning from traffic and weather updates.

<figure id="fig:6.7" data-latex-placement="H">
<img src="/img/ai/7.6.png" style={{width:"80.0%"}} />
<figcaption>Potential future AI extensions for fleet tracking and dispatching.</figcaption>
</figure>

As shown in Figure <a href="#fig:6.7" data-reference-type="ref" data-reference="fig:6.7">1.6</a>, a mind map shows possible future uses of AI in fleet management. These include predictive maintenance, federated learning, using computer vision, creating routes that consider risks, reducing carbon impact and learning from storm events. These new ideas show where AI in fleet management might go next. They go beyond what the project is doing now and provide ways to grow and stay strong over time.

## Summary

This chapter fulfills the intelligent decision-making objectives outlined in Section 1.9 of Chapter 1, completing the proposed AI-powered fleet management solution. It explained how AI is built into our system, not just as a regular tool but as the main part that makes decisions. Each part showed how AI changes information from GPS, NFC and traffic into real actions through the backend integration and frontend visuals. It also talked about the challenges and future plans, showing what has been done so far and what is next for growing the system.
