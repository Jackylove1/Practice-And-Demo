// //事件绑定函数
// function addEvent(element,event,hanlder){
//   if (element.addEventListener) {
//         element.addEventListener(event, hanlder, false);
//   }else if(element.attachEvent){
//     element.attachEvent('on'+event,hanlder);
//   }else{
//     element['on'+event] = hanlder; 
//   }
// }
// //遍历数组的方法
// function each(arr,fn){
// 	for (var i = 0; i< arr.length; i++){
// 		fn(arr[i], i);
// 	}
// }
// //start
// window.onload = function(){
// 	var container = document.getElementById('container');
// 	var buttonList = document.getElementsByTagName('input');
// 	//定义队列的对象
// 	var queue = {
// 		str:[],
// 		leftPush: function(num){
// 			this.str.unshift(num);
// 			this.paint();
// 		},
// 		rightPush:function(num){
// 			this.str.push(num);
// 			this.paint();
// 		},
// 		isEmpty: function(){
// 			return (this.str.length == 0)
// 		},
// 		leftPop: function(){
// 			if(!this.isEmpty()){
// 				alert(this.str.shift())
// 				this.paint();
// 			}
// 			else{
// 				alert("The queue is already empty!");
// 			}
// 		},
// 		rightPop: function(){
// 			if (!this.isEmpty()) {
//                 alert(this.str.pop());
//                 this.paint();
//             }
//             else {
//                 alert("The queue is already empty!");
//             }
// 		},
// 		paint: function(){
// 			var content = '';
// 			each(this.str,function(ele,index){content += ("<div>" + parseInt(ele) + "</div>")});
// 			container.innerHTML = content;
// 			addDivDelEvent();
// 		},
// 		deleteID:function(id){
// 			this.str.splice(id,1);
// 			this.paint();
// 		}
// 	}
// 	//为containenr中的每个div绑定删除函数
// 	function addDivDelEvent() {
//         for (var cur = 0; cur < container.childNodes.length; cur++) {
            
//             //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
//             addEvent(container.childNodes[cur], "click", function(cur) {
//                 return function(){return queue.deleteID(cur)};
//             }(cur));
//         }
// }
// 	//为4个绑定函数
// 	addEvent(buttonList[1], "click", function() {
//         var input = buttonList[0].value;
//         if ((/^[0-9]+$/).test(input)) {
//             queue.leftPush(input);
//         }
//         else {
//             alert("Please enter an interger!");
//         }
//     });
//     addEvent(buttonList[2], "click", function() {
//         var input = buttonList[0].value;
//         if ((/^[0-9]+$/).test(input)) {
//             queue.rightPush(input);
//         }
//         else {
//             alert("Please enter an interger!");
//         }
//     });
//     addEvent(buttonList[3], "click", function(){queue.leftPop()});
// 	addEvent(buttonList[4], "click", function(){queue.rightPop()});
// }
function $(id){
	return document.getElementById(id);
}
//定义一个数组用来存放数据
var data = [];
//container的dom炫烂
function render(){
	$('container').innerHTML = data.map(function(d){
		return "<div>" + d + "</div>";}).join('');
}
//