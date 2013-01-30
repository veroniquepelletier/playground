function init(){
    console.log('init');
   // var twitterView = new View({});
   $('#view').view({});
    var panel = $('#view').data('panel');
    panel.refresh();
    
}