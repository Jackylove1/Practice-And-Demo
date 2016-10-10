// 业务逻辑
// 构造函数的方法(私有属性和方法)
function pop(element){
	this.ele = element;
	this.display = none;
	this.maskEle = null;
	this.animateTime = 600;
	this.init();
}
//通过原型暴露接口
pop.prototype = {
	show: function(){
		this.display = block;
		this.ele.style.transform = 'translate(-50% -50%)';
		this.maskEle.style.visiblity = 'visible';
		this.ele.style.left = '50%';
		this.ele.style.top = '50%' ;
	},
	hide: function(){
		this.display = none;
		var self = this;
		setTimeout(function(){
			self.maskEle.style.visiblity = "hidden"
		},self.animateTime-10)
	},
	//init写法是面向对象写法很关键的部分，当构造函数确定，实例化的时候需要根据实际初始化不同的部分
	init: function(){
		this.maskEle = document.creatElement('div');
		this.maskEle.width = window.screen.width + 'px';
		this.maskEle.height = window.screen.height + 'px';
		this.maskEle.style.backgroundColor = 'rgba(108,108,108,0.7)';
		
	}
}