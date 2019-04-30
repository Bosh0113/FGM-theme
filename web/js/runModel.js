/*
* @by Mzy
*/
var forestmodel = JSON.parse(localStorage.getItem("modelInfo"));
var modelParams = localStorage.getItem("modelparams").split(',');
var standParams = localStorage.getItem("standparams").split(',');
var mdlWeights = localStorage.getItem("modelweights").split(',');
var cutParams = localStorage.getItem("cuttingparams").split(',');

//formula
$("#modelImg").attr("src",forestmodel.formula);
if (forestmodel.formula === "" && forestmodel.formula === undefined)
    $("#imgBorder").attr("border"," 0px solid white");

// Input data
for(var i = 0;i < forestmodel.data_upload.length; i++){

    var dataName;
    if(forestmodel.data_upload[i] === "Vector_Read" || forestmodel.data_upload[i] === "Forest_Data") {
        dataName = "Forest";
    }
    else if(forestmodel.data_upload[i] === "Raster_Read"||forestmodel.data_upload[i] === "DEM_Data") {
        dataName = "DEM";
    }

    var label = $("<label></label>").text(dataName+" Data:");
    label.attr("style","margin-top:10px");
    var input = $("<input>").attr("type","file");
    input.attr("id","datainput"+i);
    input.attr("class","model file");
    input.attr("data-show-preview","false");
    input.attr("data-show-upload","false");
    $("#modeldata").append(label);
    $("#modeldata").append(input);
}

// Test data
var label = $("<label></label>").text("Test Data:");
label.attr("style","margin-top:10px");
$("#modeldata").append(label);
for(var i = 0;i < forestmodel.data_upload.length; i++){

    if(forestmodel.data_upload[i] === "Vector_Read" || forestmodel.data_upload[i] === "Forest_Data") {
        dataName = "Forest";
        var data = $("<a>Forest<i class='fa fa-download' style='margin-left: 10px'></i></a>");
        data.attr("style","cursor:pointer;margin-left:20px;border:1px solid;color: #337ab7;width:100px;border-radius:3px");
        var id = localStorage.getItem("Forestdata");
        data.attr("href", "/FGM-theme/downloadDefaultFileServlet?dataId=" + id);
        $("#modeldata").append(data);

    }
    else if(forestmodel.data_upload[i] === "Raster_Read"||forestmodel.data_upload[i] === "DEM_Data") {
        dataName = "DEM";
        var data = $("<a>DEM<i class='fa fa-download' style='margin-left: 10px'></i></a>");
        data.attr("style","cursor:pointer;margin-left:20px;border:1px solid; color: #337ab7;width:100px;border-radius:3px");
        var id = localStorage.getItem("DEMdata");
        data.attr("href", "/FGM-theme/downloadDefaultFileServlet?dataId=" + id);
        $("#modeldata").append(data);
    }

}

if(modelParams.length > 0 && modelParams[0] !== "") {
    // model parameters
    var subtitle = $("<h4 style='margin-left: 15px; margin-top: 10px'></h4>").text("Model Parameters:");
    $("#model-param").append(subtitle);
    for (var i = 0; i < forestmodel.modelParamNum; i++) {

        div = $("<div class='col-sm-6'></div>");
        div.attr("style", "margin-top:10px");
        label = $("<label style='width:40px'></label>").text("a" + i + ": ");
        input = $("<input class='form-control'>").attr("type", "text");
        input.attr("id", "modelParams" + i);
        input.attr("style", "height:28px");
        input.attr("value", modelParams[i]);
        div.append(label);
        div.append(input);
        $("#model-param").append(div);
        $("#model-param").height((forestmodel.modelParamNum / 2 * 30 + 150) + "px")
    }
    var note = $("<div style='margin-left: 15px; padding: 0 15px 0 15px; color: gray'></div>").text("We recommend that you fill in your own model parameters, Because the default parameters for some models may be improper.");
    $("#model-param").after(note);
}
else if(mdlWeights.length > 0 && mdlWeights[0] !== ""){
    // model weights
    subtitle = $("<h4 style='margin-left: 15px; margin-top: 10px'></h4>").text("Cutting Weights:");
    $("#model-param").append(subtitle);
    for (var i = 0; i < forestmodel.Cutting_Weights; i++) {

        div = $("<div class='col-sm-6'></div>");
        div.attr("style", "margin-top:10px");
        label = $("<label style='width:40px'></label>").text("a" + i + ": ");
        input = $("<input class='form-control'>").attr("type", "text");
        input.attr("id", "mdlWeights" + i);
        input.attr("style", "height:28px");
        input.attr("value", mdlWeights[i]);
        div.append(label);
        div.append(input);
        $("#model-param").append(div);
        $("#model-param").height((forestmodel.Cutting_Weights / 2 * 30 + 150) + "px")
    }
}

// stand parameters
if(standParams.length > 0 && standParams[0] !== "") {

    subtitle = $("<h4 style='margin-left: 15px;margin-top: 15px'></h4>").text("Stand Parameters:");
    $("#stand-param").append(subtitle);
    for (var i = 0; i < forestmodel.standParam.length; i++) {

        var div = $("<div></div>");
        div.attr("style", "margin-top:10px");
        var label = $("<label style='width:200px; padding-left: 15px'></label>").text(forestmodel.standParam[i] + ": ");
        var input = $("<input class='form-control'>").attr("type", "text");
        input.attr("id","standParams"+i);
        input.attr("style", "height:28px");
        input.attr("value", standParams[i]);
        div.append(label);
        div.append(input);
        $("#stand-param").append(div);
        $("#stand-param").height((forestmodel.standParam.length*30+100)+"px")
    }
}

// Cutting parameters
if(cutParams.length > 0 && cutParams[0] !== "") {

    subtitle = $("<h4 style='margin-left: 15px;margin-top: 15px'></h4>").text("Cutting Parameters:");
    $("#stand-param").append(subtitle);
    for (var i = 0; i < cutParams.length; i++) {

        var div = $("<div></div>");
        div.attr("style", "margin-top:10px");
        var label = $("<label style='width:200px; padding-left: 15px'></label>").text(forestmodel.Cutting_Params[i] + ": ");
        var input = $("<input class='form-control'>").attr("type", "text");
        input.attr("id","cutParams"+i);
        input.attr("style", "height:28px");
        input.attr("value", cutParams[i]);
        div.append(label);
        div.append(input);
        $("#stand-param").append(div);
        $("#stand-param").height((cutParams.length*30+100)+"px")
    }
}

// submit and download
var submitBtn = $("<button class='btn'></button>").text("Submit");
var progressbar = $("<div class='progress progress-striped'></div>");
var downloadBtn = $("<button class='btn'></button>").text("Download");
progressbar.attr("style","visibility:hidden");
submitBtn.attr("style","float:left;margin-left:15px;width: 90px;background-color: #007bff;color:white");
progressbar.append("<div class='progress-bar' style='float: left;  width: 20%' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>")
downloadBtn.attr("style","float:right;margin-right:15px;width: 90px;background-color: #007bff;color:white");
// progressbar.hide();
downloadBtn.hide();
$("#modelresult").append(progressbar);
$("#modelresult").append(submitBtn);
$("#modelresult").append(downloadBtn);

// submit parameters
submitBtn.click(function () {
    RunningModel(forestmodel);
});

