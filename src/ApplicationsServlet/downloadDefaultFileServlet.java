package ApplicationsServlet;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.util.HashMap;

@WebServlet(name = "downloadDefaultFileServlet", urlPatterns = "/downloadDefaultFileServlet")
public class downloadDefaultFileServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        resp.setCharacterEncoding("utf-8");
        req.setCharacterEncoding("utf-8");
        String dataid = req.getParameter("dataId");

        computableModelServiceImpl computableModelService=new computableModelServiceImpl();
        HashMap hashMap=computableModelService.downloadTestDataFiles(dataid);
        String content = (String)hashMap.get("content");
        resp.setHeader("Content-Disposition",content);
        InputStream inputStream = (InputStream) hashMap.get("inputStream");
        HttpURLConnection connection = (HttpURLConnection)hashMap.get("connection");
        OutputStream outputStream = resp.getOutputStream();
        int len = 0;
        byte [] buf = new byte[1024];
        while((len=inputStream.read(buf))!=-1){
            outputStream.write(buf,0,len);
        }
        inputStream.close();
        connection.disconnect();
        outputStream.flush();
        outputStream.close();
    }
}
