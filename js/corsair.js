var corsair = 1;
var touch = 'ontouchstart' in document.documentElement;
var uppercase = new RegExp('[A-Z]'),
  lowercase = new RegExp('[a-z]'),
  numbers = new RegExp('[0-9]'),
  characters = new RegExp('[!@#$%^&*(),.?":{}|<>]');
var windowWidth = $(window).width();
var chrPreloader = '<div class="overlay"><div class="preloader"><span class="preloader-image"></span><div class="bounceball"></div></div></div>';
var gooeyPreloader = '<div class="overlay"><div class="gooey"><span class="dot"></span><div class="dots"><span></span><span></span><span></span></div></div></div>';
var circlePreloader = '<div class="overlay"><i class="circle-preloader"></i></div>';
var players = [],
  current = 0,
  loadTime = 0;
const details = Array.from(document.querySelectorAll(".accordion"));
details.forEach(targetDetail => {
  targetDetail.addEventListener("click", () => {
    details.forEach(detail => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open")
      }
    })
  })
});

$(document).on('ready', function() {
  if ($('.table-sortable').length) {
    makeTablesSortable();
  }
  // if ($('.table-paginate').length) {
  //   $('.table-paginate').each(function(i) {
  //     var elem = $(this);
  //     setTimeout(function() {
  //       paginateTable(elem, "", "", "", 1);
  //     }, 2000)
  //   })
  // }
});


$(document).on('ready', function() {
  $('.table-paginate').each(function(i) {
    var elem = $(this);
    setTimeout(function() {
      var rows = elem.children('tbody').find('tr');
      var number_of_items = 0;
      if (rows.length) {
        number_of_items = rows.length;
      }
      var data = toInteger(elem.attr("data-rows") ? elem.attr("data-rows") : 0);
      var show = elem.attr("data-show") ? elem.attr("data-show") : 10;
      var current = elem.attr("data-current") ? elem.attr("data-current") : 1;
      if (number_of_items !== data) {
        paginateTable(elem, show, "", "", current);
      }
    }, 1200);
  });
});

$(document).on('click', function(e) {
  var $target = $(event.target);
  if (!$target.closest('.modal').length && $('.modal').parents('.modal-wrapper').hasClass("open")) {
    $('.modal').parents('.modal-wrapper.open').removeClass('open');
  }
});

$(document).on('mousedown', '.select-box.show-options .select .option', function() {
  var elem = $(this).parents('.select-box');
  // var input = elem.find('.tel-select-input');
  var input = elem.find('.select-input');
  var menu = elem.find('.select');
  var clone = elem.parent().siblings(".input-tel-clone");
  $(this).siblings().removeClass("selected");
  $(this).addClass('selected');
  var value = $(this).data("value");
  var iso = $(this).data("iso2");
  item = value ? value : $(this).text();
  input.attr('data-value', item);
  elem.removeClass('show-options');
  menu.attr('aria-hidden', true);
  if (input.hasClass("tel-select-input")) {
    item = value && iso ? iso + " " + value : $(this).text();
    input.val(item).trigger('change');
    $(this).parents('.form-elements').addClass('active');
    clone.val("+" + input.val().replace(/[^0-9]/g, '') + toInteger(elem.parent().siblings('.phone').val().replace(/[^0-9]/g, '')));
    setTimeout(function() {
      elem.parent().siblings('input[type="tel"]').focus();
    }, 200);
  } else {
    input.val(item).trigger('change');
  }
});

$(window).resize(function() {
  windowWidth = $(window).width();
  if (windowWidth > 900) {
    $('.nav-links').show();
  } else {
    addToggleLinks();
  }
});

document.onreadystatechange = function(e) {
  if (document.readyState == "interactive") {
    if ($('body').hasClass('preload')) {
      $('body').parent().prepend(chrPreloader);
      var all = $("*");
      var count = 0;
      for (var i = 0, max = all.length; i < max; i++) {
        count = checkElement(all[i], count);
      }
      loadTime = 3600;
    }
  }
}

var clickedTab = $(".tabs > .active");
var tabWrapper = $(".tab-content");
var activeTab = tabWrapper.find(".active");
var activeTabHeight = activeTab.outerHeight();

$(document).ready(function() {
  if ($("ul.tab-content > li.active").length) {
    setTimeout(function() {
      activeTab = $(".tab-content > .active");
      activeTabHeight = activeTab.height();
      tabWrapper.height(activeTabHeight);
    }, loadTime + 100);
  }
})

$(".tabs > li").on("click", function() {
  $(".tabs > li").removeClass("active");
  $(this).addClass("active");
  clickedTab = $(".tabs .active");
  activeTab.fadeOut(250, function() {
    $(".tab-content > li").removeClass("active");
    var clickedTabIndex = clickedTab.index();
    $(".tab-content > li").eq(clickedTabIndex).addClass("active");
    activeTab = $(".tab-content > .active");
    activeTabHeight = activeTab.outerHeight();
    tabWrapper.stop().delay(50).animate({
      height: activeTabHeight
    }, 500, function() {
      activeTab.delay(50).fadeIn(250);
    });
  });
});

function cleanTH(x) {
  return x.replace(/(^\s+|\s+$)/g, '');
}

$('.table-responsive').each(function(i) {
  var ths = new Array();
  var header = $(this).find('th');
  header.each(function() {
    var thdatatrimmed = cleanTH($(this).html());
    ths.push(thdatatrimmed);
  });

  var trlen = $(this).find("tr").length;
  for (var j = 0; j < trlen; j++) {
    $(this).find('tr').eq(j).find('td').eq(0).attr('scope', "row");
    for (var i = 0, len = ths.length; i < len; i++) {
      $(this).find('tr').eq(j).find('td').eq(i).attr('data-label', ths[i]);
    }
  }
});

$(function() {
  $('.typewrite').each(function(i, v) {
    $(v).contents().eq(0).wrap('<span class="text-wrap"/>');
  })
});

$(function() {
  var elements = document.getElementsByClassName('typewrite');
  if (elements.length) {
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }
});

$(function() {
  var elementList = document.querySelectorAll(".typed-text");
  for (i = 0; i < elementList.length; i++) {
    var typer = elementList[i];
    typewriter = setupTypewriter(typer);
    typewriter.type();
  }
});

$(function() {
  // $('.typing, .bubble-icons').html('<span class="dot"></span><span class="dot"></span><span class="dot"></span>')
});

$(function() {
  $(".table-responsive thead tr th").each(function() {
    $(this).attr('scope', 'col');
  });
});

$(function() {
  $('.table-search').each(function() {
    var elem = $(this);
    if (elem.parent().hasClass("datatable")) {
      var parent = elem.parents('.datatable');
    } else {
      elem.wrap("<div class='datatable'></div>");
      var parent = elem.parents('.datatable');
    }
    if (elem.hasClass('table-nosort')) {
      if (elem.hasClass('search-full')) {
        parent.prepend('<div class="form-elements"><input type="search" class="table-search-input w-100" placeholder="Search"/></div>');
      } else {
        parent.prepend('<div class="form-elements"><input type="search" class="table-search-input" placeholder="Search"/></div>');
      }
    } else {
      parent.prepend('<div class="form-elements flex direction-row-reverse"><input type="search" class="table-search-input" placeholder="Search"/></div>');
    }

    var search = parent.find('.table-search-input');

    search.on('keyup change search', function() {
      var table = elem;
      var items = table.find('tbody').find('tr');
      var val = $(this).val().toLowerCase();
      items.hide();
      for (var i = 0; i < items.length; i++) {
        var self = items.eq(i);
        var title = self.find('td').text().toLowerCase();
        if (title.indexOf(val) >= 0) {
          self.show();
        } else {
          self.hide();
        }
      }

      if (val == '') {
        items.show();
        if (elem.hasClass('table-paginate')) {
          var show_per_page = table.data('show') ? table.data('show') : 10;
          var rows = elem.children('tbody').find('tr');
          var number_of_items = 0;
          if (rows.length) {
            number_of_items = rows.length;
          }
          var number_of_pages = Math.ceil(number_of_items / show_per_page);
          paginateTable(elem, show_per_page, number_of_items, number_of_pages, 1);
          // setTablePaginationCounter(elem, number_of_pages, 0);
          showPaginator(table);
        }
      } else {
        if (elem.hasClass('table-paginate')) {
          var show_per_page = table.data('show') ? table.data('show') : 10;
          var rows = elem.children('tbody').find('tr');
          var number_of_items = 0;
          if (rows.length) {
            number_of_items = rows.length;
          }
          var number_of_pages = Math.ceil(number_of_items / show_per_page);
          // paginateTable(elem, show_per_page, number_of_items, number_of_pages, 1);
          // setTablePaginationCounter(elem, number_of_pages, 0);
          hidePaginator(table);
        }
      }
    });

  });
});

