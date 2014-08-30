/**
 * jQuery popuplayer v1.2
 *
 * Copyright 2012, E-Mail: yanguanwei@qq.com, QQ: 176013294
 * Date: 2012-8-23
 */
;(function($) {
	
$.popuplayer.extendDefaults({
	prevText: '',
	nextText: '',
	onInitialize: function() {
		if ( $('#popuplayer-prev').length == 0 ) {
			this.outer.append(
				this.prevbutton = $('<div id="popuplayer-prev" />').hide(),
				this.nextbutton = $('<div id="popuplayer-next" />').hide()
			);
			
			this.prevbutton
				.add( this.nextbutton )
				.hover(function() {
					$(this).addClass('hover');
					return false;
				}, function() {
					$(this).removeClass('hover');
					return false;
				});
		} else {
			this.prevbutton = $('#popuplayer-prev');
			this.nextbutton = $('#popuplayer-next');	
		}
	},
	onShow: function() {
		var self = this;
		if ( this.element.length > 1 ) {
			
			if ( this.index > 0 ) {
				this.prevbutton
					.show()
					.click(function() {
						if ( self.index > 0 ) {
							self.element.eq(self.index - 1).trigger('click');
						}
						return false;
					});
			}
			
			if ( this.index < this.element.length - 1) {
				this.nextbutton
					.show()
					.click(function() {
						if ( self.index < self.element.length - 1 ) {
							self.element.eq(self.index + 1).trigger('click');
						}
						return false;
					});
			}
		}
	},
	onCleanup: function() {
		this.prevbutton
			.add( this.nextbutton )
			.hide()
			.unbind('click');
	}
});
	
})(jQuery);