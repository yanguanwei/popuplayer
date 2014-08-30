/**
 * jQuery popuplayer.loader v1.2
 *
 * Copyright 2012, E-Mail: yanguanwei@qq.com, QQ: 176013294
 * Date: 2012-8-23
 */
;(function($) {
var loader	= {
	'default' : null
};

$.popuplayer.extendDefaults({
	loader: null,
	onInitialize: function() {
		if ( null !== this.options.content )
			return ;
		
		if ( null === this.options.loader )	{
			for ( name in loader) {
				if ( 'default' !== name && loader['default'] !== name ) {
					if ( true === loader[ name ].match.call(this) ) {
						this.options.loader = name;
						break;
					}
				}
			}
			
			if ( null === this.options.loader && null !== loader['default'] ) {
				this.options.loader = loader['default'];
			}
		}
		
		if ( this.options.loader && loader[this.options.loader] ) {
			var o = $.extend( {}, loader[this.options.loader] );
			delete o['match'];
			delete o['load'];
			this.extendOptions( o );
		}
	},
	load: function() {
		if ( null != this.options.loader ) {
			loader[this.options.loader].load.call(this);
		} else {
			this.loaded( "loader hasn't matched!" );
		}
	}
});

$.popuplayer.addLoader = function( name, options, isDefault) {
	loader[ name ] = options;
	if ( isDefault ) loader['default'] = name;
};

$.popuplayer.addLoader('image', {
	match: function() {
		if (this.from) {
			if ( this.from.attr('href').match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i) ) {
				return true;
			}
		}
	},
	load: function() {
		var self = this,
			imgPreloader = new Image();
		imgPreloader.onerror = function() {};
		imgPreloader.onload = function() {
			self.loaded( this.orig = $("<img />").attr({
				'id' : 'popuplayer-loader-image',
				'src' : imgPreloader.src,
				'alt' : self.options.title
			}));
		};
		imgPreloader.src = this.from.attr('href');
	}
});

//ajax
$.popuplayer.addLoader('ajax', {
	ajax: {},
	onInitialize: function() {
		if ('success' in this.options.ajax) {
			this.ajaxSuccess = this.options.ajax['success'];
			delete this.options.ajax['success'];
		}
	},
	match: function() {
		
	},
	load: function() {
		var href = this.from.attr('href'),
			self = this;
		this.ajaxLoader = $.ajax($.extend({}, this.options.ajax, {
			url	: href,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if ( XMLHttpRequest.status > 0 ) {}
			},
			success : function(data, textStatus, XMLHttpRequest) {
				var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : this.ajaxLoader;
				if (o.status == 200) {
					if ( self.ajaxSuccess ) {
						ret = self.ajaxSuccess(href, data, textStatus, XMLHttpRequest);
						if (ret === false) {
								
						} else if (typeof ret == 'string' || typeof ret == 'object') {
								data = ret;
						}
					}
					self.loaded(data);
				}
			}
		}));
	},
	onCleanup: function() {
		if ( this.ajaxLoader ) {
			this.ajaxLoader.abort();	
		}
	}
}, true);

//iframe
$.popuplayer.addLoader('iframe', {
	iframeWidth		: 'auto',
	iframeHeight	: 'auto',
	iframeScrolling	: 'auto',		//auto, no, yes
	match: function() {
		if ( this.from && this.from.hasClass('iframe') ) {
			return true;
		}
	},
	load: function() {
		var href = this.from.attr('href');
			
		this.loaded(
			this.iframe = $('<iframe id="popuplayer-loader-iframe" name="popuplayer-loader-iframe' + new Date().getTime() + '" frameborder="0" hspace="0" ' + ($.browser.msie ? 'allowtransparency="true""' : '') + ' scrolling="' + this.options.iframeScrolling + '" src="' + href + '" width="'+ this.options.iframeWidth +'" height="'+ this.options.iframeHeight+'"></iframe>')
		);
	}
});

//inline
$.popuplayer.addLoader('inline', {
	match: function() {
		if ( this.from && this.from.attr('href').indexOf("#") === 0 ) {
			return true;
		}
	},
	onInitialize: function() {
		this.inline = $(this.from.attr('href'));
	},
	onConstruct: function() {
		if ( this.inline.length == 0 ) {
			return this.error( '没有找到ID为' + this.from.attr('href').substr(1) + '的元素块！' );
		}
		
		if ( !this.options.title && this.inline.attr('title') ) {
			this.options.title = this.inline.attr('title');
		}
	},
	load: function() {
		this.loaded( this.inline.show() );	
	}		   
});

})(jQuery);