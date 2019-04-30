/*
*Read Forest Data
*/

var foreDataset = [], foreDataset1 = [],foreDataset2=[],foreDataset3=[],foreDataset4=[];
var dataType1, dataType2,dataType3,dataType4;

$("#selectData1").change(function () {
    dataType1 = $("#selectData1").val();
});
$("#selectData2").change(function () {
    dataType2 = $("#selectData2").val();
});
$("#selectData3").change(function () {
    dataType3 = $("#selectData3").val();
});
$("#selectData4").change(function () {
    dataType4 = $("#selectData4").val();
});

$("#upload_file").change(function () {
    var files = $("#upload_file")[0].files;
    foreDataset1 = readUDXdata(files, dataType1);
});
$("#upload_file2").change(function () {
    var files = $("#upload_file2")[0].files;
    foreDataset2 = readUDXdata(files, dataType2);
});
$("#upload_file3").change(function () {
    var files = $("#upload_file3")[0].files;
    foreDataset3 = readUDXdata(files, dataType3);
});
$("#upload_file4").change(function () {
    var files = $("#upload_file4")[0].files;
    foreDataset4 = readUDXdata(files, dataType4);
});

// 读取UDX data
function readUDXdata(files, type) {
    foreDataset= [];
    switch (type) {
        case "1":
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                console.log(file);

                // check the data type
                var regex = /\S*.csv/;
                if (!regex.test(file.name)) {
                    alert("Input data error.");
                    return;
                }

                var formdata = new FormData();
                formdata.append("parentid", -1);
                formdata.append("files", file);
                foreDataset = dataprocess(formdata, "csv", file.name);
            }

            break;
        case "2":
            for (var i = 0; i < files.length; i++) {
                file = files[i];

                // check the data type
                var regex = /\S*.zip/;
                if (!regex.test(file.name)) {
                    alert("Input data error.");
                    return;
                }

                var formdata = new FormData();
                formdata.append("parentid", -1);
                formdata.append("files", file);
                dataprocess(formdata, "shp", file.name);
            }

            break;
        case "0":
        default:

            // multiple files
            for (var i = 0; i < files.length; i++) {
                var reader = new FileReader();
                file = files[i];

                // check the data type
                var regex = /\S*.xml/;
                if (!regex.test(file.name)) {
                    alert("Input data error.");
                    return;
                }

                reader.readAsText(file);
                reader.onload = function (data) {

                    var udxdata = data.target.result;
                    var jsonData = $.xml2json(udxdata);

                    foreDataset.push(dataStandardize(jsonData));
                };
                reader.onerror = function () {
                    alert("Input data error.");
                };
            }

            break;
    }
    return foreDataset;
}

function dataprocess(formdata, datatype, name) {

    // var foreDataset= [];

    if(datatype === "csv")
        var serviceid = "5c3919abbdaee805cc4f0102";
    else if(datatype === "shp")
        serviceid = "5c3ce101bdaee805cc4f0118";

    $.ajax({
        url: "http://172.21.212.85:8899/user/uploadfile",
        type: "POST",
        data: formdata,
        async: false,
        processData: false,
        contentType: false,
        success: function (result) {
            var dataid = result.substring(2);
            // console.log(dataid);
            var outfile = "forest.xml";
            var api_url = "http://172.21.212.85:8899/datamap/use/call?id=" + serviceid + "&in_oid=" + dataid + "&in_filename=" + name + "&out_filename=" + outfile + "&out_dir=-1&callType=src2udx";
            $.ajax({
                url: api_url,
                type: "GET",
                async: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    var guid = data;

                    // check records
                    var isGO = true;
                    while(isGO) {
                        $.ajax({
                            url: "http://172.21.212.85:8899/common/records?type=datamap&guid=" + guid,
                            type: "GET",
                            async: false,
                            // contentType: false,
                            success: function (data) {
                                // console.log(data);
                                if(data.length>0 && data[0].delete === "-1") {
                                    isGO = false;

                                    dataid = data[0].output[0].oid;
                                    $.ajax({
                                        url: "http://172.21.212.85:8899/user/download?dataId=" + dataid,
                                        type: "GET",
                                        async: false,
                                        // contentType: false,
                                        success: function (data) {
                                            // console.log(data);
                                            var jsonData = $.xml2json(data);

                                            foreDataset.push(dataStandardize(jsonData));

                                        },
                                        error:function () {
                                            console.log("Download Data Fail!");
                                        }
                                    });
                                }

                            },
                            error: function () {
                                console.log("Inquiry Records Fail!");
                            }
                        });
                        setTimeout(1000);
                    }

                },
                error: function () {
                    console.log("Data Mapping Fail!");
                }
            });
        },
        error: function () {
            console.log("Upload Data Fail!");
        }
    });
}

