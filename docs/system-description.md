---
sidebar_position: 3
title: "System Description"
---

# System Description

# System Design and Architecture

## Overview

The Fleet Management System is built on a distributed microservices architecture designed for intelligent vehicle dispatch, real-time GPS tracking, and automated fault management. The system consists of four primary components working together to provide a comprehensive fleet management solution with AI-powered decision-making capabilities.

### System Components

The system is composed of the following main components:

1.  **Frontend Application** (React/TypeScript) – User interface and real-time visualization

2.  **Backend Service** (Node.js/Express) – Core business logic and API gateway

3.  **ML Service** (Python/FastAPI) – Machine learning dispatch predictions

4.  **Vehicle Simulator** (Node.js) – Hardware device simulation for testing

## Overall System Architecture

### High-Level Architecture Diagram

<figure id="fig:3.1" data-latex-placement="h">
<img src="chapter3/figs/3.1.png" style="width:95.0%" />
<figcaption>High-Level Architecture Diagram</figcaption>
</figure>

## Frontend Application

The frontend is a modern single-page application built with React and TypeScript, providing an intuitive interface for fleet management.

### Key Technologies

- Framework: React 18

- Language: TypeScript

- Build Tool: Vite

- State Management: React Context API + TanStack Query

- UI Library: Tailwind CSS + shadcn/ui

- Maps: MapLibre GL JS

- Real-time: Socket.io Client

### Frontend Components

The frontend is organized into modular components:

- **Dashboard**: Main control panel with real-time updates

- **MapView**: Interactive map with vehicle markers and routes

- **FleetList**: Vehicle status and management panel

- **DispatchPanel**: Fault management and dispatch interface

- **AlertSystem**: Real-time notification handler

- **Auth Components**: Login and access control

### Frontend Architecture

- Component-based architecture

- Custom hooks for API interactions

- Global state management for shared data

- Responsive design for desktop/mobile

- Dark/Light mode support

### Data Flow in Frontend

1.  API calls via TanStack Query for data fetching

2.  WebSocket events for real-time updates

3.  Context providers for global state

4.  Local storage for user preferences

## Backend Service

The backend serves as the central orchestration layer, handling business logic, database interactions, and integration with other services.

### Key Technologies

- Runtime: Node.js 20

- Framework: Express.js

- Database: MongoDB with Mongoose

- Real-time: Socket.io

- Cache: Node-cache

- Logging: Winston

- Validation: Joi

### Backend Structure

- **Routes/Controllers**: API endpoints organization

- **Services**: Business logic modules

- **Models**: Database schemas

- **Middleware**: Authentication, error handling

- **Utils**: Helper functions

### Key Backend Features

- RESTful API with JWT authentication

- Real-time WebSocket server

- AI-powered dispatch engine

- GPS tracking and route calculation

- Fault management workflow

- Vehicle and trip tracking

### Backend Data Models

- User/Driver schemas with roles

- Vehicle with status and location

- Fault with priority and assignment

- Trip with start/end metrics

- GPS points with timestamps

## ML Service

The ML service provides intelligent dispatch recommendations using machine learning models.

### Key Technologies

- Framework: FastAPI

- ML Library: scikit-learn

- Data Processing: pandas, numpy

- Model Persistence: joblib

### ML Service Structure

- API endpoints for prediction/training

- Model loading and caching

- Feature validation

- Training pipeline

- Health monitoring

### Model Details

- Type: RandomForestRegressor

- Features: Distance, performance, fatigue, etc.

- Training: Synthetic data with rule-based targets

- Prediction: Batch scoring for candidates

### ML Integration

- REST API calls from backend

- Fallback to rule-based if unavailable

- On-demand model training

- Performance metrics tracking

## Vehicle Simulator

The simulator emulates hardware devices for development and testing.

### Key Technologies

- Runtime: Node.js

- HTTP Client: Axios

- MQTT Client: mqtt.js

- Routing: OSRM API with Haversine fallback

### Simulator Components

- Vehicle state management

- Route calculation

