import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { login } from "./utils/functions";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
function App() {
  useEffect(() => {
    login();
    listener();
  }, []);

  const listener = async () => {
    const hubUrl = "http://62.90.114.24:9106/ClientHub";
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVXNlck5hbWUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEcml2ZXIiLCJHZW5lcmljSWQiOiI1ZTUwMjEwMS02MWZjLTQzYmUtOGQ5Zi1kZmU3ZDIzZjQyOWEiLCJFeHBpcmF0aW9uIjoiMjAyMy0wOC0xOSAxNjozMToyMyIsIlNlcnZlcklkIjoiNjM4MTk4MzUyNDE5NjE1MjM0IiwiQ2xpZW50RW51bWVyYXRlIjoiNjM4Mjc5NzMwODMzODUxMDE2IiwiZXhwIjoxNjkyNDYyNjgzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYifQ.0Ud6wOWepLX5qH51cpPmHw_TnvVz2uQIG7g_vCQVi-Y";
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: async () => jwtToken, // Pass the JWT token to the connection
        })
        .configureLogging(LogLevel.Information)
        .build();

      const handleData = (data: any) => {
        console.log("Received data:", data);
      };

      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");
          connection.on("ReceiveData", handleData); // "ReceiveData" should match the server-side method name
          connection.on("DataReceived", (data) => {
            console.log("Received data:", data);
            //setReceivedData((prevData) => [...prevData, data]); // Update state with received data
          });
        })
        .catch((error) => {
          console.error("Error connecting to SignalR hub:", error);
        });
    } catch (error) {
      console.log(`Error:::${error}`);
    }
  };
  return <div className="App"></div>;
}

export default App;