// 处理 data
function dataStandardize(jsonData) {
    // var xmlDoc=loadXMLDoc("data/udx/forest.xml");
    // // var udxData = xmlDoc.getElementsByTagName("dataset");
    // var jsonData = $.xml2json(xmlDoc);

    var foreData = {
        "ID": [],
        "Age": [],
        "X": [],
        "Y": [],
        "DBH": [],
        "Height": [],
        "UBH": [],
        "CW": [],
        "CH": [],
        "Biomass": [],
        "Volume": []
    };
    for (var i = 0; i < jsonData.XDO.length; i++) {
        if (jsonData.XDO[i]["@name"] === "idList") {
            var strID = jsonData.XDO[i]["@value"];
            foreData.ID = strID.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "aList") {
            var strAge = jsonData.XDO[i]["@value"];
            foreData.Age = strAge.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "xList") {
            var strX = jsonData.XDO[i]["@value"];
            foreData.X = strX.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "yList") {
            var strY = jsonData.XDO[i]["@value"];
            foreData.Y = strY.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "zList") {
            var strZ = jsonData.XDO[i]["@value"];
            foreData.Z = strZ.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "dList") {
            var strDBH = jsonData.XDO[i]["@value"];
            foreData.DBH = strDBH.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "hList") {
            var strH = jsonData.XDO[i]["@value"];
            foreData.Height = strH.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "hbList") {
            var strUBH = jsonData.XDO[i]["@value"];
            foreData.UBH = strUBH.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "cList") {
            var strCW = jsonData.XDO[i]["@value"];
            foreData.CW = strCW.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "chList") {
            var strCH = jsonData.XDO[i]["@value"];
            foreData.CH = strCH.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "vList") {
            var strVolume = jsonData.XDO[i]["@value"];
            foreData.Volume = strVolume.split(", ");
        }
        if (jsonData.XDO[i]["@name"] === "bioList") {
            var strBiomass = jsonData.XDO[i]["@value"];
            foreData.Biomass = strBiomass.split(", ");
        }
    }

    // 数据标准化
    for (var i = 0; i < foreData.X.length; i++) {
        foreData.ID[i] = parseFloat(foreData.ID[i]);
        foreData.Age[i] = parseFloat(foreData.Age[i]);
        foreData.X[i] = parseFloat(foreData.X[i]);
        foreData.Y[i] = parseFloat(foreData.Y[i]);
        foreData.Z[i] = parseFloat(foreData.Z[i]);
        foreData.DBH[i] = parseFloat(foreData.DBH[i]);
        foreData.Height[i] = parseFloat(foreData.Height[i]);
        foreData.UBH[i] = parseFloat(foreData.UBH[i]);
        foreData.CW[i] = parseFloat(foreData.CW[i]);
        foreData.CH[i] = parseFloat(foreData.CH[i]);
        foreData.Volume[i] = parseFloat(foreData.Volume[i]);
        foreData.Biomass[i] = parseFloat(foreData.Biomass[i]);
    }
    var maxX = foreData.X[0], minX = foreData.X[0], maxY = foreData.Y[0], minY = foreData.Y[0], cenX, cenY;
    for (var i = 0; i < foreData.X.length; i++) {

        if (foreData.X[i] > maxX) {
            maxX = foreData.X[i];
        }
        if (foreData.X[i] < minX) {
            minX = foreData.X[i];
        }
        if (foreData.Y[i] > maxY) {
            maxY = foreData.Y[i];
        }
        if (foreData.Y[i] < minY) {
            minY = foreData.Y[i];
        }
    }
    cenY = (maxY + minY) / 2;
    cenX = (maxX + minX) / 2;
    for (var i = 0; i < foreData.X.length; i++) {
        foreData.X[i] = foreData.X[i] - cenX;
        foreData.Y[i] = foreData.Y[i] - cenY;
    }

    return foreData;
}


