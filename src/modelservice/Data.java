package modelservice;

import enumcollection.DataType;
import net.sf.json.JSONObject;
import utils.HttpHelper;

import java.io.File;
import java.io.IOException;

public class Data extends Service {

	   private String id;
	   private String tag;
	   private int size;
	   private String generationDateTime;
	   private DataType type;
	   private String value;
	   
	   public Data(String id,String tag, int size, String generationDateTime, DataType type, String value, String ip, int port){
		   super(ip,port);
		   this.id = id;
		   this.tag = tag;
		   this.size = size;
		   this.generationDateTime = generationDateTime;
		   this.type = type;
		   this.value = value;
	   }
	   
	   public boolean isExist(){
		   String url = this.getBaseUrl();
		   url = url + "geodata/json/" + this.id;
		   
		   String response = HttpHelper.request_get(url, null);
		   
		   JSONObject object = JSONObject.fromObject(response);
		   
		   if(object.getString("result").equals("suc")){
			   
			   JSONObject jData = object.getJSONObject("data");
			   if(jData.toString().equals("")){
				   return false;
			   }
			   return true;
			   
		   }else{
			   return false;
		   }
	   }
	   
	   public int saveAs(String path) throws IOException{
		   String url = this.getBaseUrl();
		   url = url + "geodata/" + this.id;
		   File file = HttpHelper.downloadFile(url, path, "GET");
		   if(file.exists()){
			   return 1;
		   }else{
			   return 0;
		   }
	   }
	   
	   //只提供get方法，set通过工厂类来修改
	   public String getID(){
		   return this.id;
	   }
	   
	   public String getTag(){
		   return this.tag;
	   }
	   
	   public String getGenerationDateTime(){
		   return this.generationDateTime;
	   }
	   
	   public DataType getType(){
		   return this.type;
	   }
	   
	   public int getSize(){
		   return this.size;
	   }
	   
	   public String getValue(){
		   return this.value;
	   }
}
