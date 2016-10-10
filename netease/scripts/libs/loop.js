// 模板替换
(function () {
	function templetStr(str, single) {
		this.str = str;
		this.single = single;
	}
	templetStr.prototype.format = function(arg) {
		var reg = new RegExp('\\{\\{\\s' + this.single + '\\.([\\w]+)\\s\\}\\}', 'g');
		return this.str.replace(reg, function(a, b) {
			return arg[b] || '';
		});
	}

	var Loop = function(options) {
		return (new Loop.prototype.init(options)).show();
	}

	Loop.prototype = {
		constructor: Loop,
		init: function(options) {
			this.el = options.el;
			this.data = options.data;
		},
		show: function() {
			var root = document.getElementById(this.el) || document;
			var templetNode = root.querySelector('[loop]');
			if(templetNode) {
				var nodeName = templetNode.nodeName.toLowerCase();
				var className = templetNode.className;
				var htmlStr = templetNode.innerHTML;
				var condition = templetNode.getAttribute('loop');
				var condSplit = condition.split(' ');
				var parent = templetNode.parentNode;
				parent.removeChild(templetNode);
				for(var j = 0; j < this.data[condSplit[2]].length; j++) {
					var node = document.createElement(nodeName);
					node.className = className;
					var t = new templetStr(htmlStr, condSplit[0]);
					node.innerHTML = t.format(this.data[condSplit[2]][j]);
					parent.appendChild(node);
				}
			}
			return templetNode;
		}
	}
	Loop.prototype.init.prototype = Loop.prototype;

	window.Loop = Loop;
})();