- GPS movement simulation

- Dispatch polling

- Work completion timer

### Simulation Features

- Multiple vehicle support

- Real-time GPS publishing

- Automatic status updates

- Route following with waypoints

- MQTT and API integration

### Simulator Workflow

- Poll for dispatches

- Calculate and follow routes

- Send periodic GPS updates

- Simulate arrival and work

- Reset after completion

## System Integration Details

### Frontend-Backend Integration

- REST API for data operations

- WebSocket for real-time events

- JWT authentication

- Query caching with TanStack

### Backend-ML Service Integration

- HTTP REST API calls

- Health check before prediction

- Feature extraction in backend

- Fallback rule-based dispatch

### Backend-Simulator Integration

- REST API for status/GPS

- MQTT for alerts/confirmations

- Polling for dispatch detection

- Real-time GPS streaming

### Backend-External Services Integration

#### OSRM Routing Service

**Communication Protocol**: HTTP REST API

**Integration Strategy**:

- Circuit breaker pattern for resilience

- Automatic fallback to Haversine distance calculation

- Route caching (5-minute TTL) to reduce API calls

- Consistent coordinate format: \[latitude, longitude\]

**Error Handling**:

- Circuit breaker opens after 3 failures

- Automatic recovery after 60 seconds

- Fallback calculation using Haversine formula

#### MQTT Broker (HiveMQ Cloud)

**Communication Protocol**: MQTT over TLS (mqtts)

**Integration Strategy**:

- Persistent connection with auto-reconnection

- Message queuing when disconnected

- QoS Level 1 (at least once delivery)

- Topic-based message routing

**Topics Structure**:

- Subscriptions: `vehicle/{vehicle_number}/confirmation`, `vehicle/{vehicle_number}/resolved`

- Publications: `device/{device_id}/dispatch`

### Database Integration

**Database**: MongoDB

**Integration Strategy**:

- Mongoose ODM for schema validation

- Connection pooling (2–10 connections)

- Indexes for performance optimization

- Transaction support for atomic operations

**Data Models**:

- Vehicle, Fault, Trip, GPS, Route, User, Driver, Alert, HardwareDevice

**Relationships**:

- Reference-based relationships (ObjectId references)

- Embedded documents for simple nested data

- One-to-many and many-to-many relationships

### Container Integration (Docker)

**Integration Strategy**:

- Docker Compose for multi-container orchestration

- Service discovery via container names

- Environment variables for configuration

- Volume mounts for persistent data

- Network isolation and communication

**Container Dependencies**:

- Frontend depends on Backend

- Backend depends on ML Service

- All services connect to MongoDB

- Backend connects to MQTT Broker (external)

- Backend connects to OSRM (external)

### Authentication and Authorization Integration

**Integration Strategy**:

- JWT tokens for stateless authentication

- Role-based access control (RBAC)

- Token storage in frontend (localStorage)

- Token validation middleware in backend

- Optional authentication for development

**Flow**:

1.  User logs in via `/api/auth/login`

2.  Backend validates credentials and generates JWT

3.  Frontend stores token and includes in requests

4.  Backend validates token on protected routes

5.  Role-based permissions enforced at controller level

## System Integration Summary

The system integrates multiple components through well-defined interfaces and communication protocols:

1.  **Frontend $`\leftrightarrow`$ Backend**: REST API and WebSocket for bidirectional communication

2.  **Backend $`\leftrightarrow`$ ML Service**: HTTP REST API with automatic fallback

3.  **Backend $`\leftrightarrow`$ Simulator**: REST API and MQTT for dual-channel communication

4.  **Backend $`\leftrightarrow`$ External Services**: HTTP (OSRM) and MQTT (HiveMQ) with resilience patterns

5.  **All Services $`\leftrightarrow`$ Database**: MongoDB with Mongoose ODM

Each integration point implements appropriate error handling, fallback mechanisms, and resilience patterns to ensure system reliability and availability.

**Document Version**: 1.0 **Last Updated**: 2025-01-XX **Status**: Complete
