//public.js
var $ = function(el){
	return document.querySelector(el);
}
var $$ = function(el){
	retrun document.querySelectorAll(el);
}

var creatEle = function(tagName){
	return document.creatElement(tagName);
}

//兼容的事件写法
var addEvent = function(element,event,handler){
	if(element.addEventListener){
		element.addEventListener(event,handler,false);
	}
	else if(element.attachEvent){
		element.attachEvent('on' + event, handler);
	}
	else{
		element['on' + event] = handler;
	}
}

//取消事件注册
var removeEvent = function(element,event,handler){
	if(element.removeEventListener){
		element.removeEventListener(event,handler,false);
	}
	else if(element.detachEvent){
		element.detachEvent('on' + event, handler);
	}
	else{
		element['on' + event] = null;
	}
}