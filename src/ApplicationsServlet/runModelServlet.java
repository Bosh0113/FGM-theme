package ApplicationsServlet;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import modelservice.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import utils.HttpHelper;
import utils.Utils;

@WebServlet(name = "runModelServlet", urlPatterns = "/runModelServlet")
public class runModelServlet extends HttpServlet {

    private final String IP = "172.21.212.7";
    private final int PORT = 8060;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doPost(req, resp);
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("utf-8");
        req.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();
        try {
            //连接模型容器
            Server server = ServerFactory.createServer(IP, PORT);
            if (server.connect() == 1) {
                ServiceAccess pServiceAccess = server.getServiceAccess();
                DataConfiguration pDataconfig = pServiceAccess.createDataConfig();

                //接收form表单用
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                List<FileItem> items = upload.parseRequest(req);

                Utils utils=new Utils();
                String name="";
                String oid="";
                String stateId = "";
                String filePath = "";
                String midPath = "upload\\" + System.currentTimeMillis() + "\\";
                String fileMidPath = utils.getPath(this, midPath, "");
                String fileInputMidPath=utils.createDir(fileMidPath+"input\\");
                String fileOutputMidPath = utils.createDir(fileMidPath + "output\\");
                File savefile;
                ModelService pMservice = null;

                for (FileItem item : items) {
                    if (!item.isFormField()) {//上传的为文件
                        //filePath = getPath(this, fileMidPath, item.getName());
                        filePath = fileInputMidPath + item.getName();
                        String event = item.getFieldName();
                        System.out.println("fileName = " + filePath);
                        savefile = new File(filePath);
                        item.write(savefile);
                        //上传数据
                        Data pData = pServiceAccess.uploadDataByFile(filePath, item.getName());
                        if (pData != null) {
                            System.out.println(pData.getID() + " - " + pData.getSize() + " - " + pData.getGenerationDateTime() + " - " + pData.getTag());
                            pDataconfig.insertData(stateId, event, pData.getID(), false);
                        }
                    } else {
                        String key = item.getFieldName();
                        if (key.equalsIgnoreCase("name")) {
                            name = item.getString("UTF-8");

                            //ServerAddress()两个参数分别为 服务器地址 和 端口
                            ServerAddress serverAddress = new ServerAddress("172.21.212.7", 27017);
                            List<ServerAddress> addresses = new ArrayList<>();
                            addresses.add(serverAddress);
                            //通过连接认证获取MongoDB连接
                            MongoClient mongoClient = new MongoClient(addresses);
                            //连接到数据库
                            MongoDatabase mongoDatabase = mongoClient.getDatabase("new_model_container");//链接到数据库
                            MongoCollection<Document> mongoCollection = mongoDatabase.getCollection("modelservice");//获取数据集合
                            Bson find = Filters.eq("ms_model.m_name",name);//查询条件
                            Document doc = mongoCollection.find(find).first();
                            if(!doc.isEmpty()){
                                ObjectId objectId=doc.getObjectId("_id");
                                oid=objectId.toString();
                                pMservice = pServiceAccess.getModelServiceByOID(oid);
                                if (pMservice == null) {
                                    return;
                                }
                                String mdl = doc.getString("ms_xml");
                                Pattern p=Pattern.compile("\"State\":\\{\"\\$\":\\{\"id\":\"(.*?)\",\"name");
//                                Pattern p=Pattern.compile("<State\\s*id=\"(.*?)\".*?name=");
                                Matcher m=p.matcher(mdl);
                                while(m.find()){
                                    stateId=m.group(1);
                                }
                            }
                        }
//                        else if(key.equalsIgnoreCase("Stand_Parameters")){
//                            try {
//                                String XMLcontent = item.getString("UTF-8");
//                                String XMLpath=fileInputMidPath+"Stand_Parameters.xml";
//                                File xmlFile=new File(XMLpath);
//                                FileOutputStream fos = new FileOutputStream(xmlFile);
//                                fos.write(XMLcontent.getBytes());
//                                fos.close();
//                                //上传数据
//                                Data pData = pServiceAccess.uploadDataByFile(XMLpath, "Stand_Parameters.xml");
//                                if (pData != null) {
//                                    System.out.println(pData.getID() + " - " + pData.getSize() + " - " + pData.getGenerationDateTime() + " - " + pData.getTag());
//                                    pDataconfig.insertData(stateId, "Stand_Parameters_Read", pData.getID(), false);
//                                }
//                            }catch (IOException e){
//                                System.out.println("输入错误");
//                            }
//                        }
                        else if(key.equalsIgnoreCase("Model_Parameters")){
                            try {
                                String XMLcontent = item.getString("UTF-8");
                                String XMLpath=fileInputMidPath+"Model_Parameters.xml";
                                File xmlFile=new File(XMLpath);
                                FileOutputStream fos = new FileOutputStream(xmlFile);
                                fos.write(XMLcontent.getBytes());
                                fos.close();
                                //上传数据
                                Data pData = pServiceAccess.uploadDataByFile(XMLpath, "Model_Parameters.xml");
                                if (pData != null) {
                                    System.out.println(pData.getID() + " - " + pData.getSize() + " - " + pData.getGenerationDateTime() + " - " + pData.getTag());
                                    pDataconfig.insertData(stateId, "Parameters_Read", pData.getID(), false);
                                }
                            }catch (IOException e){
                                System.out.println("输入错误");
                            }
                        }
                        else if(key.equalsIgnoreCase("Parameters")){
                            try {
                                String XMLcontent = item.getString("UTF-8");
                                String XMLpath=fileInputMidPath+"Model_Parameters.xml";
                                File xmlFile=new File(XMLpath);
                                FileOutputStream fos = new FileOutputStream(xmlFile);
                                fos.write(XMLcontent.getBytes());
                                fos.close();
                                //上传数据
                                Data pData = pServiceAccess.uploadDataByFile(XMLpath, "Model_Parameters.xml");
                                if (pData != null) {
                                    System.out.println(pData.getID() + " - " + pData.getSize() + " - " + pData.getGenerationDateTime() + " - " + pData.getTag());
                                    pDataconfig.insertData(stateId, "Parameters", pData.getID(), false);
                                }
                            }catch (IOException e){
                                System.out.println("输入错误");
                            }
                        }
                        else if(key.equalsIgnoreCase("Management_Parameters")){
                            try {
                                String XMLcontent = item.getString("UTF-8");
                                String XMLpath=fileInputMidPath+"Management_Parameters.xml";
                                File xmlFile=new File(XMLpath);
                                FileOutputStream fos = new FileOutputStream(xmlFile);
                                fos.write(XMLcontent.getBytes());
                                fos.close();
                                //上传数据
                                Data pData = pServiceAccess.uploadDataByFile(XMLpath, "Management_Parameters.xml");
                                if (pData != null) {
                                    System.out.println(pData.getID() + " - " + pData.getSize() + " - " + pData.getGenerationDateTime() + " - " + pData.getTag());
                                    pDataconfig.insertData(stateId, "Cutting_Params", pData.getID(), false);
                                }
                            }catch (IOException e){
                                System.out.println("输入错误");
                            }
                        }
                        else if (key.equalsIgnoreCase("testData")) {//使用默认数据
                            if (!item.getString("UTF-8").isEmpty()) {//非空字符
                                //加载测试数据
                                String url = "http://"+IP+":"+PORT+"/modelser/testify/"+oid+"?path=Default";
                                String inputResult = HttpHelper.request_put(url, null,null);
                                if(!inputResult.isEmpty()){//不为空
                                    System.out.println(inputResult);
                                    JSONObject resultJson = JSONObject.fromObject(inputResult);
                                    JSONArray dataInputs = resultJson.getJSONArray("dataInputs");
                                    JSONObject dataInput_1= dataInputs.getJSONObject(0);
                                    JSONArray inputs = dataInput_1.getJSONArray("inputs");
                                    for (int i = 0; i < inputs.size(); i++) {
                                        pDataconfig.insertData(stateId, inputs.getJSONObject(i).getString("Event"), inputs.getJSONObject(i).getString("DataId"), false);
                                    }
                                }else {
                                    return;
                                }
                            }
                        }
                    }
                }

                String recordid = pMservice.invoke(pDataconfig);
                System.out.println(recordid);
                if (recordid.isEmpty()) {
                    return;
                }
                ModelServiceRecord pRecord = pServiceAccess.getModelServiceRecordByID(recordid);

                int msrstatus = pRecord.getStatus().getCode();
                System.out.println("model status is " + msrstatus);
                while(msrstatus == 0){
                    try{
                        Thread.sleep(2000);
                    }catch (InterruptedException e){
                        e.printStackTrace();
                    }
                    pRecord.refresh();
                    //打印log信息
                    List<RunningLog> list_logs = pRecord.getLogs();
                    for(int j = 0; j < list_logs.size(); j++){
                        RunningLog log = list_logs.get(j);
                        System.out.println(log.getType() + " - " + log.getState() + " - " + log.getEvent() + " - " + log.getMessage());
                    }
                    msrstatus = pRecord.getStatus().getCode();
                    System.out.println("Model Run Status is " + msrstatus);
                }
                System.out.println("model has been finished!");

//                JSONObject outputData = new JSONObject();
                //测试保存文件
                String ResultURL="";
                for(int t = 0; t < pRecord.getOutputData().getCount();t++){
                    List<DataConfigItem> dataItems = pRecord.getOutputData().getItem();
                    DataConfigItem item = dataItems.get(t);
                    String dataid = item.data;
                    if (!dataid.isEmpty()) {
                        Data outputdata = pServiceAccess.getDataServiceByID(dataid);
                        String datavalue = outputdata.getValue();
                        //根据value值获取文件后缀
//                        String ext = datavalue.substring(datavalue.lastIndexOf(".") + 1);
//                        System.out.println(ext);
//                        String zipName = item.event+System.currentTimeMillis() + "." + ext;
                        String zipName = item.event+System.currentTimeMillis();
                        outputdata.saveAs(fileOutputMidPath + zipName);

                        String reqPath = req.getRequestURL().toString();
                        int index=reqPath.lastIndexOf("/");
                        reqPath=reqPath.substring(0,index);
                        String tempPath=midPath;
                        String final_path=reqPath.replaceAll("localhost",InetAddress.getLocalHost().getHostAddress()) + "/"+tempPath.replaceAll("\\\\","/")+"output/" + zipName;
                        ResultURL=final_path;
//                        outputData.put(item.event, midPath+"output\\" + zipName);
                    }
                }
                out.write(ResultURL);//将运算结果URL返还

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
