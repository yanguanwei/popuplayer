/**
 * jQuery popuplayer.skin v1.2
 *
 * Copyright 2012, E-Mail: yanguanwei@qq.com, QQ: 176013294
 * Date: 2012-8-23
 */
;(function($) {
		  
var skins = {};

$.popuplayer.extendDefaults({
	skin : 'grey',
	onInitialize: function() {
		if ( skins[ this.options.skin ] ) {
			this.extendOptions( skins[ this.options.skin ] );
		}
	},
	onLoading: function() {
		if (this.container.data('skin') ) {
			if ( this.container.data('skin') !== this.options.skin ) {
				this.container.removeClass( this.container.data('skin') );
			} else {
				return ;	
			}
		}
		var skinClass = 'popuplayer-skin-' + this.options.skin;
		this.container
			.addClass( skinClass )
			.data( 'skin', skinClass );	
	}
});

$.popuplayer.addSkin = function( name, options ) {
	skins[name] = options || {};
};

//add skins
$.popuplayer.addSkin('grey', {
	onLoading: function() {
		var marginTop = marginBottom = 0;
		if ( this.options.hasTitle ) {
			marginTop = this.title.outerHeight(true);
		}
		
		if ( this.options.hasControl ) {
			marginBottom = this.control.outerHeight(true);
		}
		
		this.outer.css( {'padding-top': marginTop, 'padding-bottom': marginBottom});
		this.construct();	
	},
	onCleanup: function() {
		if ( this.options.hasTitle ) {
			this.outer.css('padding-top', 0);
		}
		
		if ( this.options.hasControl ) {
			this.outer.css('padding-bottom', 0);	
		}
	}
});

$.popuplayer.addSkin('fancy', {
	onInitialize: function() {
		if ( this.wrapper.find('.popuplayer-skin-fancy-bg').length == 0 ) {
			this.wrapper.append('<div id="popuplayer-skin-fancy-n" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-ne" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-e" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-se" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-s" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-sw" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-w" class="popuplayer-skin-fancy-bg"></div><div id="popuplayer-skin-fancy-nw" class="popuplayer-skin-fancy-bg"></div>');
		}	
		
		var self = this;
		
		this.transitionIn = function() {
			this.zoom( this.toContentWidth, this.toContentHeight );
			this.container.css( this.getCenterPosition() ).show();
			this.content.hide().fadeIn(this.options.speedIn, this.options.easingIn, function() { 
				self.finish();
			});
		};
		
		this.transitionOut = function() {
			this.outer.fadeOut(this.options.speedOut, this.options.easingOut, function() {
				self.abort();
				self.outer.show();
			});
		};
	},
	onCleanup: function() {
		if ( this.options.hasTitle ) {
			this.title.hide();	
		}
		
		if ( this.options.hasClose ) {
			this.closebutton.hide();	
		}
	},
	onClose: function() {
		this.cleanup();	
	}
	
});

})(jQuery);