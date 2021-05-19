$(document).ready(()=>{
  
  $('#open-sidebar').click(()=>{
     
      // add class active on #sidebar
      $('#sidebar').addClass('active');
      
      // show sidebar overlay
      $('#sidebar-overlay').removeClass('d-none');
    
   });
  
  
   $('#sidebar-overlay').click(function(){
     
      // add class active on #sidebar
      $('#sidebar').removeClass('active');
      
      // show sidebar overlay
      $(this).addClass('d-none');
    
   });
  
});

var loader;
        
    function loadNow(opacity) {
        if (opacity <= 0) {
            displayContent();
        } else {
            loader.style.opacity = opacity;
            window.setTimeout(function() {
                loadNow(opacity - 0.05);
            }, 50);
        }
    }
    
    function displayContent() {
        loader.style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        loader = document.getElementById('loading');
        loadNow(2);
    });

    onScroll = function (e){
        var maxScroll=1200
        if(e.target.scrollLeft>maxScrollLeft){
          e.target.scrollLeft=maxScrollLeft 
        }
     }