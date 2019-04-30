import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
//import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
//import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoOperator
{
    public MongoDatabase initMongoDB(String host, Integer port, String databaseName)
    {
        //连接到MongoDB服务 如果是远程连接可以替换“localhost”为服务器所在IP地址
        //ServerAddress()两个参数分别为 服务器地址 和 端口
        ServerAddress serverAddress = new ServerAddress(host, port);
        List<ServerAddress> addresses = new ArrayList<>();
        addresses.add(serverAddress);
        //通过连接认证获取MongoDB连接
        MongoClient mongoClient = new MongoClient(addresses);
        //连接到数据库
        MongoDatabase mongoDatabase = mongoClient.getDatabase(databaseName);
        System.out.println("Connect to database successfully");
        return mongoDatabase;
    }
    //创建集合
    public void createCollection(MongoDatabase mongoDatabase,String collectionName)
    {
        try
        {
            mongoDatabase.createCollection(collectionName);
            System.out.println("Create collection "+collectionName+" successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //获得集合
    public MongoCollection<Document> getCollection(MongoDatabase mongoDatabase,String collectionName)
    {
        //选择集合对象
        MongoCollection<Document> collection= null;
        try
        {
            collection = mongoDatabase.getCollection(collectionName);
            System.out.println("Get collection "+collectionName+" successfully.");
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return collection;
    }

//    //获得user表中的所有值
//    public JSONArray getCollectionValue(MongoCollection<Document> collection)
//    {
//
//        FindIterable<Document> findIterable = collection.find();
//        MongoCursor<Document> mongoCursor = findIterable.iterator();
//
//        JSONArray json =new JSONArray();
//
//        while (mongoCursor.hasNext())
//        {
//            JSONObject jsonObject=new JSONObject();
//            Document document=mongoCursor.next();
//            System.out.println(document);
//
//
//            User user=new User();
////            jsonObject.put("id",document.getString("id"));
////            jsonObject.put("name",document.getString("name"));
////            jsonObject.put("password",document.getString("password"));
////            jsonObject.put("phone",document.getString("phone"));
////            jsonObject.put("registerTime",document.getString("registerTime"));
////            jsonObject.put("introduction",document.getString("introduction"));
//
//            jsonObject.put("id",document.getString("id"));
//            jsonObject.put("name",document.getString("userName"));
//            jsonObject.put("password",document.getString("password"));
//            jsonObject.put("phone",document.getString("mobilephone"));
//            jsonObject.put("gender",document.getString("gender"));
//            jsonObject.put("country",document.getString("country"));
//            jsonObject.put("city",document.getString("city"));
//            jsonObject.put("organization",document.getString("organization"));
//            jsonObject.put("dateOfBirth",document.getString("dateOfBirth"));
//            jsonObject.put("email",document.getString("email"));
////            jsonObject.put("registerTime",document.getString("registerTime"));
//            jsonObject.put("introduction",document.getString("introduction"));
//            json.add(jsonObject);
//        }
//        return json;
//    }

    //判断某集合是否存在
    public boolean isCollectionExists(MongoDatabase mongoDatabase, String collectionName) {

        for (String name : mongoDatabase.listCollectionNames()) {
            if (collectionName.equals(name)) {
                return true;
            }
        }
        return false;
    }


}
