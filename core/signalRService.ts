import * as signalR from "@microsoft/signalr";

export let connection: signalR.HubConnection | null = null;

export interface Location {
    lat: number;
    lon: number;
}

export const startSignalRConnection = async (
    setProgress: (value: number) => void,
    addLocation: (location: Location) => void,
) => {
    if (connection) return;

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://websocket-api.classbon.com/hub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Error)
        .build();

    try {
        await connection.start();
        console.log("WebSocket connected");

        // Set up event listeners after starting the connection
        connection.on("ReceiveProgress", (message: string) => {
            try {
                console.log(message);
                const progressValue = parseInt(message, 10);
                setProgress(progressValue);
            } catch (error) {
                console.error("Error parsing progress data:", error);
            }
        });

        connection.on("ReceiveLocation", (message: any) => {
            try {
                const location: Location = message;
                console.log(location);
                addLocation(location);
            } catch (error) {
                console.error("Error parsing location data:", error);
            }
        });

    } catch (error) {
        console.error("WebSocket error:", error);
    }
};

export const startProgress = async (addLocation: (location: Location) => void) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("StartLongRunningTask");
        } catch (error) {
            console.error("WebSocket error starting long running task:", error);
        }
    }
};

export const startTracking = async () => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("StartTracking");
        } catch (error) {
            console.error("WebSocket error starting tracking:", error);
        }
    }
};
