var allModels;

$(document).ready(function () {
    $.getJSON("js/modelInfo.json", function (data) {

        allModels = data;

        var models;

        for (var modelType in data) {

            if (/DBH/.test(modelType)) {

                models = data["DBH_Model"];
                SelectModel(models, "DBH");


                SubmitData("DBH");
            }
            else if (/Height/.test(modelType)) {

                models = data["Height_Model"];
                SelectModel(models, "Height");


                SubmitData("Height");
            }
            else if (/CW/.test(modelType)) {

                models = data["CW_Model"];
                SelectModel(models, "CW");


                SubmitData("CW");
            }
            else if (/CH/.test(modelType)) {

                models = data["CH_Model"];
                SelectModel(models, "CH");


                SubmitData("CH");
            }
            else if (/UBH/.test(modelType)) {

                models = data["UBH_Model"];
                SelectModel(models, "UBH");


                SubmitData("UBH");
            }
            else if (/Mortality/.test(modelType)) {

                models = data["Mortality_Model"];
                SelectModel(models, "Mortality");


                SubmitData("Mortality");
            }
            else if (/Biomass/.test(modelType)) {

                models = data["Biomass_Model"];
                SelectModel(models, "Biomass");


                SubmitData("Biomass");
            }
            else if (/Volume/.test(modelType)) {

                models = data["Volume_Model"];
                SelectModel(models, "Volume");


                SubmitData("Volume");
            }
            else {

                models = data["Other_Model"];
                SelectModel(models, "Other");

                SubmitData("Other");
            }
        }

        //model select change event
        $("#DBHmodelSelector").change(function () {
            SetAppTable("DBH_Model");
        });

        $("#HeightmodelSelector").change(function () {

            SetAppTable("Height_Model");
        });

        $("#UBHmodelSelector").change(function () {

            SetAppTable("UBH_Model");
        });

        $("#CHmodelSelector").change(function () {

            SetAppTable("CH_Model");
        });

        $("#CWmodelSelector").change(function () {

            SetAppTable("CW_Model");
        });

        $("#BiomassmodelSelector").change(function () {

            SetAppTable("Biomass_Model");
        });

        $("#VolumemodelSelector").change(function () {

            SetAppTable("Volume_Model");
        });

        $("#MortalitymodelSelector").change(function () {

            SetAppTable("Mortality_Model");
        });

        $("#OthermodelSelector").change(function () {

            SetAppTable("Other_Model");
        });

        var modelValue;
        $(".appButton").click(function () {

            window.open("./singleModelApp.html");
        });

    })
});

function SelectModel(data, type) {

    var modelName, modelSelectDiv, submitData;
    if (type === "DBH") {

        // select model
        modelSelectDiv = '<div id="DBHModel"><span style="margin-left: 60px;font-size:20px;;font-weight:bold">Select Models:</span><select style=" margin-left: 10px" id="DBHmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#DBHAppList").append(modelSelectDiv);

    }
    else if (type === "Height") {

        modelSelectDiv = '<div id="HeightModel"><span style="margin-left: 60px">Select Models:</span><select style="width: 200px; margin-left: 10px" id="HeightmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#HeightAppList").append(modelSelectDiv);
    }
    else if (type === "CW") {

        modelSelectDiv = '<div id="CWModel"><span style="margin-left: 60px">Select Models:</span><select style="width: 200px; margin-left: 10px" id="CWmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#CWAppList").append(modelSelectDiv);
    }
    else if (type === "CH") {

        modelSelectDiv = '<div id="CHModel"><span style="margin-left: 60px">Select Models:</span><select style="width: 200px; margin-left: 10px" id="CHmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#CHAppList").append(modelSelectDiv);
    }
    else if (type === "UBH") {

        modelSelectDiv = '<div id="UBHModel"><span style="margin-left: 60px">Select Models:</span><select style="width: 200px; margin-left: 10px" id="UBHmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#UBHAppList").append(modelSelectDiv);
    }
    else if (type === "Mortality") {

        modelSelectDiv = '<div id="MortalityModel"><span style="margin-left: 60px">Select Models:</span><select style="width: 200px; margin-left: 10px" id="MortalitymodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#MortalityAppList").append(modelSelectDiv);
    }
    else if (type === "Biomass") {

        modelSelectDiv = '<div id="BiomassModel"><span style="margin-left: 60px;">Select Models:</span><select style="width: 200px; margin-left: 10px" id="BiomassmodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#BiomassAppList").append(modelSelectDiv);
    }
    else if (type === "Volume") {

        modelSelectDiv = '<div id="VolumeModel"><span style="margin-left: 60px;">Select Models:</span><select style="width: 200px; margin-left: 10px" id="VolumemodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#VolumeAppList").append(modelSelectDiv);
    }
    else {

        modelSelectDiv = '<div id="OtherModel"><span style="margin-left: 60px;">Select Models:</span><select style="width: 200px; margin-left: 10px" id="OthermodelSelector" class="SelectModel">';
        for (var i = 0; i < data.length; i++) {

            modelName = data[i].Name;

            modelSelectDiv += '<option value="' + i + '">' + modelName + '</option>';
        }
        modelSelectDiv += '</select></div>';

        $("#OtherAppList").append(modelSelectDiv);
    }
}