$(function() {
  $('.table.table-sortable').each(function() {
    var elem = $(this);
    if (elem.parent().hasClass("datatable")) {
      var parent = elem.parents('.datatable');
    } else {
      elem.wrap("<div class='datatable'></div>");
      var parent = elem.parents('.datatable');
    }

    var header = elem.find('thead');
    var heading = header.find('th');
    heading.each(function() {
      $(this).addClass('sortable');
    })
    var sortable = header.find('.sortable');
    sortable.on('click', function() {
      $(this).toggleClass('desc');
    })
  })
});

$(function() {
  $('.table-paginate').each(function(i) {
    var elem = $(this);
    if (elem.parent().hasClass("datatable")) {
      var parent = elem.parents('.datatable');
    } else {
      elem.wrap("<div class='datatable'></div>");
      var parent = elem.parents('.datatable');
    }
    if (!elem.hasClass('table-nosort')) {
      parent.prepend('<div class="paginate-options"><div class="select-box select-icon-right paginate-dropdown" data-member="' + i + '" data-placeholder="Show Entries" data-value="10" data-id="pg-opt-' + i + '"><div class="select"><ul><li>5</li><li>10</li><li>25</li><li>50</li><li>100</li><li>200</li></ul></div></div></div>');
    }
    var index = elem.data('start') ? elem.data('start') : 0;
    var step = elem.data('step') ? elem.data('step') : 1;
    var current = elem.data('current') ? elem.data('current') : 1;
    var show_per_page = elem.data('show') ? elem.data('show') : 10;
    var rows = elem.children('tbody').find('tr');
    var number_of_items = 0;
    if (rows.length) {
      number_of_items = rows.length;
    }
    var number_of_pages = Math.ceil(number_of_items / show_per_page);
    var end = number_of_pages;
    parent.append('<div class="pagination" data-start="' + index + '" data-end="' + end + '" data-step="' + step + '"><button class="paginate left"><i></i><i></i></button><div class="counter"></div><button class="paginate right"><i></i><i></i></button></div>');
    var paginator = parent.find('.pagination');
    var counter = paginator.find('.counter');
    var pr = paginator.find('.paginate.right');
    var pl = paginator.find('.paginate.left');
    paginateTable(elem, show_per_page, number_of_items, number_of_pages, 1);
    if (elem.length) {
      setTimeout(function() {
        paginateTable(elem, show_per_page, number_of_items, number_of_pages, 1);
      }, 2000)
    }

    var dropdown = parent.find('.paginate-dropdown');
    dropdown.on('change', function() {
      var current = elem.attr('data-current') ? elem.attr('data-current') : 1;
      var show_per_page = elem.attr('data-show') ? elem.attr('data-show') : 10;
      var rows = elem.children('tbody').find('tr');
      var number_of_items = 0;
      if (rows.length) {
        number_of_items = rows.length;
      }
      var number_of_pages = Math.ceil(number_of_items / show_per_page);

      var member = dropdown.data('member');
      var show_per_page = $('#pg-opt-' + member).val();
      elem.attr('data-show', show_per_page);
      paginateTable(elem, show_per_page, number_of_items, number_of_pages, current);
    })

    // // SET PAGINATOR ICON
    // if (number_of_pages >= current) {
    //   pl.attr('data-state', 'disabled');
    // } else if (current == number_of_pages + 1 && number_of_items == 0) {
    //   pl.attr('data-state', 'disabled');
    //   pr.attr('data-state', 'disabled');
    // } else if (current > number_of_pages) {
    //   pr.attr('data-state', 'disabled');
    // }

    pr.on('click', () => {
      var current = elem.attr('data-current') ? elem.attr('data-current') : 1;
      var show_per_page = elem.attr('data-show') ? elem.attr('data-show') : 10;
      var rows = elem.children('tbody').find('tr');
      var number_of_items = 0;
      if (rows.length) {
        number_of_items = rows.length;
      }
      var number_of_pages = Math.ceil(number_of_items / show_per_page);

      var end = number_of_pages;
      step = +Math.abs(step);
      index = Math.min(Math.max(index + step, 0), end - 1);
      current = index + 1;
      elem.attr('data-current', current);
      setTablePaginationCounter(elem, end, index);
      pl.attr('data-state', index === 0 ? 'disabled' : '');
      pr.attr('data-state', index === end - 1 ? 'disabled' : '');
      paginateTable(elem, show_per_page, number_of_items, number_of_pages, current);
      // paginateTable(elem, "", "", "", current);
    })

    pl.on('click', () => {
      var current = elem.attr('data-current') ? elem.attr('data-current') : 1;
      var show_per_page = elem.attr('data-show') ? elem.attr('data-show') : 10;
      var rows = elem.children('tbody').find('tr');
      var number_of_items = 0;
      if (rows.length) {
        number_of_items = rows.length;
      }
      var number_of_pages = Math.ceil(number_of_items / show_per_page);

      var end = number_of_pages;
      step = -Math.abs(step);
      index = Math.min(Math.max(index + step, 0), end - 1);
      current = index + 1;
      elem.attr('data-current', current);
      setTablePaginationCounter(elem, end, index);
      pl.attr('data-state', index === 0 ? 'disabled' : '');
      pr.attr('data-state', index === end - 1 ? 'disabled' : '');
      paginateTable(elem, show_per_page, number_of_items, number_of_pages, current);
      // paginateTable(elem, "", "", "", current);
    })

    setTablePaginationCounter(elem, end, index);
  });
});

$(function() {
  $('.pagination').each(function() {
    var elem = $(this);
    if (!elem.parent().hasClass("datatable")) {
      elem.html('<button class="paginate left"><i></i><i></i></button><div class="counter"></div><button class="paginate right"><i></i><i></i></button>');
      var pr = elem.find('.paginate.right');
      var pl = elem.find('.paginate.left');
      var counter = elem.find('.counter');
      var index = elem.data('start') ? elem.data('start') : 0;
      var end = elem.data('end') ? elem.data('end') : 0;
      var step = elem.data('step') ? elem.data('step') : 1;

      pr.on('click', () => {
        step = +Math.abs(step);
        index = Math.min(Math.max(index + step, 0), end - 1);
        counter.html((index + 1) + ' / ' + end);
        pl.attr('data-state', index === 0 ? 'disabled' : '');
        pr.attr('data-state', index === end - 1 ? 'disabled' : '');
      })

      pl.on('click', () => {
        step = -Math.abs(step);
        index = Math.min(Math.max(index + step, 0), end - 1);
        counter.html((index + 1) + ' / ' + end);
        pl.attr('data-state', index === 0 ? 'disabled' : '');
        pr.attr('data-state', index === end - 1 ? 'disabled' : '');
      })

      counter.html((index + 1) + ' / ' + end);
    }
  });
});

$(function() {
  $('.connection-container').each(function() {
    $(this).html('<h4><div class="svg-holder"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="#007bff" stroke-width="2"/><g id="left"><path class="left-cord" fill="none" stroke="#007bff" stroke-width="4" d="M-6 8h7"/><path class="left-half" fill="#007bff" stroke="#007bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 15A7 7 0 0 1 8 1z"/></g><g id="right"><path class="right-prong" fill="none" stroke="#007bff" stroke-linecap="round" stroke-width="2" d="M2,5h6"/><path class="right-prong" fill="none" stroke="#007bff" stroke-linecap="round" stroke-width="2" d="M2,11h6"/><path class="right-cord" fill="none" stroke="#007bff" stroke-width="4" d="M15 8h7"/><path class="right-half" fill="#007bff" stroke="#007bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 15A7 7 0 0 0 8 1z"/></g></svg></div></div></h4>');
  })
});

$(function() {
  $(document).on('click', '.card.card-dropdown .circle-button, .card.card-dropdown .overlay', function() {
    $('.card-middle').slideToggle();
    $('.close').toggleClass('closeRotate');
  });
});

$(function() {
  $('.accordion-group').each(function(i) {
    var elem = $(this);
    elem.attr('data-group', i);
  });
});

$(function() {
  $('.accordion').not('details').each(function(i) {
    var elem = $(this);
    var group = elem.parents('.accordion-group').data('group');
    elem.prepend('<input type="radio" id="tab-' + i + '" name="tabs-' + group + '">');
    var label = elem.find('label:first-of-type');
    label.attr("for", "tab-" + i);
    // label.contents().eq(2).wrap('<div/>');
    label.wrapInner('<div></div>')
    label.append('<div class="cross"></div>');
  });
});

$(function() {
  $('.card.card-dropdown.dropdown-btn').each(function() {
    $('<div class="triangle"><div class="circle-button"><img class="close" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/324479/close.svg" /></div></div>').insertAfter('.card.card-dropdown .card-top');
  });
});

