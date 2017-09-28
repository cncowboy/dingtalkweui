import Vue from 'vue';

var loading = null;
export default {
	show(content = '加载中..', success) {
		if(Vue.prototype.platform === 'dingtalk' && window.dd) {
			dd.ready(function() {
				dd.device.notification.showPreloader({
				    text: content, //loading显示的字符，空表示不显示文字
				    showIcon: true, //是否显示icon，默认true
				    onSuccess : function(result) {
				    	if(success && typeof success === 'function') {
				    		success();
				    	}
				    },
				    onFail : function(err) {}
				})
			})
		} else if(window.weui) {
			loading = weui.loading(content, {
				className: 'custom-classname'
			});
		}
	},
	hide(success) {
		if(Vue.prototype.platform === 'dingtalk' && window.dd) {
			dd.device.notification.hidePreloader({
				onSuccess : function(result) {
					if(success && typeof success === 'function') {
						success();
					}
				},
				onFail : function(err) {
					alert(err)
				}
			})
		} else if (window.weui) {
			if(loading) {
				loading.hide(function() {
					if(success && typeof success === 'function') {
						success();
					}
				});
			}
		}
	}
};