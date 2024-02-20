//@ts-ignore
import SocketIOClient, { Socket } from "socket.io-client";
import { getAuthValue } from "src/Modules/AuthModule/Hooks/useAuthValue";
export const SOCKET_URL = process.env.NEXT_PUBLIC_API_SOCKET_URL;
class ChatClient {
  ws: Socket | undefined;

  connect = () => {
    const { token } = getAuthValue();
    this.ws = SocketIOClient(`${SOCKET_URL}?token=${token}` , {
      reconnection: true,
      query: {
        token,
      },
      transports: ["websocket"],
      upgrade: true,
    });
    return this.ws;
  };

  removeListener = () => {
    this.ws?.close();
  };
}

export default new ChatClient();
