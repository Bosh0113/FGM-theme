// Extends EditorUi to update I/O action states based on availability of backend
var wsMxgraph = null;
var Controller="";
var graphContentXML="";
var GraphUi=null;
(function () {
    var editorUiInit = EditorUi.prototype.init;

    EditorUi.prototype.init = function () {
        editorUiInit.apply(this, arguments);
        this.actions.get('export').setEnabled(false);

        // Updates action states which require a backend
        if (!Editor.useLocalStorage) {
            mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
                var enabled = req.getStatus() != 404;
                this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
                this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
                this.actions.get('save').setEnabled(enabled);
                this.actions.get('saveAs').setEnabled(enabled);
                this.actions.get('export').setEnabled(enabled);
            }));
        }
    };

    // Adds required resources (disables loading of fallback properties, this can only
    // be used if we know that all keys are defined in the language specific file)
    mxResources.loadDefaultBundle = false;
    var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
        mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

    // Fixes possible asynchronous requests
    mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
        // Adds bundle text to resources
        mxResources.parse(xhr[0].getText());

        // Configures the default graph theme
        var themes = {};
        themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

        // Main
        var editorUi = new EditorUi(new Editor(urlParams['chrome'] === '0', themes));
        var memberList='<div id="members" style="float: right;margin-right: 50px"></div>';
        $(".geToolbar").append(memberList);
        //定时信息发送器
        var timer = window.setInterval(function () {
            if(Controller===sessionStorage.getItem("username")){//判断是否有权发送演示信息

                console.log($("#viewPanel").val().indexOf("Integration"));
                if($("#viewPanel").val().indexOf("Integration")>=0){
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    var inte = mxUtils.getXml(node);
                    LogicalModel.basicInfo.modelDependency = inte;
                }

                var data = JSON.stringify(LogicalModel);
                var messageObject={};
                messageObject["messageType"]="Message";
                messageObject["message"]=data;
                var message=JSON.stringify(messageObject);
                wsMxgraph.send(message);//发送示意图
                // console.log(LogicalModel)
            }
        },1000);//时隔0.5秒
        //WebSocket
        var graph = editorUi.toolbar.editorUi.editor.graph;
        GraphUi=graph;

        // if (WebSocket) {
        //     // wsMxgraph = new WebSocket("ws://222.192.7.75:8066/TeamModeling/MxGraph");
        //     // wsMxgraph = new WebSocket("ws:localhost:8081/TeamModeling/MxGraph/"+sessionStorage.getItem("groupID"));
        // }
        // else {
        //     alert("浏览器不支持websocket！");
        // }
        // wsMxgraph.onopen = function () {
        //     //连接建立成功后，向服务器发送消息
        //     // ws.send("用户加入了协同画图......")
        //     var messageObject={};
        //     messageObject["messageType"]="Join";
        //     messageObject["message"]=sessionStorage.getItem("username");
        //     wsMxgraph.send(JSON.stringify(messageObject));
        // };
        // wsMxgraph.onerror=function (ev) {
        //     console.log(ev.toString());
        // }
        //接收来自服务器的消息后，触发该方法
        // wsMxgraph.onmessage = function (ev) {
        //     var messageObject=JSON.parse(ev.data);
        //     if(messageObject.messageType==="Message"){
        //         // showGraph(graph, messageObject.message);
        //         var graph = editorUi.editor.graph;
        //         LogicalModel = JSON.parse(messageObject["message"]);
        //         Integration = LogicalModel.basicInfo.modelDependency;
        //         setTimeout(function () {
        //             var doc = mxUtils.parseXml(Integration);
        //             var dec = new mxCodec(doc);
        //             dec.decode(doc.documentElement, graph.getModel());
        //         },500);
        //     }
        //     else if (messageObject.messageType==="Join"||messageObject.messageType==="Left"||messageObject.messageType==="Authority") {
        //         Controller=messageObject.controller;//信息定时发送器
        //         var members=messageObject.message.replace("[","").replace("]","").replace(" ","").split(",");
        //         var membersHtml="";
        //         for (var i=0;i<members.length;i++){
        //             console.log("在线用户"+i+"："+members[i]);
        //             var accountIcon="";
        //             if(members[i]===messageObject.controller){
        //                 accountIcon="assignment_ind";
        //             }
        //             else {
        //                 accountIcon="account_circle";
        //             }
        //             membersHtml+='<i class="material-icons account" style="cursor: pointer" title="'+members[i]+
        //                 '" onclick="pTransfer(this.title)">'+accountIcon+'</i>';
        //         }
        //         $("#members").html(membersHtml);
        //     }
        // };

        //返回画布内容
        function getContentXML() {
            var encoder = new mxCodec();
            var node = encoder.encode(graph.getModel());
            var Integration = mxUtils.getXml(node);
            getSplitedXml(Integration);
            graphContentXML=Integration;
            return Integration;
        }

        //解析xml字符串
        function parseXml(xmlStr) {
            //创建文档对象
            var domParser=new DOMParser();
            var xmlDoc=domParser.parseFromString(xmlStr,"text/xml");
            return xmlDoc;
        }
        //得到分割后的xml字符串数组
        function getSplitedXml(xmlStr) {
            var length=xmlStr.length;
            var splitCount=length/500;
            for(var i=0;i<splitCount;i++)
            {
                var tempStr=xmlStr.substr(i*splitCount,i*(splitCount+1));
            }


        }
        //显示框图
        function showGraph(graph,data) {
            if(data!=null)
            {
                graph.getModel().beginUpdate();
                var doc = mxUtils.parseXml(data);
                // var req = mxUtils.load(data);
                // var root = req.getDocumentElement();
                var dec = new mxCodec(doc);
                dec.decode(doc.documentElement, graph.getModel());
                graph.getModel().endUpdate();
            }
        }

    }, function () {
        document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
    });
})();
//演示权限转交
function pTransfer(newController) {
    if(Controller===sessionStorage.getItem("username")){
        if (newController===sessionStorage.getItem("username")){
            confirm("You already have demo authority.");
        }
        else {
            var r=confirm("Whether to transfer demo authority to "+newController+" ?");
            if(r===true){
                var messageObject={};
                messageObject["messageType"]="Authority";
                messageObject["message"]=newController;
                wsMxgraph.send(JSON.stringify(messageObject));
            }
        }
    }
    else {
        confirm("Sorry, You have no right to transfer authority.");
    }

}