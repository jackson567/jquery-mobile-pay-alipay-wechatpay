# jquery-mobile-pay-alipay-wechatpay
移动端的支付页面.使用jquery + 移动端tap/touch功能

# 功能
1. 切换支付方式
2. 自定义金额充值
3. 假如请求失败,则执行写在html上的固定代码

# 使用技术
1. jQuery
2. 10行关于tap的移动端触屏代码
3. less预编译,已经通过koala工具转换成css
4. ajax获取模拟数据

# 运行
方法1. 在webstorm中读取项目,在chrome浏览器上运行index.html
方法2. 前端通过mock-server,把way.json放在模拟服务器中,修改js中的wayData.setURL地址,运行index.html

# 注意
1. 如果直接双击打开index.html,则会弹出"出错",原因是ajax的数据获取