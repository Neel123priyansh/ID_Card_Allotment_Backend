const WebSocket = require("ws");

let currentEpc = "";

function initWebSocket(server)
{
    const wss =
    new WebSocket.Server({
        server
    });

    wss.on(
        "connection",
        (ws)=>
        {
            console.log(
                "Client Connected"
            );

            ws.send(
                JSON.stringify({
                    epc:currentEpc
                })
            );
        }
    );

    return {
        updateEpc:(epc)=>
        {
            currentEpc = epc;

            wss.clients.forEach(
                client=>
                {
                    if(
                        client.readyState ===
                        WebSocket.OPEN
                    )
                    {
                        client.send(
                            JSON.stringify({
                                epc
                            })
                        );
                    }
                }
            );
        }
    };
}

module.exports =
{
    initWebSocket
};