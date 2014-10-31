//添加getElementsByClassName的两种方法
//第一种
if (!document.getElementsByClassName) {
	document.getElementsByClassName的两种方法 = function(cls) {
		var ret = [];
		var els = document.getElementsByTagName('*');
		for (var i = 0, len = els.length; i < len; i++) {
			if (els[i].className === cls || els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
				ret.push(els[i]);
			}
		}
		return ret;
	}
}
//第二种

function getElementsByClassName(className, context) {
	context = context || document; //如果有指定从某个元素里寻找，则会比每次都遍历document快得多

	if (context.getElementsByClassName) { //如果浏览器支持原生的方法，则直接用原生的方法，为什么？你有把握你写的方法比原生提供的好吗？
		return context.getElementsByClassName(className);
	}

	var nodes = context.getElementsByTagName('*'); //遍历
	var rets = []; //存放匹配到的节点
	for (var i = 0; i < nodes.length; i++) {
		if (hasClass(className, nodes[i])) { //hasClass派上用场了
			rets.push(nodes[i]);
		}
	}

	return rets;
}
//判断是否存在class

function hasClass(className, node) {
	var classNames = node.className.split(/\s+/); //步骤1
	for (var i = 0; i < classNames.length; i++) { //步骤2
		if (classNames[i] == className) {
			return true;
		}
	}
	return false;
}

//第三种
var getElementsByClassName = function(searchClass, node, tag) {
	if (document.getElementsByClassName) {
		var nodes = (node || document).getElementsByClassName(searchClass),
			result = [];
		for (var i = 0; node = nodes[i++];) {
			if (tag !== "*" && node.tagName === tag.toUpperCase()) {
				result.push(node)
			}
		}
		return result
	} else {
		node = node || document;
		tag = tag || "*";
		var classes = searchClass.split(" "),
			elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
			patterns = [],
			current,
			match;
		var i = classes.length;
		while (--i >= 0) {
			patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
		}
		var j = elements.length;
		while (--j >= 0) {
			current = elements[j];
			match = false;
			for (var k = 0, kl = patterns.length; k < kl; k++) {
				match = patterns[k].test(current.className);
				if (!match) break;
			}
			if (match) result.push(current);
		}
		return result;
	}
}

//设置弹出层的位置

function fetchOffset(obj, mode) {
	var left_offset = 0,
		top_offset = 0,
		mode = !mode ? 0 : mode;

	if (obj.getBoundingClientRect && !mode) {
		var rect = obj.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		if (document.documentElement.dir == 'rtl') {
			scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
		}
		left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
		top_offset = rect.top + scrollTop - document.documentElement.clientTop;
	}
	if (left_offset <= 0 || top_offset <= 0) {
		left_offset = obj.offsetLeft;
		top_offset = obj.offsetTop;
		while ((obj = obj.offsetParent) != null) {
			if (mode == 2 && obj.style.position == 'absolute') {
				continue;
			}
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
	}
	return {
		'left': left_offset,
		'top': top_offset
	};
}

//间歇调用
(function(){
	var num = 0;
	var max = 10;
	var intervalId = null;
	function incrementNumber(){
		num ++;
		if(num == max){
			clearInterval(intervalId);
			alert ("done");
		}
	}
	intervalId = setInterval(incrementNumber,500);
}
})();