// submit button and result download button
function SubmitData(type) {
    var submitData;
    if (type === "DBH") {

        submitData = '<button id="dbhDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';
        $("#DBHModel").append(submitData);
    }
    else if (type === "Height") {

        submitData = '<button id="heightDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';
        $("#HeightModel").append(submitData);
    }
    else if (type === "CW") {

        submitData = '<button id="cwDefBtn" class="appButton btndefault" title="use this model">Use this model</button>' ;

        $("#CWModel").append(submitData);
    }
    else if (type === "CH") {

        submitData = '<button id="chDefBtn" class="appButton btndefault" title="use this model">Use this model</button>' ;

        $("#CHModel").append(submitData);
    }
    else if (type === "UBH") {

        submitData = '<button id="ubhDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';

        $("#UBHModel").append(submitData);
    }
    else if (type === "Mortality") {

        submitData = '<button id="mortDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';

        $("#MortalityModel").append(submitData);
    }
    else if (type === "Biomass") {

        submitData = '<button id="bioDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';

        $("#BiomassModel").append(submitData);
    }
    else if (type === "Volume") {

        submitData = '<button id="volDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';

        $("#VolumeModel").append(submitData);
    }
    else {

        submitData =  '<button id="otherDefBtn" class="appButton btndefault" title="use this model">Use this model</button>';

        $("#OtherModel").append(submitData);
    }

}


function SetAppTable(type) {
    // intial localstorage
    localStorage.setItem("modelInfo",[]);
    localStorage.setItem("modelparams",[]);
    localStorage.setItem("standparams",[]);
    localStorage.setItem("modelweights",[]);
    localStorage.setItem("cuttingparams",[]);
    localStorage.setItem("DEMdata", "");
    localStorage.setItem("Forestdata", "");


    var models = allModels[type];
    var typeName=type.match(/(\S*)_Model/)[1];
    var selectorID=typeName+"modelSelector";
    var singleModelInfo=models[$("#"+selectorID).val()];
    var modelName = singleModelInfo.Name;
    localStorage.setItem("modelInfo",JSON.stringify(singleModelInfo));

    if ($('.customize')) {
        $('.customize').remove();
    }
    $("#"+typeName+"TestData").html("");
    $.ajax("/FGM-theme/defaultFileServlet",{
        type: "POST",
        data: {"model_name":modelName},
        // async: false,
        success:function (data) {
            var jsonObj=JSON.parse(data);

            for (var i=0;i<jsonObj.length;i++){
                var regex=/\S*.xml/;
                if(regex.test(jsonObj[i].DataId)){//找到后缀为xml的参数文件

                    $.ajax("/FGM-theme/downloadDefaultFileServlet",{
                        data:{"dataId":jsonObj[i].gd_id},
                        // async: false,
                        success:function (data) {
                            var XMLContent=data.toString();
                            if(/Other/.test(type)) {

                                var StringContent = XMLContent.replace(/[\s]/g, "");//去掉不可见的符号
                                var regex = new RegExp("<Weight\\d*>((-?\\d+)(\\.\\d+)?)<\\/Weight\\d*>", "g");
                                var parameters = "";
                                var paraArray = [];
                                while ((parameters = regex.exec(StringContent)) != null) {
                                    paraArray.push(parameters[1]);//获取标签内参数
                                }

                                var cuttingArray = [];

                                var cutParameters = StringContent.match(/<Cutting_Age>([\S]*)<\/Cutting_Age>/);//获取标准参数
                                regex = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                parameters = regex.exec(cutParameters);
                                cuttingArray.push(parameters[1]);


                                cutParameters = StringContent.match(/<Cutting_Type>([\S]*)<\/Cutting_Type>/);//获取标准参数
                                regex = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                parameters = regex.exec(cutParameters);
                                if(parameters != null) {
                                    cuttingArray.push(parameters[1]);

                                    cutParameters = StringContent.match(/<Intensity>([\S]*)<\/Intensity>/);//获取标准参数
                                    regex = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                    parameters = regex.exec(cutParameters);
                                    cuttingArray.push(parameters[1]);
                                }
                                else {
                                    cutParameters = StringContent.match(/<Cutting_Up>([\S]*)<\/Cutting_Up>/);//获取标准参数
                                    regex = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                    parameters = regex.exec(cutParameters);
                                    cuttingArray.push(parameters[1]);

                                    cutParameters = StringContent.match(/<Threshold>([\S]*)<\/Threshold>/);//获取标准参数
                                    regex = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                    parameters = regex.exec(cutParameters);
                                    cuttingArray.push(parameters[1]);
                                }

                                localStorage.setItem("modelweights",paraArray);
                                localStorage.setItem("cuttingparams",cuttingArray);
                            }
                            else {

                                StringContent = XMLContent.replace(/[\s]/g, "");//去掉不可见的符号
                                regex = new RegExp("<param\\d*>((-?\\d+)(\\.\\d+)?)<\\/param\\d*>", "g");
                                parameters = "";
                                paraArray = [];
                                while ((parameters = regex.exec(StringContent)) != null) {
                                    paraArray.push(parameters[1]);//获取标签内参数
                                }

                                var StandParameters = StringContent.match(/<Stand_Parameters>([\S]*)<\/Stand_Parameters>/);//获取标准参数
                                if (StandParameters != null)
                                    StandParameters = StandParameters[1];
                                regexStand = new RegExp("<\\w*_?\\w*>((-?\\d+)(\\.\\d+)?)<\\/\\w*_?\\w*>", "g");
                                var standParameters = "";
                                var standParaArray = [];
                                while ((standParameters = regexStand.exec(StandParameters)) != null) {
                                    standParaArray.push(standParameters[1]);//获取标签内标准参数
                                }

                                //保存模型信息和参数信息
                                localStorage.setItem("modelparams",paraArray);
                                localStorage.setItem("standparams",standParaArray);
                            }


                        }
                    });
                }
                else{
                    //保存数据信息
                    if(/DEM/.test(jsonObj[i].DataId)) {
                        localStorage.setItem("DEMdata", jsonObj[i].gd_id);
                    }
                    else if(/Forest/.test(jsonObj[i].DataId)){
                        localStorage.setItem("Forestdata",  jsonObj[i].gd_id);
                    }

                }
            }
        }
    });

    if (/DBH/.test(type)) {
        addDBHParameters(models);
    }
    else if (/Height/.test(type)) {
        addHeightParameters(models);
    }
    else if (/CW/.test(type)) {
        addCWParameters(models);
    }
    else if (/CH/.test(type)) {
        addCHParameters(models);
    }
    else if (/UBH/.test(type)) {
        addUBHParameters(models);
    }
    else if (/Mortality/.test(type)) {
        addMortalityParameters(models);
    }
    else if (/Biomass/.test(type)) {
        addBiomassParameters(models);
    }
    else if (/Volume/.test(type)) {
        addVolumeParameters(models);
    }
    else if (/Other/.test(type)) {
        addOtherParameters(models);
    }

}

