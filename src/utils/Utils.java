package utils;

//import com.sun.org.apache.xml.internal.security.transforms.implementations.TransformEnvelopedSignature;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServlet;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

public class Utils {

    public static String getPath(HttpServlet servlet, String parentDir, String dirName){
        System.out.println("项目绝对地址：" +servlet.getServletConfig().getServletContext().getRealPath("/"));
        String project_realPath=servlet.getServletConfig().getServletContext().getRealPath("/");
        File file = new File(project_realPath+parentDir);
        if (!file.exists()) {
            file.mkdirs();
        }
        String path=project_realPath+parentDir+dirName;
        System.out.println("返回地址：" +path);
        return path;
    }

    public static String createDir(String path) {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        return path;
    }

    public static String createControlXml(JSONArray jsonArray,String path) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.newDocument();
            //隐藏xml文件 standalone属性
            document.setXmlStandalone(true);
            //创建根节点
            Element dataset = document.createElement("dataset");
            //创建子节点
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject job = jsonArray.getJSONObject(i);
                Element xdo = document.createElement("XDO");
                xdo.setAttribute("name", job.getString("key"));
                xdo.setAttribute("kernelType","string");
                xdo.setAttribute("value",job.getString("value"));
                dataset.appendChild(xdo);
            }
            document.appendChild(dataset);
            TransformerFactory tff = TransformerFactory.newInstance();
            Transformer tf = tff.newTransformer();
            //设置生成的xml文件自动换行
            tf.setOutputProperty(OutputKeys.INDENT, "yes");
            //使用Transformer的 transform方法把Dom树转换成xml文件
            tf.transform(new DOMSource(document), new StreamResult(new File(path)));
       } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerException e) {
            e.printStackTrace();
        }

        return null;
    }
}
