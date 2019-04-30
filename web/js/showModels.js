$(document).ready(function () {
    $.getJSON("js/modelInfo.json", function (data) {
        var models;

        for (var modelType in data) {

             if (/DBH/.test(modelType)) {
                var dbhmodeldiv = '<div class="title text-center">' +
                    '<h3><span>DBH Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the individual-tree growth of diameter at breast height.</h10></div>'+
                    '<div class="info clearfix" id="DBHModelList"></div>';
                $("#dbhPanel").append(dbhmodeldiv);

                models = data["DBH_Model"];
                CreateModels(models, "DBH");
            }
            else if (/Height/.test(modelType)) {
                var heightmodeldiv = '<div class="title text-center">' +
                    '<h3><span>Height Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the individual-tree growth of tree height.</h10></div>'+
                    '<div class="info clearfix" id="HeightModelList"></div>';
                $("#heightPanel").append(heightmodeldiv);

                models = data["Height_Model"];
                CreateModels(models, "Height");
            }
            else if (/CW/.test(modelType)) {
                var cwmodeldiv = '<div class="title text-center">' +
                    '<h3><span>CW Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the individual-tree growth of crown width..</h10></div>'+
                    '<div class="info clearfix" id="CWModelList"></div>';
                $("#cwPanel").append(cwmodeldiv);

                models = data["CW_Model"];
                CreateModels(models, "CW");
            }
            else if (/CH/.test(modelType)) {
                var chmodeldiv = '<div class="title text-center">' +
                    '<h3><span>CH Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the individual-tree growth of crown height.</h10></div>'+
                    '<div class="info clearfix" id="CHModelList"></div>';
                $("#chPanel").append(chmodeldiv);

                models = data["CH_Model"];
                CreateModels(models, "CH");
            }
            else if (/UBH/.test(modelType)) {
                var ubhmodeldiv = '<div class="title text-center">' +
                    '<h3><span>UBH Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the individual-tree growth of under branch height.</h10></div>'+
                    '<div class="info clearfix" id="UBHModelList"></div>';
                $("#ubhPanel").append(ubhmodeldiv);

                models = data["UBH_Model"];
                CreateModels(models, "UBH");
            }
            else if (/Mortality/.test(modelType)) {
                var mortalitymodeldiv = '<div class="title text-center">' +
                    '<h3><span>Mortality Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the mortality rate of individual tree.</h10></div>'+
                    '<div class="info clearfix" id="MortalityModelList"></div>';
                $("#mortalityPanel").append(mortalitymodeldiv);

                models = data["Mortality_Model"];
                CreateModels(models, "Mortality");
            }
            else if (/Biomass/.test(modelType)) {
                var biomassmodeldiv = '<div class="title text-center">' +
                    '<h3><span>Biomass Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>It is a model which can predict the biomass of individual trees.</h10></div>'+
                    '<div class="info clearfix" id="BiomassModelList"></div>';
                $('#biomassPanel').append(biomassmodeldiv);

                models = data["Biomass_Model"];
                CreateModels(models, "Biomass");
            }
             else if (/Volume/.test(modelType)) {
                 var volumemodeldiv = '<div class="title text-center">' +
                     '<h3><span>Volume Models</span></h3>' +
                     '</div>' +
                     '<div style="margin-top: 10px"><h10>It is a model which can predict the volume of individual trees.</h10></div>'+
                     '<div class="info clearfix" id="VolumeModelList"></div>';
                 $('#volumePanel').append(volumemodeldiv);

                 models = data["Volume_Model"];
                 CreateModels(models, "Volume");
             }
            else {
                var othermodeldiv = '<div class="title text-center">' +
                    '<h3><span>Other Models</span></h3>' +
                    '</div>' +
                    '<div style="margin-top: 10px"><h10>Other models in forestry.</h10></div>'+
                    '<div class="info clearfix" id="OtherModelList"></div>';
                $('#otherModelPanel').append(othermodeldiv);

                models = data["Other_Model"];
                CreateModels(models, "Other");
            }
        }
    })
});