$(function() {
  $(document).on('click', '.user-card-mini .card-image', function() {
    $(this).closest('.user-card-mini').toggleClass('user-card-mini-active');
  });
});
$(function() {
  $('.app-nav .sidebar header').on('click', function() {
    $(this).parent().parent().toggleClass('app-nav-mini');
  });
});
$(function() {
  $('.navbar').prepend('<section class="nav-icon"><span class="topbar"></span><span class="middlebar"></span><span class="bottombar"></span></section>')
});
$(function() {
  if ($('.app-wrapper .menu-toggle').length) {
    $('.app-wrapper .menu-toggle').prepend('<div class="nav-icon"><span class="topbar"></span><span class="middlebar"></span><span class="bottombar"></span></div>')
  } else {
    $('.app-wrapper').prepend('<div class="nav-icon"><span class="topbar"></span><span class="middlebar"></span><span class="bottombar"></span></div>')
  }
});
$(function() {
  $('.password-toggle').each(function() {
    $(this).append('<span class="togglePassword input-element">a</span>')
  })
});
$(function() {
  $('.nav .slideout-nav').each(function() {
    var navigation = $(this);
    var parent = navigation.parent();
    parent.prepend('<label for="menu-toggle" class="slider-icon nav-icon"><span class="topbar"></span><span class="middlebar"></span><span class="bottombar"></span><span class="menu-label"></span></label>');
    parent.prepend('<input type="checkbox" id="menu-toggle" class=" hidden" />');
    var toggle = parent.find('#menu-toggle');
    toggle.on('change', function() {
      if ($(this).is(":checked")) {
        parent.addClass('slider-open')
      } else {
        parent.removeClass('slider-open')
      }
    })
  })
});

$(function() {
  $('.form-elements .search-box').each(function() {
    $(this).parents('.form-elements').append('<label><ion-icon name="search-outline"></ion-icon></label>');
  });
});

$(function() {
  $('.nav').each(function() {
    var elem = $(this);
    var tab = elem.find('.tabbar');
    if (tab.length) {
      elem.addClass('tab-nav');
    }
  })
});

$(function() {
  $('.nav .slide-nav').each(function(e) {
    var navigation = $(this);
    var parent = navigation.parent();
    var selectorVerticalInner = navigation.find('li').length;
    var activeItemVerticalInner = navigation.find('.active');
    // navigation.prepend('<div class="selector-active hidden"><div class="top"></div><div class="bottom"></div></div>');
    parent.prepend('<label for="menu-toggle" class="slider-icon nav-icon"><span class="topbar"></span><span class="middlebar"></span><span class="bottombar"></span><span class="menu-label"></span></label>');
    parent.prepend('<input type="checkbox" id="menu-toggle" class=" hidden" />');
    var toggle = parent.find('#menu-toggle');
    toggle.on('change', function() {
      if ($(this).is(":checked")) {
        parent.addClass('slider-open')
      } else {
        parent.removeClass('slider-open')
      }
    })
    // var selector = parent.find(".selector-active");
    // if(selectorVerticalInner){
    //   selector.removeClass('hidden');
    // }else{
    //   selector.addClass('hidden');
    // }
    // if(activeItemVerticalInner.length){
    //   var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
    //   var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
    //   var itemPosVerticalTop = activeItemVerticalInner.position();
    //   var itemPosVerticalLeft = activeItemVerticalInner.position();
    //   selector.css({
    //   	"top":itemPosVerticalTop.top + "px",
    //   	"left":itemPosVerticalLeft.left + "px",
    //   	"height": activeWidthVerticalHeight + "px",
    //   	"width": activeWidthVerticalWidth + "px"
    //   });
    // }
    navigation.on("click", "li", function(e) {
      $(this).siblings().removeClass("active");
      $(this).addClass('active');
      // 	var activeWidthVerticalHeight = $(this).innerHeight();
      // 	var activeWidthVerticalWidth = $(this).innerWidth();
      // 	var itemPosVerticalTop = $(this).position();
      // 	var itemPosVerticalLeft = $(this).position();
      // 	selector.css({
      // 		"top":itemPosVerticalTop.top + "px",
      // 		"left":itemPosVerticalLeft.left + "px",
      // 		"height": activeWidthVerticalHeight + "px",
      // 		"width": activeWidthVerticalWidth + "px"
      // 	});
    });
  });
});

$(function() {
  $('.auto-expand').each(function() {
    $(this).on('input', function() {
      $(this).css('height', 'auto')
    })
  })
});

$(function() {
  $('.countdown').each(function() {
    var elem = $(this);
    var totaltime = elem.data("count");
    var direction = elem.data("direction");
    elem.prepend('<span class="time">0</span>');
    var time = elem.find('.time');
    var count = 0;
    if (direction == "down") {
      count = totaltime;
    } else {
      count = parseInt(time.text());
    }
    var myCounter = setInterval(function() {
      if (direction == "down") {
        count -= 1;
      } else {
        count += 1;
      }
      time.html(count);
      if (direction == "down") {
        if (count == 0) {
          clearInterval(myCounter);
        }
      } else {
        if (count >= totaltime) {
          clearInterval(myCounter);
        }
      }
    }, 1000);
  })
});

$(function() {
  $('.countdown-circle').each(function() {
    var elem = $(this);
    var totaltime = elem.data("count");
    var direction = elem.data("direction");
    elem.addClass('degree');
    elem.prepend('<div class="block"><div class="time">0</div></div>');
    var time = elem.find('.time');
    var count = 0;
    if (direction == "down") {
      count = totaltime;
    } else {
      count = parseInt(time.text());
    }
    var myCounter = setInterval(function() {
      if (direction == "down") {
        count -= 1;
      } else {
        count += 1;
      }
      time.html(count);
      updatePie(elem, count);
      if (direction == "down") {
        if (count == 0) {
          clearInterval(myCounter);
        }
      } else {
        if (count >= totaltime) {
          clearInterval(myCounter);
        }
      }
    }, 1000);
  })
})

$(document).one('focus.auto-expand', 'textarea.auto-expand', function() {
  var savedValue = this.value;
  this.value = '';
  this.baseScrollHeight = this.scrollHeight;
  this.value = savedValue
}).on('input.auto-expand', 'textarea.auto-expand', function() {
  var minRows = this.getAttribute('data-min-rows') | 0,
    rows;
  this.rows = minRows;
  rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
  this.rows = minRows + rows
});

$(function() {
  $(document).on('click', '.card-hero-wrapper .card-hero-navigation-list li', function() {
    $('.card-hero:eq(' + current + ')').removeClass('card-hero-active');
    $(this).addClass('is-active').siblings().removeClass('is-active');
    current = $(this).index();
    $('.card-hero:eq(' + current + ')').addClass('card-hero-active');
  });
});

$(function() {
  $('.card-hero-carousel').each(function() {
    var slides = $(this).children('.card-hero');
    var numofslides = slides.length;
    var toggles = "";
    for (var i = 0; i < numofslides; i++) {
      if (i == 0) {
        toggles += "<li class='is-active'></li>";
      } else {
        toggles += "<li></li>";
      }
    }
    $('.card-hero-wrapper').append('<div class="card-hero-navigation"><ul class="card-hero-navigation-list">' + toggles + '</ul></div>');
  });
});

$(function() {
  $('.form-elements input[type="color"]').each(function() {
    var elem = $(this);
    var attributes = elem.prop("attributes");
    var container = elem.parent();
    var bodyStyles = window.getComputedStyle(document.body);
    var primary = bodyStyles.getPropertyValue('--primary-color');
    elem.remove();
    container.append('<span class="input-element color-preview"></span><input type="text"/>');
    var input = container.children('input');
    $.each(attributes, function() {
      if (this.name != 'type') {
        input.attr(this.name, this.value)
      }
    });
    input.attr('placeholder', primary)
  })
});

$(function() {
  $('.team-wrapper .image-card, .team-wrapper .expand-btn').click(function() {
    var btn = $(this).parents().find('.expand-btn');
    var description = btn.parent().find('.role-description');
    var imagecard = btn.parent().find('.image-card');
    var info = btn.parent().find('.team-info');
    var infodes = btn.parent().find('.team-info-des');
    description.toggleClass('expand');
    btn.toggleClass('move-button');
    imagecard.toggleClass('color-reveal');
    info.toggleClass('text-reduce');
    infodes.toggleClass('text-reveal');
  });
})

$(function() {
  $('.color-input input').each(function() {
    var elem = $(this);
    var preview = elem.siblings('.color-preview');
    elem.on('input', function() {
      var color = elem.val();
      if ($.trim(color.length) > 2) {
        if (color.indexOf("#") >= 0) {
          preview.css('background-color', color)
        } else {
          preview.css('background-color', '#' + color)
        }
      }
    })
  })
});

$(function() {
  $('.form-elements input[type="file"]').each(function() {
    var input = $(this);
    var droppedFiles = !1;
    var label = input.siblings('label');
    label.addClass('file-label');
    label.prepend('<i></i>');
    input.on('change', function(e) {
      if (input[0].hasAttribute('multiple')) {
        var files = input[0].files.length;
        if (files > 1) {
          label.html('<i></i>' + 'Upload [' + files + ' Files]')
        } else {
          var name = e.target.files[0].name;
          label.html('<i></i>' + 'Upload File' + '[' + name + ']')
        }
      } else {
        var name = e.target.files[0].name;
        label.html('<i></i>' + 'Upload File' + '[' + name + ']')
      }
    });
    label.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
      e.preventDefault();
      e.stopPropagation()
    }).on('dragover dragenter', function() {
      label.addClass('drag-over')
    }).on('dragleave dragend drop', function() {
      label.removeClass('drag-over')
    }).on('drop', function(e) {
      droppedFiles = e.originalEvent.dataTransfer.files;
      label.html('<i></i>' + 'Upload File ');
      if (droppedFiles) {
        $.each(droppedFiles, function(i, file) {
          var name = file.name;
          label.append('[' + name + '] ')
        })
      }
      input.files = droppedFiles
    })
  })
});

