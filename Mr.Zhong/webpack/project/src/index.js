import _ from 'lodash';
import $ from 'jquery';

import './scss/index.scss';
import spring from './images/spring02.jpg';
import printMe from './print.js';


component();
function component() {
	//创建div元素
	var element = document.createElement('div');

	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', '夏天'], '===');
	
	element.onclick = printMe;
	document.body.appendChild(element);

	//创建图片标签
	var img = document.createElement('img');
	img.src = spring;
	document.body.appendChild(img);

}

$('div').css({'color':'blue','font-size':'24px'});