package ApplicationsServlet;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import ApplicationsServlet.computableModelServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "defaultFileServlet", urlPatterns = "/defaultFileServlet")
public class defaultFileServlet extends HttpServlet {
    String host="222.192.7.75";
    int port=27017;
    String databaseName="OpenGMS";
    String collectionName="ComputableModel";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("utf-8");
        PrintWriter out = resp.getWriter();

        //ServerAddress()两个参数分别为 服务器地址 和 端口
        ServerAddress serverAddress = new ServerAddress(host, port);
        List<ServerAddress> addresses = new ArrayList<>();
        addresses.add(serverAddress);
        //通过连接认证获取MongoDB连接
        MongoClient mongoClient = new MongoClient(addresses);
        //连接到数据库
        MongoDatabase mongoDatabase = mongoClient.getDatabase(databaseName);//链接到数据库
        MongoCollection<Document> mongoCollection = mongoDatabase.getCollection(collectionName);//获取数据集合

        String modelName = req.getParameter("model_name");
        Bson find = Filters.eq("Name",modelName);
        Document doc = mongoCollection.find(find).first();
        if(doc != null) {
            String uid = doc.getString("UID");
            Bson computableFind = Filters.eq("UID", uid);
            Document computableDoc = mongoCollection.find(computableFind).first();
            if (computableDoc != null) {
                ArrayList<Document> containerIds =computableDoc.get("ContainerId", ArrayList.class);
                String oid = containerIds.get(0).getString("mid");
                computableModelServiceImpl computableModelService=new computableModelServiceImpl();
                String TestFileInfo=computableModelService.getTestFileData(oid,computableModelService.getTestFileInfo(oid));
                String inputs="";
                String regexStr="inputs\\S*\\[(\\S*)]}]";
                Pattern regex=Pattern.compile(regexStr);
                Matcher matcher=regex.matcher(TestFileInfo);
                while (matcher.find()){
                    inputs=matcher.group(1);
                }
                out.write("["+inputs+"]");
            }
            out.write("");
        }
        else {
            out.write("");
        }
        out.close();
    }
}