$(function() {
  $('.character-count').each(function() {
    $(this).prepend('<span class="counter "></span>');
    var textarea = $(this).find('textarea');
    var counter = $(this).find('.counter');
    var visiblecounter = $(this).find('.counter :visible');
    var maxlength = textarea.attr('maxlength');
    var charcount = 0;
    if (maxlength) {
      counter.text(maxlength);
      textarea.on('input', function() {
        charcount = maxlength - textarea.val().length;
        counter.text(charcount);
        counter.fadeIn('fast')
      }).blur(function() {
        if (counter.is(':visible')) {
          counter.fadeOut('slow')
        }
      })
    } else {
      counter.text(charcount);
      textarea.on('input', function() {
        charcount = textarea.val().length;
        counter.text(charcount);
        counter.fadeIn('fast')
      }).blur(function() {
        if (counter.is(':visible')) {
          counter.fadeOut('slow')
        }
      })
    }
  })
});

$(function() {
  if (!detectIE()) {
    $('.password-toggle .togglePassword').each(function() {
      var icon = $(this);
      var input = icon.siblings('input[type="password"]');
      icon.functionToggle(function() {
        input.prop('type', 'text');
        icon.addClass('asterisk');
        icon.text('*')
      }, function() {
        input.prop('type', 'password');
        icon.removeClass('asterisk');
        icon.text('a')
      })
    })
  }
});

$(function() {
  $('.navbar .nav-icon').each(function() {
    var navBarToggle = $(this);
    var navBar = navBarToggle.parent('.navbar');
    var mainNav = navBarToggle.siblings('.nav-links');
    var navLinks = mainNav.find('li');
    navBarToggle.on('click', function() {
      mainNav.slideToggle();
      navBarToggle.toggleClass('active');
      mainNav.toggleClass('active');
      navBar.toggleClass('nav-open');
      if (navBar.hasClass("nav-open")) {
        $('.cart').fadeOut();
      } else {
        $('.cart').fadeIn();
      }
    });
    navLinks.on('click', function() {
      if ($(this).hasClass("toggle-link")) {} else {
        if (windowWidth < 700) {
          mainNav.slideToggle();
          navBar.toggleClass('nav-open');
        }
      }
    });
  })
});

$(function() {
  $('.card.full-card').each(function() {
    var elem = $(this);
    var btn = elem.find('.btn.btn-card');
    btn.hover(function() {
      $(this).parents('.card').addClass("card-hovered");
    }, function() {
      $(this).parents('.card').removeClass("card-hovered");
    })
  })
})


$(function() {
  $('.gallery.mansory').each(function() {
    var elem = $(this);
    var img = $(this).find('img');
    if (img.parent().hasClass("gallery-item") == false) {
      img.wrap("<div class='gallery-item'></div>");
    }
  })
});

$(function() {
  var elem = $('.carousel');
  elem.each(function(i) {
    elem.prepend('<i class="slider-next icon icon-md icon-Arrow-Right"></i><i class="slider-prev  icon icon-md icon-Arrow-Left"></i>');
    elem.attr('id', 'slider-' + i);
    var previous = $(this).find('.slider-prev');
    var next = $(this).find('.slider-next');
    var height = $(this).find('.slide').innerHeight();
    elem.find('.slide').first().addClass('stage');
    elem.hover(function() {
      previous.fadeIn('slow');
      next.fadeIn('slow')
    }).on('mouseleave', function() {
      previous.fadeOut('slow');
      next.fadeOut('slow')
    });
    next.click(function() {
      changeSlide($('#slider-' + i + ' .slide'), 'next')
    });
    previous.click(function() {
      changeSlide($('#slider-' + i + ' .slide'), 'prev')
    })
  });
  if (slides.length > 0) {
    var slideInterval = setInterval(nextSlide, 5000)
  }
});

$(function() {
  $('.progress-show').each(function() {
    if ($(this).find('span').length == 0) {
      $(this).prepend('<span class="value"></span>');
    }
  });
});

$(function() {
  $('.form-elements input').each(function() {
    var elem = $(this);
    elem.on('input', function() {
      if (elem.hasClass('validate')) {
        validate(elem);
      }
    });
  });
});

$(function() {
  $('.form-elements .input-icon-right').each(function() {
    $(this).siblings('input').addClass('icon-right-input');
  });
});

$(function() {
  $('.form-elements .input-icon-left').each(function() {
    $(this).siblings('input').addClass('icon-left-input');
  });
});

$(function() {
  $('.form-elements input[type="range"]').each(function() {
    var slider = $(this);
    var container = slider.parent();
    var value = slider.val();
    var min = slider.attr('min');
    var max = slider.attr('max');
    container.addClass('range-container');
    container.prepend('<span class="range-tooltip"></span>');
    container.after('<div class="range-min-max"><span class="range-min">' + min + '</span><span class="range-max">' + max + '</span></div>');
    var tooltip = slider.siblings('.range-tooltip');
    getPosition(slider, tooltip);
    tooltip.html(value);
    slider.on("input", function() {
      getPosition(slider, tooltip);
      value = slider.val();
      tooltip.html(value)
    })
  })
});

$(function() {
  $('.form-elements input').each(function() {
    var input = $('.form-elements input');
    var elem = input.siblings('.form-input-placeholder');
    if (elem.length) {
      input.on('input focusout focus blur', function() {
        // var parentBg = searchParentsBackgroundColor($(input));
        if ($.trim(input.val()).length == 0) {
          elem.removeClass('hidden');
          elem.removeClass('form-input-placeholder-up');
          // $(elem).css("background-color", parentBg);
        } else {
          elem.addClass('form-input-placeholder-up');
          // $(elem).css("background-color", "inherit");
        }
      })
    }
  });
});

$(function() {
  $('.form-elements input').each(function() {
    var input = $(this);
    var elem = input.siblings('.form-mini-placeholder');
    if (elem.length) {
      input.on('input focusout focus blur', function() {
        if ($.trim(input.val()).length == 0) {
          elem.removeClass('hidden');
          elem.removeClass('form-mini-placeholder-up');
        } else {
          elem.addClass('form-mini-placeholder-up');
        }
      })
    }
  })
});

$(function() {
  $('header .sidebar').each(function() {
    var elem = $(this);
    if (elem.length) {
      let arrow = $('header .sidebar .arrow');
      for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
          let arrowParent = e.target.parentElement.parentElement;
          arrowParent.classList.toggle("showMenu");
        })
      }
      let sidebarBtn = $('.app-wrapper .nav-icon');
      let wrapper = $('.app-wrapper');
      if (elem.hasClass("closed")) {
        wrapper.removeClass("nav-open");
      } else {
        wrapper.addClass("nav-open");
      }
      sidebarBtn.on("click", function() {
        if (elem.hasClass("closed")) {
          elem.removeClass("closed");
          wrapper.addClass("nav-open");
        } else {
          wrapper.removeClass("nav-open");
          elem.addClass("closed");
        }
      })
    }
  })
});

function testStrength(content) {
  var strength = 0;
  if ($.trim(content).length >= 8) {
    strength += 25
  }
  if (content.match(uppercase)) {
    strength += 20
  }
  if (content.match(lowercase)) {
    strength += 10
  }
  if (content.match(numbers)) {
    strength += 20
  }
  if (content.match(characters)) {
    strength += 25
  }
  return strength
}

