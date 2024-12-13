import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App"; // Import the AppWrapper component that wraps your main App with Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppWrapper /> {/* Render the AppWrapper that contains the Router */}
    </React.StrictMode>
);
