$( document ).ready(function() {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  function processMarked() {
    $(".marked").each(function() {
      $(this).html(marked($(this).html()));
    });
  }

  // Bootstrap Scrollspy
  //$(this).scrollspy({ target: '#scrollingNav', offset: 18 });

  // Content-Scroll on Navigation click.
  $('.sidenav').find('a').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    if ($(id).length > 0) {
      $(".sidenav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
      $('html,body').animate({ scrollTop: parseInt($(id).offset().top - 54) }, 400);
    }
    window.location.hash = $(this).attr('href');
  });

  // Quickjump on Pageload to hash position.
  if(window.location.hash) {
      var id = window.location.hash;
      if ($(id).length > 0)
          $('html,body').animate({ scrollTop: parseInt($(id).offset().top - 54) }, 0);
  }


  function initDynamic() {
    // tabs
    $('.nav-tabs-examples a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    $('.nav-tabs-examples').find('a:first').tab('show');

    // call scrollspy refresh method
    // $(window).scrollspy('refresh');
  }

  initDynamic();

  // Pre- / Code-Format
  prettyPrint();

  //Convert elements with "marked" class to markdown
  processMarked();
})