function drawProgressCircle(elem, percentage) {
  var underlay = elem.find('.progress-circle-underlay');
  var overlay = elem.find('.progress-circle-overlay');
  if (elem.hasClass('progress-circle-sm')) {
    underlay.attr("d", plotArc(40, 40, 40, 0, 359.99));
    overlay.attr("d", plotArc(40, 40, 40, 0, percentage - 0.01));
  } else if (elem.hasClass('progress-circle-md')) {
    underlay.attr("d", plotArc(80, 80, 60, 0, 359.99));
    overlay.attr("d", plotArc(80, 80, 60, 0, percentage - 0.01));
  } else if (elem.hasClass('progress-circle-lg')) {
    underlay.attr("d", plotArc(100, 100, 70, 0, 359.99));
    overlay.attr("d", plotArc(100, 100, 70, 0, percentage - 0.01));
  } else {
    underlay.attr("d", plotArc(40, 40, 40, 0, 359.99));
    overlay.attr("d", plotArc(40, 40, 40, 0, percentage - 0.01));
  }
}
$(function() {
  $('.password-strength-validator').each(function() {
    var elem = $(this);
    var input = elem.find('input');
    var complete = "&#x2714;";
    elem.append('<p id="strength-indicator" class="progress-animated hidden"><progress max="100"></progress></p><div class="password-strength-message hidden"></div>');
    var messagebox = elem.find('.password-strength-message'),
      indicator = elem.find('#strength-indicator'),
      progressbar = indicator.find('progress');
    messagebox.append('<ul class="list-unstyled"><li id="msg-charcount"><span class="icon"></span> Enter atleast <strong>Eight</strong> Characters.</li><li id="msg-lowercase"><span class="icon"></span> Use atleast one <strong>Lowercase</strong> Character. eg (abc)</li><li id="msg-uppercase"><span class="icon"></span> Use atleast one <strong>Uppercase</strong> Character. eg (ABC)</li><li id="msg-symbol"><span class="icon"></span> Use atleast one <strong>Non-Alphanumeric</strong> character. eg (!@#)</li><li id="msg-numeric"><span class="icon"></span> Use atleast one <strong>Numeric</strong> character. eg (123)</ul>');
    var msgCharcount = messagebox.find('#msg-charcount'),
      msgLowercase = messagebox.find('#msg-lowercase'),
      msgUppercase = messagebox.find('#msg-uppercase'),
      msgSymbol = messagebox.find('#msg-symbol'),
      msgNumeric = messagebox.find('#msg-numeric');
    input.on('input', function() {
      var content = input.val();
      if (content) {
        messagebox.removeClass('hidden');
        indicator.removeClass('hidden');
        if ($.trim(content).length >= 8) {
          msgCharcount.addClass('text-success');
          msgCharcount.find('.icon').html(complete)
        } else {
          msgCharcount.removeClass('text-success');
          msgCharcount.find('.icon').html('')
        }
        if (content.match(uppercase)) {
          msgUppercase.addClass('text-success');
          msgUppercase.find('.icon').html(complete)
        } else {
          msgUppercase.removeClass('text-success');
          msgUppercase.find('.icon').html('')
        }
        if (content.match(lowercase)) {
          msgLowercase.addClass('text-success');
          msgLowercase.find('.icon').html(complete)
        } else {
          msgLowercase.removeClass('text-success');
          msgLowercase.find('.icon').html('')
        }
        if (content.match(characters)) {
          msgSymbol.addClass('text-success');
          msgSymbol.find('.icon').html(complete)
        } else {
          msgSymbol.removeClass('text-success');
          msgSymbol.find('.icon').html('')
        }
        if (content.match(numbers)) {
          msgNumeric.addClass('text-success');
          msgNumeric.find('.icon').html(complete)
        } else {
          msgNumeric.removeClass('text-success');
          msgNumeric.find('.icon').html('')
        }
        if (testStrength(content) <= 25) {
          indicator.attr('class', 'progress-animated progress-danger')
        } else if (testStrength(content) > 25 && testStrength(content) <= 74) {
          indicator.attr('class', 'progress-animated progress-warning')
        } else if (testStrength(content) >= 75) {
          indicator.attr('class', 'progress-animated progress-success')
        }
      } else {
        messagebox.addClass('hidden');
        indicator.addClass('hidden');
        strength = 0
      }
      progressbar.attr('value', testStrength(content));
      input.attr('data-strength', testStrength(content));
    })
  })
});

$('.form-elements input').each(function() {
  var elem = $(this);
  if (elem.val()) {
    elem.closest('.form-elements').addClass('active');
  } else {
    elem.closest('.form-elements').removeClass('active');
  }
  elem.on('input', function() {
    if (elem.val()) {
      elem.closest('.form-elements').addClass('active');
    } else {
      elem.closest('.form-elements').removeClass('active');
    }
  });
})

$(function () {
  $(".credit-card-expiry").on("input", function () {
    $(this).val(formatCardExpiry($(this).val()));
    var expirydate = $(this).val();
    if (isCardExpired(expirydate)) {
      $(this).addClass("input-error");
      $(this).attr("data-valid", false);
    } else {
      $(this).removeClass("input-error");
      $(this).attr("data-valid", true);
    }
  });
});

$(function() {
  $('.credit-card-number').on('input', function() {
    $(this).val(creditCardFormat($(this).val()));
    var card = validateCreditCard($(this).val());
    $(this).attr('data-card', card);
    if (card) {
      $(this).removeClass('input-error');
      $(this).attr('data-valid', true);
    } else {
      $(this).addClass('input-error');
      $(this).attr('data-valid', false);
    }
  });
})

$(function() {
  $('.form-elements input[type="tel"]').each(function() {
    var elem = $(this);
    elem.wrap("<div class='input\-addon input-phone-addon'></div>");
    var classes = elem.attr('class');
    if (classes) {
      classes = classes.split(" ");
      var colorCases = ["input-primary", "input-secondary", "input-success", "input-info", "input-danger", "input-warning", "input-error", "input-muted"];
      var classMatch = arrayMatch(colorCases, classes);
    }
    elem.addClass("phone numeric validate");
    elem.attr('maxlength', '15');
    elem.on("keypress keyup paste blur", function(event) {
      // $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
      if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
      }
    });

    if (elem.parents('.input-addon').length) {
      var parent = elem.parents('.input-addon');
      elem.parents('.input-addon').prepend('<input type="hidden" class="input-tel-clone"/>');
      elem.parents('.input-addon').prepend('<div class="input-addon-item"><div class="select-box select-icon-left" data-placeholder="US +1" data-type="tel" data-value="" data-class="select-input tel-select-input tel phonecode" data-name=""><div class="select phone-dropdown-select"><ul></ul></div></div></div>');
      var addon = elem.siblings('.input-addon-item');
      var clone = parent.find(".input-tel-clone");

      clone.attr('id', elem.attr('id'));
      clone.attr('name', elem.attr('name'));
      elem.removeAttr('name');
      elem.removeAttr('id');

      if (elem.hasClass("input-lg")) {
        if (addon.length) {
          addon.addClass("input-addon-lg");
        }
      }

      if (classMatch) {
        for (var i = 0; i < classMatch.length; i++) {
          addon.addClass(classMatch[i]);
        }
      }

      var classes = addon.attr("class");

      elem.on("click keyup keydown paste blur", function() {
        var newclass = elem.attr("class");
        var phonecode = parent.find(".phonecode");
        addon.attr("class", classes + " " + newclass);
        addon.removeClass("input-lg phone validate");

        if ($.trim(elem.val()).length === 0 && $.trim(phonecode.val()).length === 0) {
          // if ($.trim(elem.val()).length === 0 || $.trim(phonecode.val()).length === 0) {
          phonecode.focus();
        }

        if (elem.val()) {
          elem.val(formatPhoneStr(elem.val()));
        }

        // clone.val(phonecode.val() + toInteger(elem.val()));
        clone.val("+" + phonecode.val().replace(/[^0-9]/g, '') + toInteger(elem.val().replace(/[^0-9]/g, '')));
      })
    }

  });
});

$(function() {
  $('.form-elements .input-phone-addon').each(function() {
    var elem = $(this);
    if (elem.length) {
      $.post('https://api.chromesq.com/anemoi/?action=getDefault')
        .done(function(data) {
          for (var i in data) {
            if (data.hasOwnProperty(i)) {
              var country = data[i]["name"];
              var code = (data[i]["phonecode"]).replace(/\D/g, '');
              var iso = data[i]["iso2"];
              var selected = data[i]["selected"];
              if (country) {
                if (selected == code) {
                  $('.form-elements .tel-select-input').each(function() {
                    $(this).val(iso + " +" + code);
                  });
                  elem.find(".select-items").append("<li role='presentation' class='option selected' data-value='+" + code + "' data-iso2='" + iso + "'><strong>" + country + "</strong> +" + code + "</li>");
                } else {
                  elem.find(".select-items").append("<li role='presentation' class='option' data-value='+" + code + "' data-iso2='" + iso + "'><strong>" + country + "</strong> +" + code + "</li>");
                }
              }
            }
          }
        })
    }
  })
});

$(function() {
  $(document).on("input", '.form-elements .tel-select-input', function() {
    var elem = $(this);
    elem.attr('maxlength', '5');
    // elem.on("input", function(event) {
    //   $(this).val($(this).val().replace(/[^0-9\+]/g, ''));
    //   if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
    //     event.preventDefault();
    //   }
    // });
  })
});

$(function() {
  $('input[type="number"]').each(function() {
    $(this).addClass('input-number');
    $(this).on('click input', function() {
      if ($(this).val() == 0) {
        $(this).val('');
      }
    })
  });
  $('<div class="input-number-mask"><div class="input-number-spinner spinner-up">+</div><div class="input-number-spinner spinner-down">-</div></div>').insertAfter('.input-number');
  $('.form-elements').each(function() {
    var elem = $(this),
      input = elem.find('.input-number'),
      up = elem.find('.spinner-up'),
      down = elem.find('.spinner-down'),
      min = input.attr('min'),
      max = input.attr('max');
    up.click(function() {
      var initial = parseFloat(input.val());
      if (initial >= max) {
        var current = initial
      } else if (Number.isNaN(initial)) {
        var current = 0
      } else {
        var current = initial + 1
      }
      elem.find("input").val(current);
      elem.find("input").trigger("change")
    });
    down.click(function() {
      var initial = parseFloat(input.val());
      if (initial <= min) {
        var current = initial
      } else if (Number.isNaN(initial)) {
        var current = 0
      } else {
        var current = initial - 1
      }
      elem.find("input").val(current);
      elem.find("input").trigger("change")
    })
  })
});

