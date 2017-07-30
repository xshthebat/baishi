/**
 * Created by pc on 2017/7/21.
 */
var nav=new Nav("navi");
var mainbody = new Fullpage({
    selectors: {
        sections: "#sections", //大框
        section: ".section", //小页
        page: "#pages", //分页
        active: ".active" //某页被选中
    }, //html起名
    index: 0, //初始页面
    loop: false, //是否循环播放
    agination: true, //是否分页
    direction: "vertical", //如何显示 horizontal
    callback: [function () {
        nav.realth();
    }, function () {
        nav.reheght();
        nav.recolor1();
    }, function () {
        nav.recolor2();
    }, function () {
        nav.recolor3();
    }] //回调函数
});
var tab = new Tab({
    "effect": "fade",
    "triggerType": "mouseover",
    "invoke": 1,
    "auto": 5000
});
var form1=new Form("form1","tianqi"); //天气表单
var form2=new Form1("form2","fanyi");//翻译表单
var form3=new Form2("form3","shenfeng");//身份证报表单
window.onload=function(){
};