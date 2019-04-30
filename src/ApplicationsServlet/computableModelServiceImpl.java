package ApplicationsServlet;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

public class computableModelServiceImpl {
    public String getTestFileInfo(String oid) throws IOException {
        String Url="http://172.21.212.7:8060/modelser/testify/"+oid;
//                String Url="http://geomodeling.njnu.edu.cn/GeoModeling/TestFileServlet?mid="+"YzE5YWRkNWYtMTg4ZC00OTFlLTk0MTEtYmY4NzRmODE5NWE2LWY2YzA4ZjJlLTA2ZmUtNGI4ZS1hMGFlLWQ0MmY0MTU1M2I2OA==";

        String testdataresult = "";
        try {
            URL url = new URL(Url);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.connect();

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            String lines = "";
            String strResponse = "";
            while ((lines = reader.readLine()) != null) {
                strResponse += lines + "\n";
            }
            testdataresult=strResponse;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return testdataresult;
    }

    public String getTestFileData(String oid, String testfileJson) throws IOException {

        JSONObject result = JSONObject.fromObject(testfileJson);
        String testdataresult = "";
        JSONObject testfile = JSONObject.fromObject(testfileJson);
        JSONArray testifies = testfile.getJSONArray("testifies");
        for (int i = 0; i < testifies.size(); i++) {

            JSONObject testdata = testifies.getJSONObject(i);
            JSONArray inputs = testdata.getJSONArray("inputs");
            String Url="http://172.21.212.7:8060/modelser/testify/"+oid+"?path=Default";
            try {
                URL url = new URL(Url);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("PUT");
                connection.setDoInput(true);
                connection.setDoOutput(true);
                connection.connect();

                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                String lines = "";
                String strResponse = "";
                while ((lines = reader.readLine()) != null) {
                    strResponse += lines + "\n";
                }
                testdataresult = strResponse;

                JSONObject resultObj = JSONObject.fromObject(testdataresult);
                JSONArray dataInputs = resultObj.getJSONArray("dataInputs");
                JSONObject inputObj = dataInputs.getJSONObject(0);
                JSONArray inputArray = inputObj.getJSONArray("inputs");

                for (int j = 0; j < inputs.size(); j++) {
                    JSONObject input = inputs.getJSONObject(j);
                    for (int k = 0; k < inputArray.size(); k++) {
                        JSONObject inputArrayElement = inputArray.getJSONObject(k);
                        if (input.getString("StateId").equals(inputArrayElement.getString("StateId")) && input.getString("Event").equals(inputArrayElement.getString("Event"))) {
                            result.getJSONArray("testifies").getJSONObject(i).getJSONArray("inputs").getJSONObject(k).put("gd_id", inputArrayElement.getString("DataId"));
                        } else {
                            continue;
                        }
                    }
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
        return result.toString();
    }

    public HashMap downloadTestDataFiles( String dataId) {

        String Url="http://172.21.212.7:8060/geodata/"+dataId;
        InputStream inputStream = null;
        HttpURLConnection connection = null;
        HashMap hashMap = new HashMap();
        try {
            URL url = new URL(Url);
            connection = (HttpURLConnection) url.openConnection();
            connection.connect();
            inputStream = connection.getInputStream();
            String Content = connection.getHeaderField("Content-Disposition");
            hashMap.put("content", Content);
            hashMap.put("inputStream", inputStream);
            hashMap.put("connection", connection);
            //connection.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return hashMap;
    }
}
