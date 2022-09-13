$(function () {
    getSum();
    // 全选按钮与复选按钮
    $(".checkall").change(function () {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked"))
            $(".cart-item").addClass("check-cart-item");
        else
            $(".cart-item").removeClass("check-cart-item");
    })
    $(".j-checkbox").change(function () {
        // $(".j-checkbox").parents(".cart-item").removeClass("check-cart-item");
        // $(".j-checkbox:checked").parents(".cart-item").addClass("check-cart-item");
        if ($(this).prop("checked"))
            $(this).parents(".cart-item").addClass("check-cart-item");
        else
            $(this).parents(".cart-item").removeClass("check-cart-item");
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length)
            $(".checkall").prop("checked", true);
        else
            $(".checkall").prop("checked", false);
        // getSum();
    })

    // 加减商品与价格小计
    $(".increment").click(function () {
        var num = $(this).siblings(".itxt").val();
        num++;
        var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        $(this).siblings(".itxt").val(num);
        $(this).parent().parent().siblings(".p-sum").html("￥" + (price * num).toFixed(2));
        getSum();
    })
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val();
        num--;
        if (num == 0)
            // $(this).siblings(".itxt").val(1);
            return false;
        else {
            $(this).siblings(".itxt").val(num);
            var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
            $(this).siblings(".itxt").val(num);
            $(this).parent().parent().siblings(".p-sum").html("￥" + (price * num).toFixed(2));
        }
        getSum();
    })
    $(".itxt").change(function () {
        var num = $(this).val();
        if (num < 1) {
            $(this).val(1);
            return false;
        }

        else {
            var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
            $(this).siblings(".itxt").val(num);
            $(this).parent().parent().siblings(".p-sum").html("￥" + (price * num).toFixed(2));
        }
        getSum();
    })

    // 清理购物车
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    $(".clear-all").click(function () {
        $(".cart-item-list").remove();
        getSum();
    })

    // 数量结算与价格结算
    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));
        $(".amount-sum em").text("￥" + count);
    }
})