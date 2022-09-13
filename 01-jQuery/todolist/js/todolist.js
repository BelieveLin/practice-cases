$(function () {
    load();
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim() === "")
                alert("请输入内容");
            else {
                var local = getData();
                local.push({
                    title: $(this).val(),
                    done: false
                })
                savaData(local);
                load();
                $(this).val = "";
            }
        }
    })

    // 删除数据
    $("ol, ul").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id");
        $(this).parent().remove();
        data.splice(index, 1);
        savaData(data);
        load();
    })

    // 选项操作
    $("ol, ul").on("click", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // $(this).parent().remove();
        // $("ul").prepend($(this).parent());
        savaData(data);
        load();
    })

    // 读取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null)
            return JSON.parse(data);
        else
            return [];
    }

    // 保存本地数据
    function savaData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        var data = getData();
        var todoCount = 0;
        var doneCount = 0;
        $("ol, ul").empty();
        $.each(data, function (i, ele) {
            if (ele.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            }
            else {
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        })
        $("#donecount").text(doneCount);
        $("#todocount").text(todoCount);
    }
})