package modelservice;

public class ServerFactory {

	public static Server createServer(String ip, int port){
		return new Server(ip,port);
	}
}
