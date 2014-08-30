/**
 * jQuery popuplayer.transition v1.2
 *
 * Copyright 2012, E-Mail: yanguanwei@qq.com, QQ: 176013294
 * Date: 2012-8-23
 */
;(function($) {

var transition = {};

$.popuplayer.extendDefaults({
	transition: null,
	onInitialize: function() {
		if ( this.options.transition !== null && transition[this.options.transition] ) {
			this.extendOptions( transition[this.options.transition] );
		}
	}
});

$.popuplayer.addTransition = function( name, o) {
	transition[name] = o;
};

$.popuplayer.addTransition('elastic', {
	onInitialize: function() {
		if ( !this.from || !this.options.loader || this.options.loader !== 'image' || this.from.find('img').length == 0 ) {
			this.options.transitionIn = this.options.transitionOut = null;
			return ;
		}
		
		this.fx = $.extend($('<div/>')[0], { prop: 0 });
		this.fromImage = this.from.find('img');
		
		this.getFromPosition = function() {
			var fromPosition = this.fromImage.offset();
			
			fromPosition.width = this.fromImage.width();
			fromPosition.height = this.fromImage.height();
			this.zoomFrom( fromPosition.width, fromPosition.height );
			fromPosition.left -= (this.fromContainerOuterWidth - this.fromContentWidth) * 0.5;
			fromPosition.top -= (this.fromContainerOuterHeight - this.fromContentHeight) * 0.5;
			
			return fromPosition;
		};
		
		this.getToPosition = function() {
			var centerPosition = this.getCenterPosition();
			return {
				left	: centerPosition.left,
				top		: centerPosition.top,
				width	: this.toContentWidth,
				height	: this.toContentHeight
			};
		};
		
		this.draw = function(pos) {
			var params = {
				top		: this.fromPosition.top + (this.toPosition.top - this.fromPosition.top) * pos,
				left	: this.fromPosition.left + (this.toPosition.left - this.fromPosition.left) * pos
			};
			
			var w = this.fromPosition.width + (this.toPosition.width - this.fromPosition.width) * pos,
				h = this.fromPosition.height + (this.toPosition.height - this.fromPosition.height) * pos;
			
			this.content.find('#popuplayer-loader-image').width(w).height(h).css('opacity', 0.5 + 0.5 * pos);
			this.zoom(w, h);
			this.container.css( params );
		};
	},
	transitionIn: function() {
		this.fx.prop = 0;
		this.fromPosition = this.getFromPosition();
		this.toPosition = this.getToPosition();
		
		this.container
			.css({
				left	: this.fromPosition.left,
				top		: this.fromPosition.top
			})
			.show();
		this.content.find('img').width(this.fromPosition.width).height(this.fromPosition.height);
		//return this.finish();
		
		var self = this;
		$(this.fx).animate({prop: 1}, {
			 duration : this.options.speedIn,
			 easing : this.options.easingIn,
			 step : function(pos) { self.draw(pos);},
			 complete : function() { self.finish();}
		});		   
	},
	transitionOut: function() {
		this.fx.prop = 1;
		this.fromPosition = this.getFromPosition();
		this.toPosition = this.getToPosition();
		
		var self = this;
		
		$(this.fx).animate({prop: 0}, {
			 duration : this.options.speedOut,
			 easing : this.options.easingOut,
			 step : function(pos) { self.draw(pos);},
			 complete : function() { self.abort(); self.container.css('opacity', 1);}
		});
	}
});

})(jQuery);