$(document).ready(function () {

    //male
    $("#register-input-male").click(function () {
        $("#register-label-male").removeClass("btn btn-default").addClass("btn btn-primary");
        $("#register-label-female").removeClass("btn btn-primary").addClass("btn btn-default");
        this.checked = "checked";
    });

    //female
    $("#register-input-female").click(function () {
        $("#register-label-female").removeClass("btn btn-default").addClass("btn btn-primary");
        $("#register-label-male").removeClass("btn btn-primary").addClass("btn btn-default");
        this.checked = "checked";
    });


    //submit
    $("#register-btn-submit").click(function () {
        //判空
        if (checkInputEmpty("#register-input-username")) {
            //为空则使颜色变红
            setInput2RedColor("#register-input-username");
        }
        else if (checkInputEmpty("#register-input-email")) {
            setInput2RedColor("#register-input-email");
        }
        else if (checkInputEmpty("#register-input-password")) {
            setInput2RedColor("#register-input-password");
        }
        else if (checkInputEmpty("#register-input-mobilephone")) {
            setInput2RedColor("#register-input-mobilephone");
        }
        else {

            var userName = $("#register-input-username").val();
            var email = $("#register-input-email").val();
            var password = $("#register-input-password").val();
            var mobilephone = $("#register-input-mobilephone").val();
            //选取input元素中，name=register-input-gender中的被选中的元素的值
            var gender = $('input[name="register-input-gender"]:checked').val();
            var dateOfBirth = $("#register-input-dateOfBirth").val();
            var country = $("#register-input-country").val();
            var city = $("#register-input-city").val();
            var orginzation = $("#register-input-orginzation").val();
            var introduction = $("#register-input-introduction").val();

            var registerInfoObject = new Object();
            registerInfoObject["userName"] = userName;
            registerInfoObject["email"] = email;
            registerInfoObject["password"] = password;
            registerInfoObject["mobilephone"] = mobilephone;
            registerInfoObject["gender"] = gender;
            registerInfoObject["dateOfBirth"] = dateOfBirth;
            registerInfoObject["country"] = country;
            registerInfoObject["city"] = city;
            registerInfoObject["organization"] = orginzation;
            registerInfoObject["introduction"] = introduction;

            // var userInfoStr=JSON.stringify(userInfoObject);

            $.ajax({
                type: "post",
                url: "/TeamModeling/RegisterServlet",
                data: registerInfoObject,
                async: false,
                success: function (data) {
                    switch (data) {
                        case "email":
                            //TODO 以合理的方式提示输入的email重复
                            alert("This Email has been used.Please input a new one.");
                            break;
                        case "mobilephone":
                            //TODO 同上
                            alert("This mobilephone has been used.Please input a new one.");
                            break;
                        case "success":
                            //TODO
                            window.history.go(-1);
                            break;
                    }
                }
            });
        }

    });

    //input
    $("#register-form-group input").click(function () {
        recoverInputColor("#" + this.id);
    });

    $("#register-btn-reset").click(function () {
        window.location.reload();
    });
    //判空
    function checkInputEmpty(id) {
        if ($(id).val() === null || $(id).val() === "") {
            console.log($(id).val());
            return true;
        }
        return false;
    }

    //颜色变红
    function setInput2RedColor(id) {
        $(id).css({"border-color": "#C66161", "background-color": "#fbe2e2", "color": "#C00"});
    }

    //使颜色恢复
    function recoverInputColor(id) {
        $(id).css({"border-color": "", "background-color": "", "color": ""});
    }


});