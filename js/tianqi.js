/**
 * Created by pc on 2017/7/24.
 */
(function () {
    var form = function (formname,div) {
        var _this = this;     //记住上下文
        this.from = document.getElementById(formname);  //取得表单
        this.button = this.from.children[1];   //取得按钮
        this.div = this.button.children[0];   //取得动画背景框
        this.input = this.from.children[0];   //取得输入框
        this.box=document.getElementsByClassName(div)[0];  //取得容器
        this.creatmain();  //创建主体
        _this.allreset();   //初始化
        this.button.onclick = function () {   //绑定按钮事件
            if(_this.value!=null) {
                return;                //若值不为空不能触发
            }
            else{
                _this.divrun(function(){
                    _this.value=_this.getvalue();
                    _this.send=_this.findcity();    //若input有值 就送出
                    if(_this.send==undefined){   //若没有 提示
                        _this.nofind(_this);
                        console.log("查无此城市");
                    }
                    else{
                         _this.sendcity();
                        //弹出 城市信息//异步先去jsonp请求设置回调函数 成功后弹出。
                       // _this.inmian(_this);
                        //超时设定..
                        //如果尝试5秒后没有 windows[callback]=null;
                    }
                });
            }
        };

    };
    form.prototype = {
        //背景框移动
        divrun: function (callback) {
                startMove(this.div, {width: 100}, callback, 50);
        },
        //初始化各种按钮
        allreset: function () {
            this.div.style.width = 0 + "px";
            this.input.value = "";
            this.value=null;
        },
        //取得input值
        getvalue:function(){
            var value= this.input.value;
            return value;
        },
        //在window[citys]找到尝试
        findcity:function(){
            for(var i= 0,length=window.citys.result.length;i<length;i++){
                if(this.value==window.citys.result[i].city) {
                    return window.citys.result[i];
                }
            }
            return undefined;
        },
        //发送该城市请求
        sendcity:function(){
              var jsonp2=new Jsonp("http://api.jisuapi.com/weather/query","onecity&city="+this.send.city,onecity);
        },
        creatmain:function(){
            this.main=document.createElement("div");
            this.main.className="sonbox";
            this.box.appendChild(this.main);
        },
        //主框出现
        inmian:function(_this){
            startMove(this.main,{height:300},function(){
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
        //添加内容
        insetdom:function(_this){
            console.log(window.thecity);
            console.log(_this.main);
            var cityname=document.createElement("p");
            cityname.style.color=window.thecity.result.aqi.aqiinfo.color;
            cityname.className="cityname";
            cityname.innerHTML=window.thecity.result.city;
            _this.main.appendChild(cityname);
            var now=document.createElement("ul");
            var nows=[];
            for(var i=0;i<6;i++){
                nows[i]=document.createElement("li");
                nows[i].className="nowli";
                now.appendChild(nows[i]);
            }
            nows[0].innerHTML="实时气温:"+window.thecity.result.temp+"℃";
            nows[1].innerHTML="最高气温:"+window.thecity.result.temphigh+"℃";
            nows[2].innerHTML="最低气温:"+window.thecity.result.templow+"℃";
            nows[3].innerHTML="风向:"+window.thecity.result.winddirect;
            nows[4].innerHTML="风力:"+window.thecity.result.windpower;
            nows[5].innerHTML="湿度:"+window.thecity.result.humidity;
            now.className="now";
            _this.main.appendChild(now);
            var nowtime=document.createElement("p");
            nowtime.className="nowtime";
            nowtime.innerHTML=window.thecity.result.updatetime;
            _this.main.appendChild(nowtime);
            var nowday=document.createElement("div");
            nowday.className="nowday";
            var weekday=document.createElement("p");
            weekday.className="weekday";
            weekday.innerHTML=window.thecity.result.week;
            var weather=document.createElement("p");
            weather.className="weather";
            weather.innerHTML=window.thecity.result.weather;
            nowday.appendChild(weekday);
            nowday.appendChild(weather);
            _this.main.appendChild(nowday);
            var dalay=document.createElement("div");
            dalay.className="dalay"
            var weeks=[];
            for(var i=0;i<7;i++){
                weeks[i]=document.createElement("div");
                weeks[i].className="weeks";
                //向每个week添加具体属性
                var daytime=document.createElement("p");
                var dates=window.thecity.result.daily[i].date.split("-");
                daytime.className="daytime";
                daytime.innerHTML=dates[1]+"-"+dates[2];
                var weekend=document.createElement("p");
                weekend.className="weekend";
                weekend.innerHTML=window.thecity.result.daily[i].week;
                var day=document.createElement("div");
                day.className="day";
                var dayname=document.createElement("p");
                dayname.className="dayname";
                dayname.innerHTML= "白天";
                var dayweather=document.createElement("p");
                dayweather.className="dayweather";
                dayweather.innerHTML=window.thecity.result.daily[i].day.weather;
                var daytemp=document.createElement("p");
                daytemp.className="daytemp";
                daytemp.innerHTML="最高温度"+window.thecity.result.daily[i].day.temphigh+"℃";
                var daywind=document.createElement("p");
                daywind.className="daywind";
                daywind.innerHTML="风向"+window.thecity.result.daily[i].day.winddirect;
                day.appendChild(dayname);
                day.appendChild(dayweather);
                day.appendChild(daytemp);
                day.appendChild(daywind);

                var night=document.createElement("div");
                night.className="night";
                var nightname=document.createElement("p");
                nightname.className="nightname";
                nightname.innerHTML= "夜晚";
                var nightweather=document.createElement("p");
                nightweather.className="nightweather";
                nightweather.innerHTML=window.thecity.result.daily[i].night.weather;
                var nighttemp=document.createElement("p");
                nighttemp.className="nighttemp";
                nighttemp.innerHTML="最低温度"+window.thecity.result.daily[i].night.templow+"℃";
                var nightwind=document.createElement("p");
                nightwind.className="nightwind";
                nightwind.innerHTML="风向"+window.thecity.result.daily[i].night.winddirect;
                night.appendChild(nightname);
                night.appendChild(nightweather);
                night.appendChild(nighttemp);
                night.appendChild(nightwind);
                weeks[i].appendChild(daytime);
                weeks[i].appendChild(weekend);
                weeks[i].appendChild(day);
                weeks[i].appendChild(night);
                dalay.appendChild(weeks[i]);
            }
            _this.main.appendChild(dalay);
        },
        //删除内容
        deletedom:function(_this) {
            while (_this.main.hasChildNodes()) {
                _this.main.removeChild(_this.main.firstChild);
            }
            startMove(_this.main, {height: 0}, function () {
                _this.allreset();
            }, 50)
        },
        //未找到指定城市提示内容
        nofind:function(_this){
            startMove(this.main,{height:300},function(){
                _this.back=document.createElement("p");
            _this.back.innerHTML="back";
            _this.back.className="boxback";
                var nofind=document.createElement("p");
                nofind.className="nofind";
                nofind.innerHTML="查无此城市,请重试"
                _this.main.appendChild(nofind);
            _this.main.appendChild(_this.back);
            _this.back.onclick=function(){
                _this.deletedom(_this);
            }
        },50);
        }
    };
    window.Form = form;
})(window)
//jsonp 地名回调函数
function getcity(result){
    window.citys=result;   //获取到window下
}
var jsonp1=new Jsonp("http://api.jisuapi.com/weather/city","getcity",getcity);

function onecity(result){
    window.thecity=result;
    form1.inmian(form1);
}
