/*
* @by Mzy
*/

// create parameters xml and submit data
function RunningModel(model) {

    var formData = new FormData();
    var name = model.Name;
    formData.append("name", name);

    for (var i = 0; i < model.data_upload.length; i++) {

        var filekey = model.data_upload[i];
        var fileid = "datainput" + i;
        if (document.getElementById(fileid).files[0] != null && document.getElementById(fileid).files[0].type === "application/zip") {
            formData.append(filekey, document.getElementById(fileid).files[0]);
        }
        else {
            if (document.getElementById(fileid).files[0] == null) {
                confirm("Please confirm uploaded file is not null!");
            }
            else {
                confirm("Please confirm the type of uploaded file!");
            }
            return;
        }
    }

    var str = '<?xml version="1.0" encoding="UTF-8"?>';
    switch (true) {
        case /DBH_/.test(name):

            str += '<Model_Parameters>';
            str += '<DBH_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                var id = "#modelParams" + i;
                var param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</DBH_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                var id = "#standParams" + i;
                var param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /Height_/.test(name):

            str += '<Model_Parameters>';
            str += '<H_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</H_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /CW_/.test(name):

            str += '<Model_Parameters>';
            str += '<CW_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</CW_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /CH/.test(name):

            str += '<Model_Parameters>';
            str += '<CH_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</CH_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /UBH/.test(name):

            str += '<Model_Parameters>';
            str += '<UBH_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</UBH_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /Mortality/.test(name):

            str += '<Model_Parameters>';
            str += '<Mortality_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</Mortality_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /Biomass/.test(name):

            str += '<Model_Parameters>';
            str += '<Biomass_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</Biomass_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Model_Parameters", str);

            break;
        case /Volume/.test(name):

            str += '<Model_Parameters>';
            str += '<Volume_Paramters>';
            for (i = 0; i < model.modelParamNum; i++) {
                str += '<param' + (i + 1) + '>';
                id = "#modelParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</param' + (i + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of parameter" + i + "!");
                    return;
                }
            }
            str += '</Volume_Paramters>';
            str += '<Stand_Parameters>';
            for (var i = 0; i < model.standParam.length; i++) {
                str += '<' + model.standParam[i] + '>';
                id = "#standParams" + i;
                param = $(id).val();
                if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                    str += param;
                    str += '</' + model.standParam[i] + '>';
                }
                else {
                    confirm("Please confirm the value of " + model.standParam[i] + "!");
                    return;
                }
            }
            str += '</Stand_Parameters>';
            str += '</Model_Parameters>';
            formData.append("Parameters", str);

            break;
        case /CuttingByWeight/.test(name):

            str += '<Management_Parameters>';
            str += '<Management1>';
            str += '<Cutting_Age>';
            id = "#cutParams0";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Cutting_Age>';
            str += '<Cutting_Type>';
            id = "#cutParams1";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Cutting_Type>';
            str += '<Intensity>';
            id = "#cutParams2";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Intensity>';
            str += '<Cutting_Weights>';
            for (var j = 0; j < 7; j++) {
                id = "#mdlWeights" + j;
                if ($(id).val() != null && /^(-?\d+)(\.\d+)?$/.test($(id).val())) {
                    str += '<Weight' + (j + 1) + '>' + $(id).val() + '</Weight' + (j + 1) + '>';
                }
                else {
                    confirm("Please confirm the value of Weight" + j + "!");
                    return;
                }
            }
            str += '</Cutting_Weights>';
            str += '</Management1>';
            str += '</Management_Parameters>';
            formData.append("Management_Parameters", str);
            break;

        default:
            str += '<Management_Parameters>';
            str += '<Management1>';
            str += '<Cutting_Age>';
            id = "#cutParams0";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Cutting_Age>';
            str += '<Cutting_Up>';
            id = "#cutParams1";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Cutting_Up>';
            str += '<Threshold>';
            id = "#cutParams2";
            param = $(id).val();
            if (param != null && /^(-?\d+)(\.\d+)?$/.test(param)) {
                str += param;
            }
            else {
                confirm("Please confirm the value of parameter" + i + "!");
                return;
            }
            str += '</Threshold>';
            str += '</Management1>';
            str += '</Management_Parameters>';
            formData.append("Management_Parameters", str);

            break;

    }

    progressbar.attr("style", "visibility:shown");
    $(".progress-bar").width("20%");

    $.ajax({
        type: "POST",
        url: "/FGM-theme/runModelServlet",
        data: formData,
        // dataType: "json",
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,  // 不设置内容类型
        beforeSend: function () {
            $(".progress-bar").width("80%");
        },
        complete: function () {
            $(".progress-bar").width("99%");
        },
        success: function (data) {

            $(".progress-bar").width("90%");

            if (data !== "") {

                progressbar.attr("style", "visibility:hidden");
                downloadBtn.show();

                // download result
                downloadBtn.click(function () {
                    window.open(data);
                    // window.location.href=data;
                });

            }
            else {
                progressbar.attr("style", "visibility:hidden");
                confirm("data is empty!");
            }
        },
        error: function () {
            progressbar.attr("style", "visibility:hidden");
            confirm("error fail!");
        }
    });
}