$(function() {
  $('.user-card').each(function() {
    var card = $(this);
    var more = card.find('.card-more');
    // more.html('Show<br/>more');
    card.on('click', function() {
      if (card.hasClass('active')) {
        card.removeClass('active');
        more.css('transform', 'rotate(45deg)');
        // more.html('Show<br/>more');
      } else {
        card.addClass('active');
        more.css('transform', 'rotate(0deg)');
        // more.html('Hide<br/>');
      }
    });
  });
});

$(function() {
  $('.dropdown').each(function() {
    var elem = $(this);
    var btn = elem.find('.dropdown-btn');
    var menu = elem.find('.dropdown-menu');
    if (elem.hasClass('caret')) {
      menu.prepend('<div class="dropdown-menu-caret"><div class="dropdown-menu-caret-outer"></div><div class="dropdown-menu-caret-inner"></div></div>');
    }
    btn.on('click', function() {
      elem.toggleClass('show-dropdown-menu');
      if (elem.hasClass('show-dropdown-menu')) {
        menu.attr('aria-hidden', false);
      } else {
        menu.attr('aria-hidden', true);
      }
    });
  });
});

$(function() {
  $('.hover-dropdown').each(function() {
    var elem = $(this);
    var btn = elem.find('.dropdown-btn');
    var menu = elem.find('.dropdown-menu');
    if (elem.hasClass('caret')) {
      menu.prepend('<div class="dropdown-menu-caret"><div class="dropdown-menu-caret-outer"></div><div class="dropdown-menu-caret-inner"></div></div>');
    }
    elem.on('mouseenter', function() {
      elem.addClass('show-dropdown-menu');
      menu.attr('aria-hidden', false);
    });

    btn.on('click', function() {
      elem.toggleClass('show-dropdown-menu');
      if (elem.hasClass('show-dropdown-menu')) {
        menu.attr('aria-hidden', false);
      } else {
        menu.attr('aria-hidden', true);
      }
    });
  });
});

$(function() {
  $('.auto-width').each(function() {
    var elem = $(this);
    var min = elem.width();
    var text = elem.val().length ? elem.val().length : elem.text().length;
    elem.on('input', function() {
      if (min <= text) {
        $(this).attr('size', min);
      } else {
        $(this).attr('size', text);
      }
    })
  });
});

$(function() {
  $()
})

$(function() {
  $('.select-box').each(function() {
    var elem = $(this);
    if (elem.hasClass("select-icon-right")) {
      elem.prepend('<div class="form-elements input-icon-right"><input type="text" class="select-input" autocomplete="' + generateHEX() + '" autocorrect="off" /><a class="dropdown-btn"><span class="input-icon"><i class="icon-Arrow-Down va-m"></i></span></a></div>');
    } else {
      elem.prepend('<div class="form-elements input-icon-left"><input type="text" class="select-input" autocomplete="' + generateHEX() + '" autocorrect="off" /><a class="dropdown-btn"><span class="input-icon"><i class="icon-Arrow-Down va-m"></i></span></a></div>');
    }
    var btn = elem.find('.dropdown-btn .input-icon');
    var menu = elem.find('.select');
    var input = elem.find('.select-input');
    // var input = $(".select-input", this);
    var data = elem.data();
    var list = menu.find('ul');
    var item;

    list.addClass('select-items');
    list.attr('tabindex', '-1');
    list.attr('role', 'menu');
    list.attr('aria-labelledby', 'dropdown-btn');
    list.attr('aria-hidden', 'true');

    // var option = $(".select-items .option", this);
    var option = elem.find("li");
    option.each(function() {
      $(this).attr('role', 'presentation');
      $(this).addClass('option');
    });

    for (var i in data) {
      input.attr(i, data[i]);
    }

    btn.on('click', function() {
      btn.toggleClass('dropdown-btn-open');
      if (btn.hasClass('dropdown-btn-open')) {
        menu.attr('aria-hidden', false);
        elem.removeClass('show-options');
      } else {
        menu.attr('aria-hidden', true);
        input.focus();
      }
    });

    input.on('focus', function() {
      input.select();
      input.attr('readonly', false);
      elem.addClass('show-options');
      menu.attr('aria-hidden', false);
      btn.addClass('dropdown-btn-open');
      $(".select-items .options").removeClass("selected");
    });

    var option = $(".select-items .option", this);
    // $(document).on('mousedown', '.select-box.show-options .select .option', function() {
    option.on('mousedown', function() {
      $(this).siblings().removeClass("selected");
      $(this).addClass('selected');
      var value = $(this).data("value");
      var iso = $(this).data("iso2");
      item = value ? value : $(this).text();
      input.attr('data-value', item);
      elem.removeClass('show-options');
      menu.attr('aria-hidden', true);
      if (input.hasClass("tel-select-input")) {
        item = value && iso ? iso + " " + value : $(this).text();
        input.val(item).trigger('change');
      } else {
        input.val(item).trigger('change');
      }
    });

    input.on('focusout', function() {
      elem.removeClass('show-options');
      menu.attr('aria-hidden', false);
      btn.removeClass('dropdown-btn-open');
    });

    input.on('input', function() {
      var option = $(this).parent().siblings('.select').find(".option");
      option.removeClass("selected");
      var filter = $(input).val();
      if ($.trim(filter).length > 0) {
        elem.addClass('show-options');
        menu.attr('aria-hidden', false);
        option.each(function(index, value) {
          var data = $(value).data("value");
          currentOption = data ? data : $(value).text();
          if (currentOption.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            $(value).show();
          } else if (currentOption.toUpperCase() == filter.toUpperCase()) {
            $(value).addClass("selected");
          } else {
            $(value).hide();
          }
        });
      } else {
        option.each(function(index, value) {
          $(value).show();
        });
        elem.removeClass('show-options');
        menu.attr('aria-hidden', true);
      }
    });

  });
});

$(function() {
  $('.dropdown-menu-items').each(function() {
    var elem = $(this);
    elem.attr('tabindex', '-1');
    elem.attr('role', 'menu');
    elem.attr('aria-labelledby', 'dropdown-btn');
    elem.attr('aria-hidden', 'true');
  });
});

$(function() {
  $('.options').each(function() {
    var elem = $(this);
    elem.attr('tabindex', '-1');
    elem.attr('role', 'menu');
    elem.attr('aria-labelledby', 'dropdown-btn');
    elem.attr('aria-hidden', 'true');
  });
});

$(function() {
  $('.btn.btn-arrow').each(function() {
    var elem = $(this);
    elem.prepend('<span class="circle" aria-hidden="true"><span class="icon arrow"></span></span>');
    elem.contents().filter(function() {
      return this.nodeType === 3;
    }).wrap("<span></span>");
  });
});

$(function() {
  $('.eye').each(function() {
    var elem = $(this);
    elem.html('<div class="eyelid"><span></span></div><div class="pupil"><div class="ball"><div class="iris"></div></div></div>');
  })
});

$(function() {
  $('.eye-track').each(function() {
    var eyeball = $(this);
    var offset = eyeball.offset();
    if (touch) {
      $(document).on('touchmove', function(event) {
        var pupil = eyeball.find('.pupil');
        var x = (pupil.offset().left) + (pupil.width() / 2);
        var y = (pupil.offset().top) + (pupil.height() / 2);
        var rad = Math.atan2(event.originalEvent.changedTouches[0].pageX - x, event.originalEvent.changedTouches[0].pageY - y);
        var rot = Math.round((rad * (180 / Math.PI) * -1) + 180);
        pupil.css({
          '-webkit-transform': 'rotate(' + rot + 'deg)',
          '-moz-transform': 'rotate(' + rot + 'deg)',
          '-ms-transform': 'rotate(' + rot + 'deg)',
          'transform': 'rotate(' + rot + 'deg)'
        });
      });
    } else {
      $(document).on('mousemove', function(event) {
        var pupil = eyeball.find('.pupil');
        var x = (pupil.offset().left) + (pupil.width() / 2);
        var y = (pupil.offset().top) + (pupil.height() / 2);
        var rad = Math.atan2(event.pageX - x, event.pageY - y);
        var rot = Math.round((rad * (180 / Math.PI) * -1) + 180);
        pupil.css({
          '-webkit-transform': 'rotate(' + rot + 'deg)',
          '-moz-transform': 'rotate(' + rot + 'deg)',
          '-ms-transform': 'rotate(' + rot + 'deg)',
          'transform': 'rotate(' + rot + 'deg)'
        });
      });
    }
  });
});

