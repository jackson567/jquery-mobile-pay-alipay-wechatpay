var controller = {
    // 设置支付方式
    setUrl: null,
    // 点击按钮的方法
    clickButton: function (res) {
        console.log('在这里写你的方法');
        console.table(res);
    }
}

$(function () {
    var wayData = {
        type: 1,
        name: '支付宝支付'
    };

    // tap的插件
    //自定义tap
    $(document).on("touchstart", function (e) {
        if (!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 0);
    });
    $(document).on("touchmove", function (e) {
        if (!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 1);
    });
    $(document).on("touchend", function (e) {
        if (!$(e.target).hasClass("disable") && $(e.target).data("isMoved") == 0) $(e.target).trigger("tap");
    });

    // 设置支付方法
    ajax_setPayWay();
    // 文字变化的时候
    $("#self_change").on('input propertychange', function () {
        if (!$('#self_change').val()) {
            $('#self_change').attr('placeholder', '')
        }
    });

    /**点击事件**/
    // 选择金额
    $(".choose-money> li").on('tap', function (e) {
        $(this).addClass("current").siblings("li").removeClass("current");
        $(this).children(".sel").show(0).parent().siblings().children(".sel").hide(0);
        // 改变input的值
        var money = parseInt($(this).find('h2').html());
        $('#self_change').val(money);
    });
    //点击充值方式
    $('.person_wallet_recharge').on('tap', ".choose-pay >a", function (e) {
        $('.f-overlay').show();
        $('#f-way').animate({
            display: 'show',
            bottom: 0
        })
    })
    //点击  支付方法的  时候
    $('#f-way').on('tap', 'li', function (e) {
        // 改小圆点
        $('.choosed').removeClass('choosed');
        wayData.type =   $(this).find('.inside').addClass('choosed').end().attr('data-type');
        wayData.name =  $(this).find('p').eq(0).html();
        // 改变选择方式
        $('.choose-pay').hide().eq($(this).index()).show();
// 记录当前的type        和   名称

        hideModel();
    })
    //点击蒙版时候
    $('.f-overlay').on('tap', function () {
        hideModel();
    })
    //点击充值按钮
    $("#comfirm").on('tap', function (e) {
        var charge = $('#self_change').val();
        // 如果输入的不是值   或者   <=0的话
        if (isNaN(charge) || charge <= 0) {
            layer_on('请输入正确的金额');
            return;
        }
        /**传出的数据:
         ******* 支付方式
         ******* 支付金额   charge
         * */
        controller.clickButton({
            type: wayData.type,
            name: wayData.name,
            money: parseInt(charge)
        });
    })
})

function hideModel() {
    $('.f-overlay').hide();
    $('#f-way').animate({
        bottom: '-100%',
        display: 'none'
    })
}

function layer_on(text) {
    layer.open({
        content: text || 'hello layer',
        skin: 'msg',
        time: 2 //2秒后自动关闭
    });
}

// ajax请求,设置支付方法
function ajax_setPayWay() {
    $.ajax({
        url: controller.setUrl || './way.json',
        dataType: 'json',
        success: function (res) {
            try {
                if (!res) {
                    layer_on('没有数据');
                    return;
                }
                // 清空html
                $('section.person_wallet_recharge').html('');
                $('section#f-way >ul').html('');

                $.each(res, function (i, items) {
                    // 如果是第一种支付方式
                    var temp_wayHtml =
                        `<div class="choose-pay pl3p ${items.type == 1 ? 'show' : 'hide'}"  >
                        <a href="javascript:">
                            <span>充值方式</span>
                            <span class="choose-image"><img src="images/${items.icon}.png" alt=""></span>
                            <span class="choose-text">${items.name}</span>
                            <span class="fr mr05 "> > </span>
                        </a>
                    </div>`
                    var temp_chooseHtml =
                        `<li data-type=${items.type}>
                        <div class="pay-icon">
                            <img src="images/${items.icon}.png" alt="">
                        </div>
                        <div class="pay-text">
                            <p>${items.name}</p>
                            <p>${items.slogen}</p>
                        </div>
                        <div class="items-circle">
                            <div class="circle">
                                <span class="inside ${items.type == 1 ? 'choosed' : '' }"></span>
                            </div>
                        </div>
                        </li>`
                    // 追加到section里面
                    $('section.person_wallet_recharge').append(temp_wayHtml);
                    $('section#f-way >ul').append(temp_chooseHtml);
                })
            }
            catch (e) {
                layer_on(e);
            }
        },
        error: function (err) {
            layer_on('出错了\n' + err);
        }
    })

}