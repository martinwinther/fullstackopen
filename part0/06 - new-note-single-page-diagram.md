```mermaid
sequenceDiagram
participant browser
participant server

    Note right of browser: User is already on the SPA

    Note right of browser: User enters text and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON response (new note)
    deactivate server

    Note right of browser: Browser updates the UI without a full page reload
```