function addDBHParameters(models) {
    //remove original table
    var elem =  document.getElementById("dbhModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#DBHmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;
    var modelInfo = '<table id="dbhModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }
    modelInfo+='</table>';

    $("#DBHModel").append(modelInfo);

}
function addHeightParameters(models) {
    //remove original table
    var elem =  document.getElementById("heightModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#HeightmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="heightModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }
    modelInfo+='</table>';

    $("#HeightModel").append(modelInfo);

}
function addCWParameters(models){
    //remove original table
    var elem =  document.getElementById("cwModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#CWmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="cwModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';
    $("#CWModel").append(modelInfo);

}
function addCHParameters(models){
    //remove original table
    var elem =  document.getElementById("chModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#CHmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="chModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';
    $("#CHModel").append(modelInfo);

}
function addUBHParameters(models){
    //remove original table
    var elem =  document.getElementById("ubhModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#UBHmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="ubhModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';

    $("#UBHModel").append(modelInfo);

}
function addMortalityParameters(models){
    //remove original table
    var elem =  document.getElementById("mortalityModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#MortalitymodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="mortalityModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';

    $("#MortalityModel").append(modelInfo);

}
function addBiomassParameters(models){
    //remove original table
    var elem =  document.getElementById("biomassModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#BiomassmodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="biomassModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">From:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';

    $("#BiomassModel").append(modelInfo);

}
function addVolumeParameters(models){
    //remove original table
    var elem =  document.getElementById("volumeModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#VolumemodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="volumeModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">From:</span><span class="appContent">' +models[modelValue].author +'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>'+
        '<tr><td colspan="4"><span class="appLabel">Formula:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';

    $("#VolumeModel").append(modelInfo);

}
function addOtherParameters(models){
    //remove original table
    var elem =  document.getElementById("otherModelTab");
    if(elem !== null)
        elem.parentNode.removeChild(elem);

    // get the value of model selected
    var modelValue = $("#OthermodelSelector").val();
    var uploadfileNum = models[modelValue].data_upload.length;

    var modelInfo = '<table id="otherModelTab" calss="table dbappliction" >' +
        '<tr><td colspan="4"><span class="appLabel">Authors:</span><span class="appContent">' +models[modelValue].author +'</span><span class="appLabel">Time:</span><span>' +models[modelValue].time+'</span></td></tr>' +
        '<tr><td colspan="4"><span class="appLabel">Principle:</span><span class="appContent"><img src="'+models[modelValue].formula+'"></span></td></tr>';
    if(models[modelValue].paper_doi!=""){
        modelInfo+='<tr><td><span class="appLabel">URL:</span><span class="appContent">https://www.doi.org/'+models[modelValue].paper_doi+'</span></td></tr>';
    }

    modelInfo+='</table>';

    $("#OtherModel").append(modelInfo);

}