$(function() {
  $('.progress-show').each(function() {
    var elem = $(this);
    if (elem.hasClass('progress-circle')) {
      var elemVal = elem.find('.value');
      var val = elem.data('progress');
      var percentage = 0;
      if (val) {
        percentage = (val / 100) * 360;
      } else {
        val = 0;
      }
      elemVal.text(val + '%');
    } else {
      var elemVal = elem.find('.value');
      val = elem.find('progress').attr('value');
      if (val) {
        elemVal.css('left', val - 2 + '%')
      } else {
        val = 0;
        elemVal.css('left', val + '%')
      }
      elemVal.text(val + '%')
    }
  })
});

$(function() {
  $('.progress-circle').each(function() {
    var elem = $(this);
    elem.append('<svg class="progress-circle-svg"><path class="progress-circle-underlay"/><path class="progress-circle-overlay"/></svg>');
    var val = elem.data('progress');
    var percentage = 0;
    if (val) {
      percentage = (val / 100) * 360;
    } else {
      val = 0;
    }
    var underlay = elem.find('.progress-circle-underlay');
    var overlay = elem.find('.progress-circle-overlay');
    drawProgressCircle(elem, percentage);
  })
});

$(function() {
  $('.process-vertical .process .process-step .content').each(function(index, value) {
    $(this).text(index + 1);
  });
});

$(function() {
  $('.modal-trigger').click(function(e) {
    var modal = $(this).data('modal');
    $('#' + modal).toggleClass('open');
    $('main').toggleClass('blur');
    return false;
  });
});

$(function() {
  $('.modal').each(function() {
    var elem = $(this);
    var head = elem.find('.head');
    head.append('<a class="btn-close trigger" href="javascript:void(0);"></a>');
    var btn = head.find('.btn-close');
    var close = elem.find('.modal-close');
    var parent = elem.parents('.modal-wrapper');
    btn.click(() => {
      parent.toggleClass('open');
    })
    close.click(() => {
      parent.toggleClass('open');
    })
  })
})

$(function() {
  $('.nav .tabbar ul').each(function() {
    $(this).prepend("<span class='drip'></span>");
  })
})

$(function() {
  $('.nav .tabbar ul li a').click(function(e) {
    let link = $(this),
      li = link.parent();
    setActiveTab(li.parent(), li);
    return false;
  });
});

$(function() {
  $('.resizable').each(function() {
    $(this).prepend("<div class='resizers'><div class='resizer top-left'></div><div class='resizer top-right'></div><div class='resizer bottom-left'></div><div class='resizer bottom-right'></div></div>");
    makeResizableDiv($(this))
  })
});

$(function () {
  $(".service-card .background").each(function () {
    $(this).html(
      '<div class="tiles"><div class="tile tile-1"></div><div class="tile tile-2"></div><div class="tile tile-3"></div><div class="tile tile-4"></div><div class="tile tile-5"></div><div class="tile tile-6"></div><div class="tile tile-7"></div><div class="tile tile-8"></div><div class="tile tile-9"></div><div class="tile tile-10"></div></div><div class="line line-1"></div><div class="line line-2"></div><div class="line line-3"></div>'
    );
  });
});

function searchParentsBackgroundColor (childElement) {
  var parentElement = childElement.parent();
  if (parentElement.length > 0) {
    if (
      parentElement.css("background-color") !== "rgba(0, 0, 0, 0)" &&
      parentElement.css("background-color") !== "transparent"
    ) {
      let parentbg = parentElement.css("background-color");
      if (parentbg) {
        return parentbg;
      }
    } else {
      searchParentsBackgroundColor(parentElement);
    }
  } else {
    return "transparent";
  } 
}

function setActiveTab(nav, li) {
  nav.find('li').removeClass('active');
  li.addClass('active');
  var drip = $('.nav .tabbar ul .drip');
  nav.css('--x', li.position().left + li.outerWidth() / 2 + 'px');
  drip.css('left', li.position().left + li.outerWidth() / 2 + 'px');
}

function setProgressBar(elem, val = null) {
  var elemVal = elem.siblings('.value');
  if (val) {
    elemVal.css('left', val - 2 + '%')
  } else {
    val = 0;
    elemVal.css('left', val + '%')
  }
  elemVal.text(val + '%');
  elem.val(val);
}

function setProgressCircle(elem, val = null) {
  var percentage = 0;
  if (val) {
    percentage = parseInt((val / 100) * 360) - 0.01;
  } else {
    val = 0;
  }
  drawProgressCircle(elem, percentage);
}

var CorsairAlert = function(option, id = '.corsair-notification-area') {
  this.show = function(msg, bg = 'white', title = "") {
    if (msg === '' || typeof msg === 'undefined' || msg === null) {
      throw '"Empty Notification"'
    } else {
      var alertArea = document.querySelector(id);
      var alertBox = document.createElement('DIV');
      var alertTitle = document.createElement('H4');
      var alertContent = document.createElement('DIV');
      var alertClose = document.createElement('A');
      var alertClass = this;
      alertContent.classList.add('content');
      alertTitle.classList.add('title');
      alertTitle.innerHTML = title;
      alertContent.innerHTML = msg;
      alertClose.classList.add('close');
      alertClose.setAttribute('href', '#');
      alertBox.classList.add('notification');
      alertBox.classList.add('bg-' + bg.toLowerCase());
      alertBox.appendChild(alertTitle);
      alertBox.appendChild(alertContent);
      if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
        alertBox.appendChild(alertClose)
      }
      alertArea.appendChild(alertBox);
      alertClose.addEventListener('click', function(event) {
        event.preventDefault();
        alertClass.hide(alertBox)
      });
      if (!option.persistent) {
        var alertTimeout = setTimeout(function() {
          alertClass.hide(alertBox);
          clearTimeout(alertTimeout)
        }, option.closeTime)
      }
    }
  };
  this.hide = function(alertBox) {
    alertBox.classList.add('hide');
    var disperseTimeout = setTimeout(function() {
      // alertBox.parentNode.removeChild(alertBox);
      alertClass.hide(alertBox);
      clearTimeout(disperseTimeout)
    }, 500)
  }
};

var corsairAlert = new CorsairAlert({
  closeTime: 5000,
  persistent: !1,
  hideCloseButton: !1
});

var corsairAlertPersistent = new CorsairAlert({
  closeTime: 5000,
  persistent: !0,
  hideCloseButton: !1
});

var Notify = function(option, id = 'body') {
  this.show = function(msg, bg = 'white', title = "", logo = "") {
    if (msg === '' || typeof msg === 'undefined' || msg === null) {
      throw '"Empty Notification"'
    } else {
      var alertArea = document.querySelector(id);
      var alertBox = document.createElement('DIV');
      var alertHeader = document.createElement('DIV');
      var alertImage = document.createElement('IMG');
      var alertLogo = document.createElement('DIV');
      var alertTitle = document.createElement('DIV');
      var alertContent = document.createElement('DIV');
      var alertDescription = document.createElement('DIV');
      var alertClose = document.createElement('A');
      var alertClass = this;
      alertImage.setAttribute('src', logo);
      alertLogo.classList.add('logo');
      alertContent.classList.add('content');
      alertTitle.classList.add('title');
      alertHeader.classList.add('header');
      alertDescription.classList.add('description');
      alertTitle.innerHTML = title;
      alertDescription.innerHTML = msg;
      alertClose.classList.add('close');
      alertClose.setAttribute('href', '#');
      alertBox.classList.add('notify');
      alertBox.classList.add('bg-' + bg.toLowerCase());
      if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
        alertBox.appendChild(alertClose)
      }
      alertContent.appendChild(alertTitle);
      alertLogo.appendChild(alertImage);
      alertHeader.appendChild(alertLogo);
      alertContent.appendChild(alertDescription);
      alertHeader.appendChild(alertContent);
      alertBox.appendChild(alertHeader);

      alertArea.appendChild(alertBox);
      alertClose.addEventListener('click', function(event) {
        event.preventDefault();
        alertClass.hide(alertBox)
      });
      if (!option.persistent) {
        var alertTimeout = setTimeout(function() {
          alertClass.hide(alertBox);
          clearTimeout(alertTimeout)
        }, option.closeTime * 2)
      }
    }
  };
  this.hide = function(alertBox) {
    alertBox.classList.add('hide');
    var disperseTimeout = setTimeout(function() {
      // alertBox.parentNode.removeChild(alertBox);
      alertClass.hide(alertBox);
      clearTimeout(disperseTimeout)
    }, 500)
  }
};

const notify = new Notify({
  closeTime: 5000,
  persistent: !1,
  hideCloseButton: !1
});

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
    tag = "",
    writingTag = false,
    tagOpen = false,
    typeSpeed = parseInt(t.getAttribute('data-speed'), 10) || 200,
    clear = t.getAttribute('data-clear'),
    tempTypeSpeed = 0;

  var type = function() {

    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      } else {
        tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      }
      t.innerHTML += HTML[cursorPosition];
    }
    if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    // if (cursorPosition < HTML.length - 1) {
    if (cursorPosition < HTML.length) {
      setTimeout(type, tempTypeSpeed);
    } else if (cursorPosition == HTML.length - 1 && clear === "true") {
      //console.log("done");
    }

  };

  return {
    type: type
  };
}

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="text-wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

