import * as signalR from "@microsoft/signalr";

export let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (setProgress:(value:number)=>void) => {
    if (connection) return;

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://websocket-api.classbon.com/hub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Error)
        .build();

    try {
        await connection.start();
        console.log("WebSocket connected");
    } catch (error) {
        console.log("WebSocket error", error);
    }

    connection.on("ReceiveProgress", (message: string) => {
        try {
            console.log(message);
            const progressValue = parseInt(message,10)
            setProgress(progressValue)


        } catch (error) {
            console.log("err parsing data");


        }


    })
};

export const startProgress = async () => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("StartLongRunningTask")
        } catch (error) {
            console.log("websocket err", error);


        }

    }

}