var CreateModels = function (data, type) {

    for (var i = 0; i < data.length; i++) {

        var modelName = data[i].Name;
        if(/Cutting/.test(modelName)) {
            var modeldiv =
                '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">' +
                '<div class="modelThumbnail">' +
                '<div class="picPanel">' +
                '<img src="./images/model/' + 'Cutting.jpg" style="cursor: pointer" alt="' + modelName + '" title="To the Introduction of Model" onclick="getModelItemID(this)">' +
                '</div>' +
                '<div class="modelDetail">' +
                '</div>' +
                '<ul class="modelNav clearfix">' +
                '<li class="pull-right">' +
                '<i class="fa fa-tasks" style="cursor: pointer" id="' + modelName + '" title="To Computable Model" onclick="getComputableModelID(this)"></i>' +
                '</li>' +
                // '<li class="pull-right" title="' + modelName + '"></li>' +
                '</ul>' +
                '</div>' +
                '<div class="modelThumbnailTitle">' +
                '<p style="text-align: center">' + modelName + '</p>' +
                '</div>' +
                '</div>';
        }
        else {
            var modeldiv =
                '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">' +
                '<div class="modelThumbnail">' +
                '<div class="picPanel">' +
                '<img src="./images/model/' + modelName.split("_")[0] + '.jpg" style="cursor: pointer" alt="' + modelName + '" title="To the Introduction of Model" onclick="getModelItemID(this)">' +
                '</div>' +
                '<div class="modelDetail">' +
                '</div>' +
                '<ul class="modelNav clearfix">' +
                '<li class="pull-right">' +
                '<i class="fa fa-tasks" style="cursor: pointer" id="' + modelName + '" title="To Computable Model" onclick="getComputableModelID(this)"></i>' +
                '</li>' +
                // '<li class="pull-right" title="' + modelName + '"></li>' +
                '</ul>' +
                '</div>' +
                '<div class="modelThumbnailTitle">' +
                '<p style="text-align: center">' + modelName + '</p>' +
                '</div>' +
                '</div>';
        }


        if (type === "DBH") {

            $("#DBHModelList").append(modeldiv);
        }
        else if (type === "Height") {

            $("#HeightModelList").append(modeldiv);
        }
        else if (type === "CW") {

            $("#CWModelList").append(modeldiv);
        }
        else if (type === "CH") {

            $("#CHModelList").append(modeldiv);
        }
        else if (type === "UBH") {

            $("#UBHModelList").append(modeldiv);
        }
        else if (type === "Mortality") {

            $("#MortalityModelList").append(modeldiv);
        }
        else if (type === "Biomass") {
            $("#BiomassModelList").append(modeldiv);
        }
        else if (type === "Volume") {
            $("#VolumeModelList").append(modeldiv);
        }
        else {
            $("#OtherModelList").append(modeldiv);
        }
    }
};

function getModelItemID(e) {
    $.ajax({
        type: "Post",
        url: "/FGM-theme/queryModelIDServlet",
        data: {"model_name": e.alt,"type":"modelItem"},
        dataType: "json",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            window.open('http://222.192.7.75/OpenGMS/page/model-item-info/model-item-info.html?' + data.modelID);
            // window.location.href='http://222.192.7.75/OpenGMS/page/model-item-info/model-item-info.html?' + data.modelID;
        }
    });
}

function getComputableModelID(e) {
    $.ajax({
        type: "Post",
        url: "/FGM-theme/queryModelIDServlet",
        data: {"model_name": e.id,"type":"ComputableModel"},
        dataType: "json",
        success: function (data) {
            window.open(' http://222.192.7.75/OpenGMS/page/computable-model-info/computable-model-info.html?' + data.modelID);
        }
    });
}