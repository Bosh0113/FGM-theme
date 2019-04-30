import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.UUID;

@WebServlet(name = "queryModelIDServlet", urlPatterns = "/queryModelIDServlet")
public class queryModelIDServlet extends HttpServlet {

    String host="222.192.7.75";
    int port=27017;
    String databaseName="OpenGMS";
    String collectionName="";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,IOException {

        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("utf-8");
        if(req.getParameter("type").equals("modelItem")){
            collectionName="ModelItem";
        }
        else {
            collectionName="ComputableModel";
        }
        MongoOperator mongoOperator=new MongoOperator();
        MongoDatabase mongoDatabase=mongoOperator.initMongoDB(host,port,databaseName);
        MongoCollection<Document> mongoCollection = mongoOperator.getCollection(mongoDatabase,collectionName);

        String modelName = req.getParameter("model_name");
        Bson find = Filters.eq("Name",modelName);
        Document doc = mongoCollection.find(find).first();

        //Output
        PrintWriter out = resp.getWriter();
        if(doc != null) {
            String uid = doc.getString("UID");
            //对UID进行加密
            String randomID = UUID.randomUUID().toString().substring(0,2);
            String keyId = EncodeUtil.encode((uid + randomID).getBytes());
            String modelInfo = "{\"modelName\":\"" + modelName +"\",\"modelID\":\""+ keyId+"\"}";
            out.write(modelInfo);
            out.close();
        }
        else {
            out.write("");
        }
        out.close();
    }
}
