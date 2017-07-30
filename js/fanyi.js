/**
 * Created by pc on 2017/7/25.
 */
(function () {
    //formmane 表单id div表单所在框的id
    var form1=function(formname,div){
        //记住上下文
        var _this=this;
        this.from=document.getElementById(formname);//取得表单
        this.button = this.from.children[1];   //取得按钮
        this.div = this.button.children[0];   //取得动画背景框
        this.textarea = this.from.children[0];   //取得输入框
        this.box=document.getElementsByClassName(div)[0];  //创建内容box
        this.formto=this.box.children[1];// 获取选择框
         //创建主体
        this.creatmain();  //创建主体
        //初始化//之后再写
        this.button.onclick=function(){
            if(_this.value!=null){
                return;   //若值不为空不能触发
            }
            else{
                       _this.divrun(function(){
                           _this.value=_this.getvalue();
                           _this.select=_this.findselect(_this);
                         if(_this.value==""){
                             _this.deletedom(_this);
                         }
                         else{
                             _this.sendvalue();
                            // _this.inmain(_this);
                         }
                       })
            }
        }
    };
    form1.prototype={
            divrun:function(callback){
                startMove(this.div, {width: 100}, callback, 50);
            },
            creatmain:function(){
                this.main=document.createElement("div");
                this.main.className="sonbox1";
                this.box.appendChild(this.main);
            },
            allreset: function () {
             this.div.style.width = 0 + "px";
                this.textarea.value = "";
             this.value=null;
            },
            getvalue:function(){
                var value=this.textarea.value;
                return value;
            },
            findselect:function(_this){
                var formto={};
                formto.form=_this.formto.children[0].value;
                formto.to=_this.formto.children[2].value;
                return formto;
            },
            sendvalue:function(){
                var jsonp3=new Jsonp("http://api.jisuapi.com/translate/translate","fanyicallback&type=baidu&from="+this.select.form+"&to="+this.select.to+"&text="+this.value,fanyicallback);
            },
            inmain:function(_this){
                startMove(this.main,{height:300},function(){
                    //添加dom
                    _this.insetdom(_this);
                    //添加back
                    _this.back=document.createElement("p");
                    _this.back.innerHTML="back";
                    _this.back.className="fanyiback";
                    _this.main.appendChild(_this.back);
                    _this.back.onclick=function(){
                        _this.deletedom(_this);
                    }
                },50)
            },
            //添加内容
            insetdom:function(_this){
                var value=document.createElement("p");
                value.className="fanyiresult";
                value.innerHTML=window.fanyi.result.result;
                _this.main.appendChild(value);
            },
            deletedom:function(_this) {
            while (_this.main.hasChildNodes()) {
                _this.main.removeChild(_this.main.firstChild);
            }
            startMove(_this.main, {height: 0}, function () {
                _this.allreset();
            }, 50)
        },

    };
    window.Form1=form1;
})(window);
//翻译回调函数
function fanyicallback(result){
    window.fanyi=result;
    form2.inmain(form2);
};