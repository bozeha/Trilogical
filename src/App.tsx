import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { login } from "./utils/functions";

import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState<any>();
  const flow = async () => {
    login().then((token) => JoinRoom(token));
  };
  useEffect(() => {
    flow();
  }, []);

  const JoinRoom = async (token: any) => {
    console.log(`token:::: ${token}`);
    const hubUrl = "http://62.90.114.24:9106/ClientHub";
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVXNlck5hbWUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEcml2ZXIiLCJHZW5lcmljSWQiOiI1ZTUwMjEwMS02MWZjLTQzYmUtOGQ5Zi1kZmU3ZDIzZjQyOWEiLCJFeHBpcmF0aW9uIjoiMjAyMy0wOC0xOSAxNjozMToyMyIsIlNlcnZlcklkIjoiNjM4MTk4MzUyNDE5NjE1MjM0IiwiQ2xpZW50RW51bWVyYXRlIjoiNjM4Mjc5NzMwODMzODUxMDE2IiwiZXhwIjoxNjkyNDYyNjgzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYifQ.0Ud6wOWepLX5qH51cpPmHw_TnvVz2uQIG7g_vCQVi-Y";
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://62.90.114.24:9106/ClientHub", {
          withCredentials: true,
          accessTokenFactory: async () => token, // Pass the JWT token to the connection
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Information)
        .build();

      // connection.onclose((e) => {
      //   setConnection();
      //   setMessages([]);
      //   setUsers([]);
      // });

      // Define a function to handle received data
      const handleData = (data: any) => {
        console.log("Received data:", data);
      };

      // Start the SignalR connection and handle incoming data
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");
          connection.on("ReceiveData", handleData);
        })
        .catch((error) => {
          console.error("Error connecting to SignalR hub:", error);
        });

      // Cleanup: stop the connection when the component unmounts
      // return () => {
      //   connection.stop();
      // };
      // .then(() => {
      //   console.log("Connected to SignalR hub");
      //   connection.on("ReceiveData", (data) => {
      //     console.log(data);
      //   }); // "ReceiveData" should match the server-side method name
      //   connection.on("DataReceived", (data) => {
      //     console.log("Received data:", data);
      //     // setReceivedData((prevData) => [...prevData, data]); // Update state with received data
      //   });
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const listener = async () => {
    const hubUrl = "http://62.90.114.24:9106/ClientHub";
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVXNlck5hbWUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEcml2ZXIiLCJHZW5lcmljSWQiOiI1ZTUwMjEwMS02MWZjLTQzYmUtOGQ5Zi1kZmU3ZDIzZjQyOWEiLCJFeHBpcmF0aW9uIjoiMjAyMy0wOC0xOSAxNjozMToyMyIsIlNlcnZlcklkIjoiNjM4MTk4MzUyNDE5NjE1MjM0IiwiQ2xpZW50RW51bWVyYXRlIjoiNjM4Mjc5NzMwODMzODUxMDE2IiwiZXhwIjoxNjkyNDYyNjgzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkxMDYifQ.0Ud6wOWepLX5qH51cpPmHw_TnvVz2uQIG7g_vCQVi-Y";
    try {
      // const connection = new HubConnectionBuilder()
      //   .withUrl(hubUrl, {
      //     accessTokenFactory: async () => jwtToken, // Pass the JWT token to the connection
      //     skipNegotiation: true,
      //   })
      //   .configureLogging(LogLevel.Information)
      //   .build();
    } catch (error) {
      console.log(`Error:::${error}`);
    }
  };
  return <div className="App"></div>;
}

export default App;
