/**
 * jQuery popuplayer.drag v1.2
 *
 * Copyright 2012, E-Mail: yanguanwei@qq.com, QQ: 176013294
 * Date: 2012-8-23
 */
;(function($) {

$.popuplayer.extendDefaults({
	draggable: false,
	onConstruct: function() {
		var self = this;
		this.isDragging = false;
		this.dragOffsetX = this.dragOffsetY = 0;
		
		if ( this.options.draggable ) {
			
			this.options.autoResize = false;
			
			this.title.bind('mousedown.pl', function(e) {
				self.isDragging = true;
				var offset = self.container.offset();
				self.dragOffsetX = e.pageX - offset.left;
				self.dragOffsetY = e.pageY - offset.top;
				
				self.container.css('opacity', 0.5);
				
			}).css('cursor', 'move');
			
			this.title.bind('mouseup.pl', function(e) {
				self.isDragging = false;
				self.container.css('opacity', 1);
			});
			
			this.title.bind('mousemove.pl', function(e) {
				if ( self.isDragging ) {
					self.container.css({
						left: e.pageX - self.dragOffsetX,
						top: e.pageY - self.dragOffsetY
					});
				}
			});
		}
	},
	onCleanup: function() {
		if ( this.options.draggable ) {
			this.title
				.unbind('mousedown.pl')
				.unbind('mouseup.pl')
				.unbind('mousemove.pl')
				.css('cursor', 'default');
		}
	}
});

})(jQuery);