function updatePie(elem, percent) {
  var deg;
  var totaltime = elem.data('count');
  var color = elem.css("background-color");
  if (percent < (totaltime / 2)) {
    deg = 90 + (360 * percent / totaltime);
    elem.css('background-image',
      'linear-gradient(' + deg + 'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
    );
  } else if (percent >= (totaltime / 2)) {
    deg = -90 + (360 * percent / totaltime);
    elem.css('background-image',
      'linear-gradient(' + deg + 'deg, transparent 50%, ' + color + ' 50%),linear-gradient(90deg, white 50%, transparent 50%)'
    );
  }
}

// function sortTable(table, col, reverse) {
//   var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
//     tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
//     i;
//   reverse = -((+reverse) || -1);
//   tr = tr.sort(function(a, b) { // sort rows
//     return reverse // `-1 *` if want opposite order
//       *
//       (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
//         .localeCompare(b.cells[col].textContent.trim())
//       );
//   });
//   for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
// }

function sortTable(table, col, reverse) {
  var tb = table.tBodies[0],
    tr = Array.prototype.slice.call(tb.rows, 0),
    i;
  reverse = -((+reverse) || -1);
  tr = tr.sort(function(a, b) {
    if (!isNaN(a.cells[col].textContent) && !isNaN(b.cells[col].textContent))
      return reverse * ((+a.cells[col].textContent) - (+b.cells[col].textContent))
    return reverse *
      (a.cells[col].textContent.trim()
        .localeCompare(b.cells[col].textContent.trim())
      );
  });
  for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
}

function makeSortable(table) {
  var th = table.tHead,
    i;
  th && (th = th.rows[0]) && (th = th.cells);
  if (th) i = th.length;
  else return; // if no `<thead>` then do nothing
  while (--i >= 0)(function(i) {
    var dir = 1;
    th[i].addEventListener('click', function() {
      sortTable(table, i, (dir = 1 - dir))
    });
  }(i));
}

function makeTablesSortable(parent) {
  parent = parent || document.body;
  var t = parent.querySelectorAll('.table-sortable'),
    i = t.length;
  while (--i >= 0) makeSortable(t[i]);
}

function genericPagingateTable(page = 1) {
  $('.table-paginate').each(function() {
    var elem = $(this);
    paginateTable(elem, "", "", "", page);
  })
}

// function paginateTable(elem, show_per_page = "", number_of_items = "", number_of_pages = "", current_page = "") {
function paginateTable(elem, a = "", b = "", c = "", d = "") {
  elem.css('display', 'table');

  var show_per_page = a ? a : elem.attr('data-show');
  var rows = elem.children('tbody').find('tr');
  var number_of_items = 0;
  if (rows.length) {
    number_of_items = b ? b : rows.length;
  }
  var number_of_pages = c ? c : Math.ceil(number_of_items / show_per_page);
  var current_page = d ? d : 1;

  var parent = elem.parents('.datatable');
  var paginator = parent.find('.pagination');
  var counter = paginator.find('.counter');
  var pr = paginator.find('.paginate.right');
  var pl = paginator.find('.paginate.left');

  if (b) {
    elem.attr('data-rows', b);
  } else {
    elem.attr('data-rows', number_of_items);
  }

  if (c)
    elem.attr('data-pages', c);
  if (d)
    elem.attr('data-current', d);
  if (a)
    elem.attr('data-show', a);

  // if (number_of_items > show_per_page) {
  //   showPaginator(elem);
  var rows = elem.children('tbody').find('tr');
  rows.hide();
  rows.each(function(n) {
    if (n >= show_per_page * (current_page - 1) && n < show_per_page * current_page)
      $(this).show();
  });
  // } else {
  //   hidePaginator(elem);
  // }

  setTablePaginationCounter(elem, number_of_pages, current_page);
}

function setTablePaginationCounter(elem, end, current) {

  var show_per_page = elem.attr('data-show');
  var rows = elem.children('tbody').find('tr');
  var number_of_items = 0;
  if (rows.length) {
    number_of_items = rows.length;
  }
  var number_of_pages = Math.ceil(number_of_items / show_per_page);
  var current_page = current ? current : toInteger(elem.attr('data-current'));

  var parent = elem.parents('.datatable');
  var paginator = parent.find('.pagination');
  var counter = paginator.find('.counter');
  var pr = paginator.find('.paginate.right');
  var pl = paginator.find('.paginate.left');

  // SET PAGINATOR ICON
  if (number_of_pages === current_page) {
    pl.attr('data-state', '0');
    pr.attr('data-state', 'disabled');
  } else if (number_of_pages > current_page) {
    // pl.attr('data-state', 'disabled');
    pr.attr('data-state', '0');
  } else if (current_page < number_of_pages) {
    pl.attr('data-state', '0');
    pr.attr('data-state', '0');
  } else if (current_page == number_of_pages + 1 && number_of_items == 0) {
    pl.attr('data-state', 'disabled');
    pr.attr('data-state', 'disabled');
  } else if (current_page > number_of_pages) {
    pl.attr('data-state', '0');
    pr.attr('data-state', 'disabled');
  }

  if (number_of_items == 0) {
    current_page = 0;
  }

  elem.parent().children('.pagination').find('.counter').html(current_page + ' / ' + number_of_pages);
}

function hidePaginator(table) {
  table.parent().children('.pagination').hide();
}

function showPaginator(table) {
  table.parent().children('.pagination').show();
}

function addToggleLinks() {
  if ($('.navbar').is(":visible")) {
    $('.dropdown').addClass('toggle-link');
    if ($(".toggle-link").length > 0) {} else {
      // $('.dropdown > a').before('<span class="toggle-link"> Open submenu </span>');
      // $('.dropdown > a').attr('href', 'javascript: void(0)');
      $('.toggle-link').click(function(e) {
        var $this = $(this);
        $this.toggleClass('active').siblings('ul').toggleClass('active');
      });
    }
  } else {
    $('.toggle-link').empty();
  }
}
addToggleLinks();

function checkElement(element, count) {
  var all = $("*");
  var totalElements = all.length;
  var percentage = 100 / totalElements;
  if ($(element).on()) {
    var progress = percentage + Number(count);
    count = progress;
    doProgress(progress);
  } else {
    setElement(element, count);
  }
  return count;
}

function setElement(setElement, count) {
  checkElement(setElement, count);
}

//USE THE PAGE LOAD PROGRESS HERE
function doProgress(progress) {
  // setProgressBar($('#page-preloader-progress'), progress);
  var interval = "3000";
  if (progress >= 99) {
    $('.overlay').delay(interval).fadeOut('slow', function() {
      $('body').removeClass('preload');
      $(this).remove();
    });
  }
}

function makeResizableDiv(div) {
  const element = $(div);
  // const resizers = $(div + ' .resizer');
  const resizers = $(div).find('.resizer');
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      } else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      } else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      } else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function plotArc(x, y, radius, startAngle, endAngle) {

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ?
    "0" :
    "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
}

var slides = $('.carousel-animated .slide');
var currentSlide = 0;

function nextSlide() {
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = 'slide stage'
}

function changeSlide(slide, direction) {
  currentSlide = 0;
  for (var i = 0; i < slide.length; i++) {
    if ($(slide[i]).is(":visible") && direction == "next") {
      thisDiv = $(slide[i]);
      if (i != slide.length - 1) {
        nextDiv = thisDiv.next()
      } else {
        nextDiv = $(slide[0])
      }
      showDirection = "right";
      hideDirection = "left"
    }
    if ($(slide[i]).is(":visible") && direction == "prev") {
      thisDiv = $(slide[i]);
      if (i != 0) {
        nextDiv = thisDiv.prev()
      } else {
        nextDiv = $(slide[slide.length - 1])
      }
      showDirection = "left";
      hideDirection = "right"
    }
  }
  thisDiv.fadeOut('fast');
  thisDiv.removeClass('stage');
  nextDiv.fadeIn('fast');
  nextDiv.addClass('stage')
}

function getPosition(slider, tooltip) {
  var slider,
    newPoint,
    width,
    newPlace;
  var width = slider.width() - 24;
  newPoint = (slider.val() - slider.attr("min")) / (slider.attr("max") - slider.attr("min"));
  if (newPoint < 0) {
    newPlace = 0
  } else if (newPoint > 1) {
    newPlace = width
  } else {
    newPlace = width * newPoint
  }
  tooltip.css({
    left: newPlace
  })
}

function validate(elem) {
  var elemnt = $(this);
  if (elem.attr('type') == "email") {
    if (validateEmail(elem.val())) {
      noError(elem);
      result = true;
    } else {
      elementHasError(elem);
      result = false;
    }
  } else if ($.trim(elem.val()) == "") {
    elementHasError(elem);
    result = false;
  } else {
    noError(elem);
    result = true;
  }
  return result;
}
