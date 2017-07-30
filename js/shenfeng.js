/**
 * Created by pc on 2017/7/26.
 */
(function(){
    var form=function(formname,div){
        var _this=this;
        var _this = this;     //记住上下文
        this.from = document.getElementById(formname);  //取得表单
        this.button = this.from.children[1];   //取得按钮
        this.div = this.button.children[0];   //取得动画背景框
        this.input = this.from.children[0];   //取得输入框
        this.box=document.getElementsByClassName(div)[0];  //取得容器
        this.creatmain();  //创建主体
        _this.allreset();   //初始化
        this.input.onkeyup=function(){
            this.value=this.value.replace(/[^\d]/ig,'');
        }
        this.button.onclick = function () {   //绑定按钮事件
            if(_this.value!=null) {
                return;                //若值不为空不能触发
            }
            else{
                _this.divrun(function(){
                    _this.removeerror();
                    _this.value=_this.getvalue();
                    if(_this.value.length<18){
                        console.log("请输入正确信息");
                        _this.inputerror();
                        _this.allreset();
                    }
                    else{
                        //送出请求 接受消息 ——》//显示内容
                        _this.sendcity();
                      
                    }
                });
            }
        };
    };
    form.prototype={
        divrun:function(callback){
            startMove(this.div, {width: 100}, callback, 50);
        },
        creatmain:function(){
            this.main=document.createElement("div");
            this.main.className="sonbox1";
            this.box.appendChild(this.main);
        },
        //发送该城市请求
        sendcity:function(){
            var jsonp3=new Jsonp("http://api.jisuapi.com/idcard/query","people&idcard="+this.value,people);
        },
        allreset: function () {
            this.div.style.width = 0 + "px";
            this.input.value = "";
            this.value=null;
        },
        creatmain:function(){
            this.main=document.createElement("div");
            this.main.className="sonbox";
            this.box.appendChild(this.main);
        },
        //取得input值
        getvalue:function(){
            var value= this.input.value;
            return value;
        },
        inmian:function(_this){
            startMove(this.main,{height:270},function(){
                //添加dom操作
                _this.insetdom(_this);
                //添加back
                _this.back=document.createElement("p");
                _this.back.innerHTML="back";
                _this.back.className="boxback";
                _this.main.appendChild(_this.back);
                _this.back.onclick=function(){
                    _this.deletedom(_this);
                }
            },50);
        },
        insetdom:function(_this){
           var pcity=document.createElement("p");
            pcity.className="pcity";
            pcity.innerHTML=window.thepeople.result.area;
            _this.main.appendChild(pcity);
            var birth=document.createElement("p");
            birth.className="birth";
            birth.innerHTML=window.thepeople.result.birth;
            _this.main.appendChild(birth);
            var sex=document.createElement("p");
            sex.className="sex";
            sex.innerHTML=window.thepeople.result.sex;
            _this.main.appendChild(sex);

        },
        deletedom:function(_this) {
            while (_this.main.hasChildNodes()) {
                _this.main.removeChild(_this.main.firstChild);
            }
            startMove(_this.main, {height: 0}, function () {
                _this.allreset();
            }, 50)
        },
        inputerror:function(){
            this.error=document.createElement("p");
            this.error.className="error";
            this.error.innerHTML="请输入正确身份证号";
            this.from.appendChild(this.error);
        },
        removeerror:function(){
            if(this.from.children[2]!=undefined) {
                this.from.removeChild(this.from.children[2]);
            }
        }
    };
    window.Form2=form;
})(window)
function people(result){
    window.thepeople=result;
    form3.inmian(form3);
}