/*
*径阶分布
*/
function classesVisual() {

    if(foreDataset1 === "" || foreDataset1 === undefined || foreDataset1.length === 0)
        return;

    //处理数据
    var foreData = foreDataset1[0];
    var histo_json = {"text": [], "name": [], "xAxis": [], "data": []};

    var variable = $("#selectVariable").val();

    if (variable === "0") {
        histo_json.text = "DBH Classes";
        histo_json.name = "DBH Frequency";
        histo_json.xAxis = calxAxis(foreData.DBH);
        histo_json.data = calFrequence(histo_json.xAxis, foreData.DBH);

        var axis = histo_json.xAxis;
        for (var i in axis) {
            histo_json.xAxis[i] = axis[i] + "cm - " + (axis[i] + 1) + "cm";
        }
    }
    else if (variable === "1") {
        histo_json.text = "Height Classes";
        histo_json.name = "Height Frequency";
        histo_json.xAxis = calxAxis(foreData.Height);
        histo_json.data = calFrequence(histo_json.xAxis, foreData.Height);

        var axis = histo_json.xAxis;
        for (var i in axis) {
            histo_json.xAxis[i] = axis[i] + "m - " + (axis[i] + 1) + "m";
        }
    }
    else if (variable === "2") {
        histo_json.text = "Crown Width Classes";
        histo_json.name = "CW Frequency";
        histo_json.xAxis = calxAxis(foreData.CW);
        histo_json.data = calFrequence(histo_json.xAxis, foreData.CW);

        var axis = histo_json.xAxis;
        for (var i in axis) {
            histo_json.xAxis[i] = axis[i] + "m - " + (axis[i] + 1) + "m";
        }
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('histo-main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: histo_json.text
            // text: 'DBH Class'
        },
        tooltip: {},
        legend: {
            data: ['Frequency']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            data: histo_json.xAxis
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} %'
            }
        },
        series: [{
            name: histo_json.name,
            type: 'bar',
            data: histo_json.data
            // data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    window.onresize = myChart.resize;
    $("#histo-main").resize(myChart.resize);
    myChart.setOption(option);

}

function calxAxis(data) {
    var xAxis = [];
    var min = data[0], max = data[0];
    for (var i = 0; i < data.length; i++) {

        if (data[i] > max) {
            max = data[i];
        }
        if (data[i] < min) {
            min = data[i];
        }
    }
    for (var i = Math.floor(min); i <= Math.floor(max); i++) {
        xAxis.push(i);
    }
    return xAxis;
}

function calFrequence(xAxis, value) {

    var data = [];
    var index;
    for (index in xAxis) {
        var count = 0;
        for (var j = 0; j < value.length; j++) {

            if (value[j] > xAxis[index] && value[j] < xAxis[index] + 1) {
                count++;
            }
        }
        var frequency = count / value.length;
        data.push(frequency.toFixed(2) * 100);
    }
    return data;
}

/*
* 生长趋势
*/
function lineVisual() {

    if(foreDataset2 === "" || foreDataset2 === undefined || foreDataset2.length === 0)
        return;

    // 处理数据
    var line_json = {"text": [], "legend": [], "xAxis": [], "data": [], "maxdata": [], "mindata": []};
    var variable = $("#selectVariable-line").val();

    line_json.xAxis = calGrowthxAxis(foreDataset2);
    foreDataset2.sort(DataUp);

    if (variable === "0") {
        line_json.text = "DBH Growth";
        line_json.legend = ["Average DBH", "Maximum DBH", "Minimum DBH"];

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.DBH[0];
            var min = data.DBH[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.DBH[j];
                if (data.DBH[j] > max) {
                    max = data.DBH[j];
                }
                if (data.DBH[j] < min) {
                    min = data.DBH[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }

    }
    else if (variable === "1") {
        line_json.text = "Height Growth";
        line_json.legend = ["Average Height", "Maximum Height", "Minimum Height"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);
        //
        // foreDataset.sort(DataUp);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.Height[0];
            var min = data.Height[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.Height[j];
                if (data.Height[j] > max) {
                    max = data.Height[j];
                }
                if (data.Height[j] < min) {
                    min = data.Height[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }

    }
    else if (variable === "2") {
        line_json.text = "CW Growth";
        line_json.legend = ["Average CW", "Maximum CW", "Minimum CW"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.CW[0];
            var min = data.CW[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.CW[j];
                if (data.CW[j] > max) {
                    max = data.CW[j];
                }
                if (data.CW[j] < min) {
                    min = data.CW[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }
    }
    else if (variable === "3") {
        line_json.text = "CH Growth";
        line_json.legend = ["Average CH", "Maximum CH", "Minimum CH"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.CH[0];
            var min = data.CH[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.CH[j];
                if (data.CH[j] > max) {
                    max = data.CH[j];
                }
                if (data.CH[j] < min) {
                    min = data.CH[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }
    }
    else if (variable === "4") {
        line_json.text = "UBH Growth";
        line_json.legend = ["Average UBH", "Maximum UBH", "Minimum UBH"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.UBH[0];
            var min = data.UBH[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.UBH[j];
                if (data.UBH[j] > max) {
                    max = data.UBH[j];
                }
                if (data.UBH[j] < min) {
                    min = data.UBH[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }
    }
    else if (variable === "5") {
        line_json.text = "Volume Growth";
        line_json.legend = ["Average Volume", "Maximum Volume", "Minimum Volume"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.Volume[0];
            var min = data.Volume[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.Volume[j];
                if (data.Volume[j] > max) {
                    max = data.Volume[j];
                }
                if (data.Volume[j] < min) {
                    min = data.Volume[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }
    }
    else if (variable === "6") {
        line_json.text = "Biomass Growth";
        line_json.legend = ["Average Biomass", "Maximum Biomass", "Minimum Biomass"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            var avg = 0;
            var max = data.Biomass[0];
            var min = data.Biomass[0];
            for (var j = 0; j < data.ID.length; j++) {
                avg += data.Biomass[j];
                if (data.Biomass[j] > max) {
                    max = data.Biomass[j];
                }
                if (data.Biomass[j] < min) {
                    min = data.Biomass[j];
                }
            }
            line_json.data.push((avg / data.ID.length).toFixed(2));
            line_json.maxdata.push(max);
            line_json.mindata.push(min);
        }
    }
    else if (variable === "7") {
        line_json.text = "Tree number change";
        line_json.legend = ["Tree Number"];
        // line_json.xAxis = calGrowthxAxis(foreDataset);

        for (var i = 0; i < foreDataset2.length; i++) {

            var data = foreDataset2[i];
            line_json.data.push(data.ID.length);
        }
    }

    var myChart = echarts.init(document.getElementById('line-main'));
    var option = {
        title: {
            text: line_json.text
            // text: 'Forest Growth Tendency'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: line_json.legend
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: line_json.xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (params) {
                        var patt = /DBH/i;
                        if (patt.test(line_json.legend[0]))
                            return (params + "cm");
                        else
                            return (params + "m");
                    }
                }
            }
        ],
        series: [
            {
                name: line_json.legend[0],
                type: 'line',
                data: line_json.data
            },
            {
                name: line_json.legend[1],
                type: 'line',
                data: line_json.maxdata
            },
            {
                name: line_json.legend[2],
                type: 'line',
                data: line_json.mindata
            }
        ]
    };
    window.onresize = myChart.resize;
    $("#line-main").resize(myChart.resize);
    myChart.setOption(option);
}

// 计算生长趋势线的X轴
function calGrowthxAxis(dataset) {

    var years = [];
    for (var i = 0; i < dataset.length; i++) {
        var data = dataset[i];
        var year = data.Age[0];
        years.push(year + "years old");
    }
    years.sort(up);
    return years;
}

function up(x, y) {
    return (x > y) ? 1 : -1
}

function DataUp(x, y) {
    return (x.Age[0] > y.Age[0]) ? 1 : -1
}

/*
* 散点图
*/
function pointVisual() {

    if(foreDataset3 === "" || foreDataset3 === undefined || foreDataset3.length === 0)
        return;

    if (foreDataset3[0].ID.length !== foreDataset3[1].ID.length)
        return;

    // 处理数据
    var point_json = {"text": [], "legend": [], "data1": [], "data2": []};
    point_json.text = "Distribution of Points";

    var variable1 = $("#selectXAxis").val();
    var variable2 = $("#selectYAxis").val();

    if (variable1 === "0") {
        point_json.legend.push("DBH1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.DBH[i]);
        }
    }
    else if (variable1 === "1") {
        point_json.legend.push("Height1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.Height[i]);
        }
    }
    else if (variable1 === "2") {
        point_json.legend.push("CW1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.CW[i]);
        }
    }
    else if (variable1 === "3") {
        point_json.legend.push("DBH2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.DBH[i]);
        }
    }
    else if (variable1 === "4") {
        point_json.legend.push("Height2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.Height[i]);
        }
    }
    else if (variable1 === "5") {
        point_json.legend.push("CW2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data1.push(data.CW[i]);
        }
    }

    if (variable2 === "0") {
        point_json.legend.push("DBH1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.DBH[i]);
        }
    }
    else if (variable2 === "1") {
        point_json.legend.push("Height1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.Height[i]);
        }
    }
    else if (variable2 === "2") {
        point_json.legend.push("CW1");

        var data = foreDataset3[0];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.CW[i]);
        }
    }
    else if (variable2 === "3") {
        point_json.legend.push("DBH2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.DBH[i]);
        }
    }
    else if (variable2 === "4") {
        point_json.legend.push("Height2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.Height[i]);
        }
    }
    else if (variable2 === "5") {
        point_json.legend.push("CW2");

        var data = foreDataset3[1];

        for (var i = 0; i < data.ID.length; i++) {
            point_json.data2.push(data.CW[i]);
        }
    }

    var pointData = mergeData(point_json.data1, point_json.data2);

    var myChart = echarts.init(document.getElementById('point-main'));
    var option = {
        title: {
            text: point_json.text
        },
        tooltip: {
            trigger: 'axis',
            showDelay: 0,
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        legend: {
            data: point_json.legend
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                saveAsImage: {show: true}
            }
        },
        xAxis: [
            {
                type: 'value',
                scale: true,
                axisLabel: {
                    formatter: function (params) {
                        var patt = /DBH/i;
                        if (patt.test(point_json.legend[0]))
                            return (params + "cm");
                        else
                            return (params + "m");
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                axisLabel: {
                    formatter: function (params) {
                        var patt = /DBH/i;
                        if (patt.test(point_json.legend[1]))
                            return (params + "cm");
                        else
                            return (params + "m");
                    }
                }
            }
        ],
        series: [
            {
                name: point_json.legend,
                type: 'scatter',
                data: pointData

            }
        ]
    };
    window.onresize = myChart.resize;
    $("#point-main").resize(myChart.resize);
    myChart.setOption(option);
}

function mergeData(data1, data2) {

    var points = [];
    for (var i = 0; i < foreDataset3[0].ID.length; i++) {
        var point = [];
        point.push(data1[i]);
        point.push(data2[i]);
        points.push(point);
    }
    return points;
}

// foreData = readUDXData();
// var foreFeild = [];
// foreFeild = readUDXSchema();

// //读取XML对象。
// function loadXMLDoc(xmlFile) {
//     var xmlDoc;
//     if (window.ActiveXObject) {
//         xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE
//         xmlDoc.async = false;
//         xmlDoc.load(xmlFile);
//     }
//     else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐
//
//         xmlDoc = document.implementation.createDocument('', '', null);
//         xmlDoc.load(xmlFile);
//     }
//     else { //谷歌
//         var xmlhttp = new window.XMLHttpRequest();
//         xmlhttp.open("GET", xmlFile, false);
//         xmlhttp.send(null);
//         if (xmlhttp.readyState == 4) {
//             xmlDoc = xmlhttp.responseXML.documentElement;
//         }
//     }
//
//     return xmlDoc;
// }
