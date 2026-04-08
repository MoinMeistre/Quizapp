# Quizapp Architecture Diagram

This diagram illustrates the flow of data and the separation of concerns between the frontend (MVP pattern), the backend API, and the database.

```mermaid
graph TD
    subgraph "Client (Browser)"
        User((User))
        
        subgraph "Frontend - MVP Pattern"
            View[View - DOM & Events]
            Presenter[Presenter - Logik]
            Model[Model - Datenzugriff]
        end

        SW[Service Worker - Network Proxy]
        
        Cache[(Browser Cache)]
    end

    subgraph "External Resources"
        subgraph "Assets"
            HTML[index.html]
            CSS[styles.css]
            JSON_Data[(questions.json)]
        end

        subgraph "Server (PHP)"
            API[API: login, register, scores]
            SQLite[(data.sqlite)]
        end
    end

    %% Interactions
    User <--> View
    View <--> Presenter
    Presenter <--> Model
    
    %% Service Worker Proxy Logic
    Model <--> SW
    SW <--> Cache
    SW <--> API
    SW <--> HTML
    SW <--> CSS
    SW <--> JSON_Data

    %% Backend Flow
    API <--> SQLite

    %% Styling
    style SW fill:#fcf,stroke:#333,stroke-width:3px
    style User fill:#f9f,stroke:#333,stroke-width:2px
    style SQLite fill:#f96,stroke:#333,stroke-width:2px
    style Presenter fill:#bbf,stroke:#333,stroke-width:2px
    style Cache fill:#ddd,stroke:#333,stroke-dasharray: 5 5

```

### Component Breakdown
1.  **View**: Responsible for the visual representation and capturing user events (clicks, inputs).
2.  **Presenter**: Validates logic, coordinates between the Model and View. It tells the View what to show and the Model when to fetch data.
3.  **Model**: Manages application state and communicates with external APIs or local JSON files.
4.  **Service Worker**: Intercepts network requests to provide offline support (PWA).
5.  **PHP API**: Processes authentication and score persistence logic.
6.  **SQLite**: A lightweight database storing user credentials and leaderboard data.
