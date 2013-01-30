(function($){
	

	var View = function(element, options){

	    var el = $(element);
	    var self = this;
            var settings = {};
            
            
            console.log('new Twitter View')
            
            var mixin = function() {
               settings = $.extend({
                    param: 'defaultValue'
                }, options || {}); 
            }
            
            
            this.destroy = function() {
                
            }
            
            this.refresh = function() {
                
            }
            
            this.render = function() {
                
            }
            
	};
	
	 
	$.fn.view = function(options){
	    return this.each(function(){
	        var element = $(this);
	        if (element.data('panel')) return;
	        var view = new View(this, options);
	        element.data('panel', view);
	    });
	};
})(jQuery);