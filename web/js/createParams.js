// create parameters xml and submit data
function createParamXML(value, type, models) {

    var count = models[value].data_upload.length;

    // process bar
    var processbar = '<div class="progress progress-striped">' +
        '<div class="progress-bar" style="float: left;  width: 20%" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>' +
        '</div>';

    var formData = new FormData();
    var name = models[value].Name;
    formData.append("name", name);

    var str = '<?xml version="1.0" encoding="UTF-8"?>';
    if (/DBH/.test(type)) {

        $('#dbhresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "dbhData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<DBH_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1) + '>';
            var id = "#dbhModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</DBH_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#dbhStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/Height/.test(type)) {

        $('#heightresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "heightData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<H_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1) + '>';
            var id = "#heightModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</H_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#heightStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/CW/.test(type)) {

        $('#cwresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "cwData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<CW_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1)  + '>';
            var id = "#cwModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</CW_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#cwStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/CH/.test(type)) {

        $('#chresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "chData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<CH_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1)  + '>';
            var id = "#chModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</CH_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#chStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/UBH/.test(type)) {

        $('#ubhresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "ubhData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<UBH_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1)  + '>';
            var id = "#ubhModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</UBH_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#ubhStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/Mortality/.test(type)) {

        $('#mortalityresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "mortalityData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<Mortality_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1)  + '>';
            var id = "#mortalityModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Mortality_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#mortalityStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else if (/Biomass/.test(type)) {

        $('#biomassresult').html(processbar);

        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "biomassData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Model_Parameters>';
        str += '<Biomass_Paramters>';
        for (i = 0; i < models[value].modelParamNum; i++) {
            str += '<param' + (i + 1)  + '>';
            var id = "#biomassModelParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</param' + (i + 1)  + '>';
            }
            else {
                confirm("Please confirm the value of parameter"+i+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Biomass_Paramters>';

        str += '<Stand_Parameters>';
        for (var i = 0; i < models[value].standParam.length; i++) {
            str += '<' + models[value].standParam[i] + '>';
            var id = "#biomassStandParam" + i;
            var param = $(id).val();
            if(param!=null&&/^(-?\d+)(\.\d+)?$/.test(param)){
                str += param;
                str += '</' + models[value].standParam[i] + '>';
            }
            else {
                confirm("Please confirm the value of "+models[value].standParam[i]+"!");
                $(".progress").remove();
                return;
            }
        }
        str += '</Stand_Parameters>';

        str += '</Model_Parameters>';
        formData.append("Model_Parameters", str);
    }
    else {

        $('#otherresult').html(processbar);
        for (var i= 0; i < count; i++) {

            var filekey = models[value].data_upload[i];
            var fileid = "otherData" + i;
            if(document.getElementById(fileid).files[0]!=null&&document.getElementById(fileid).files[0].type==="application/zip"){
                formData.append(filekey, document.getElementById(fileid).files[0]);
            }
            else{
                if (document.getElementById(fileid).files[0]==null){
                    confirm("Please confirm uploaded file is not null!");
                }
                else {
                    confirm("Please confirm the type of uploaded file!");
                }
                $(".progress").remove();
                return;
            }
        }

        str += '<Management_Parameters>';

        if(value === "0") {
            str = "";
        }
        else if(value === "1"){

            for(var i = 0;i < 1;i++) {
                str += '<Management'+(i+1)+'>';

                if($("#cutParams0").val()!=null&&/^(-?\d+)(\.\d+)?$/.test($("#cutParams0").val())
                &&$("#cutParams1").val()!=null&&/^(-?\d+)(\.\d+)?$/.test($("#cutParams1").val())
                &&$("#cutParams2").val()!=null&&/^(-?\d+)(\.\d+)?$/.test($("#cutParams2").val())){
                    str +='<Cutting_Age>'+$("#cutParams0").val()+'</Cutting_Age>';
                    str +='<Cutting_Type>'+$("#cutParams1").val()+'</Cutting_Type>';
                    str +='<Intensity>'+$("#cutParams2").val()+'</Intensity>';
                }
                else {
                    confirm("Please confirm the value of Cutting Parameters!");
                    $(".progress").remove();
                    return;
                }

                str +='<Cutting_Weights>';
                for(var j = 0;j < 7;j++) {
                    var id = "#cutWeights"+ j;
                    if($(id).val()!=null&&/^(-?\d+)(\.\d+)?$/.test($(id).val())){
                        str +='<Weight'+(j+1)+'>'+$(id).val()+'</Weight'+(j+1)+'>';
                    }
                    else {
                        confirm("Please confirm the value of Weight"+j+"!");
                        $(".progress").remove();
                        return;
                    }
                }

                str +='</Cutting_Weights>';
                str += '</Management'+(i+1)+'>';
            }

            str += '</Management_Parameters>';
            formData.append("Management_Parameters", str);

        }

    }


    $.ajax({
        type: "POST",
        url: "/FGM-theme/runModelServlet",
        data: formData,
        // dataType: "json",
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,  // 不设置内容类型
        beforeSend:function() {
            $(".progress-bar").width("80%");
        },
        complete:function() {
            $(".progress-bar").width("99%");
        },
        success: function (data) {

            $(".progress-bar").width("90%");
            if(data !== "") {

                var result_html = '<a href="' + data + '">result download</a>';
                modelEnd(type,result_html)

            }
            else {
                confirm("data is empty!");
                modelEnd(type,"")
            }
        },
        error: function () {
            confirm("error fail!");
            modelEnd(type,"")
        }
    });
}

// Default data and parameters
function useDefaultParam(value, type, models) {

    // process bar
    var processbar = '<div class="progress progress-striped">' +
        '<div class="progress-bar" style="float: left;  width: 20%" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>' +
        '</div>';
    if (/DBH/.test(type)) {

        $('#dbhresult').html(processbar);
    }
    else if (/Height/.test(type)) {

        $('#heightresult').html(processbar);
    }
    else if (/CW/.test(type)) {

        $('#cwresult').html(processbar);
    }
    else if (/CH/.test(type)) {

        $('#chresult').html(processbar);
    }
    else if (/UBH/.test(type)) {

        $('#ubhresult').html(processbar);
    }
    else if (/Mortality/.test(type)) {

        $('#mortalityresult').html(processbar);
    }
    else if (/Biomass/.test(type)) {

        $('#biomassresult').html(processbar);
    }
    else {

        $('#otherresult').html(processbar);
    }

    var formData = new FormData();
    var name = models[value].Name;
    formData.append("name", name);
    formData.append("testData", "true");

    $.ajax({
        type: "POST",
        url: "/FGM-theme/runModelServlet",
        data: formData,
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,  // 不设置内容类型
        beforeSend:function() {
            $(".progress-bar").width("85%");
        },
        complete:function() {
            $(".progress-bar").width("99%");
        },
        success: function (data) {

            $(".progress-bar").width("90%");

            if( data !== "") {

                var result_html = '<a href="' + data + '">result download</a>';

                if (/DBH/.test(type)) {

                    $('#dbhresult').html(result_html);
                }
                else if (/Height/.test(type)) {

                    $('#heightresult').html(result_html);
                }
                else if (/CW/.test(type)) {

                    $('#cwresult').html(result_html);
                }
                else if (/CH/.test(type)) {

                    $('#chresult').html(result_html);
                }
                else if (/UBH/.test(type)) {

                    $('#ubhresult').html(result_html);
                }
                else if (/Mortality/.test(type)) {

                    $('#mortalityresult').html(result_html);
                }
                else if (/Biomass/.test(type)) {

                    $('#biomassresult').html(result_html);
                }
                else {

                    $('#otherresult').html(result_html);
                }
            }
            else {
                confirm("fail!");
                modelEnd(type,"")
            }
        },
        error: function () {
            confirm("fail!");
            modelEnd(type,"")
        }
    });
}

function modelEnd(type,href) {
    var result_html = href;

    if (/DBH/.test(type)) {

        $('#dbhresult').html(result_html);
    }
    else if (/Height/.test(type)) {

        $('#heightresult').html(result_html);
    }
    else if (/CW/.test(type)) {

        $('#cwresult').html(result_html);
    }
    else if (/CH/.test(type)) {

        $('#chresult').html(result_html);
    }
    else if (/UBH/.test(type)) {

        $('#ubhresult').html(result_html);
    }
    else if (/Mortality/.test(type)) {

        $('#mortalityresult').html(result_html);
    }
    else if (/Biomass/.test(type)) {

        $('#biomassresult').html(result_html);
    }
    else {

        $('#otherresult').html(result_html);
    }
}
