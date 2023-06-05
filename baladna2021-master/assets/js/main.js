// import { TypeTransition } from './animations/typeTransition.js';
// import sliderEnter from './animations/sliderEnter.js';
// import sliderLeave from './animations/sliderLeave.js';
import openPage from './animations/openPage.js';
import closePage from './animations/closePage.js';
import loading from './animations/loading.js';
import assets_map from './animations/assets_map.js';
import headerAnimation from './animations/headerAnimation.js';
import highlightsAnimation from './animations/highlightsAnimation.js';

// import { Item } from './item.js';

const counterUp = window.counterUp.default

// "use strict";
var totalReq = 0;
var downloadRequest = 0;
var selectedFilesCount = 0;
var files = new Object();
var headerHeight = 40;
var breakPoint = 992;
var isChapter = false;

function slider() {
  if ($(".strategy_swiper").length > 0) {
    var homeSlider = new Swiper(".strategy_swiper", {
      // loop: true,
      autoplay: {
        delay: 3000,
      },
      slideToClickedSlide: true,
      slidesPerView: 3,
      spaceBetween: 10,
      // freeMode: true,
      observeParents: true,
      centeredSlides: true,
      // roundLengths: true,

      grabCursor: true,

      mousewheel: {
        releaseOnEdges: true,
      },
      pagination: {
        el: '.swiper-pagination',
        // type: 'progress',
        type: 'fraction',
      },
      breakpoints: {
        280: {
          slidesPerView: 1.2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }
}

$(document).ready(function () {
  $(".baladna-text table").last().addClass("cfo-last-table");

  const splitting = Splitting();

  headerAnimation();
  initCharts();
  initChartsWaypoint();

  var gainContainer = $(".theme p, .theme h2, .theme img, .box, .inputs, .g-animation").waypoint({
    handler: function (dir) {
      var el = $(this[(0, "element")]);

      if (dir === "down") {
        el.addClass("show");
      } else {
        el.removeClass("show");
      }
    },
    offset: "90%"
  });

  if ($(".highlights").length > 0) {
    highlightsAnimation();
  };
  slider();
  var tabEl = $('[data-bs-toggle="pill"]');
  if (tabEl.length > 0) {
    tabEl.on('shown.bs.tab', function () {
      if ($(".graphs_container").length > 0) {

        setTimeout(function () {
          // Resize chart
          revenues_dist.resize();
          ebitda_dist.resize();
          net_income_dist.resize();
          capex_dist.resize();

          revenues_oil.resize();
          ebitda_oil.resize();
          net_income_oil.resize();
          capex_oil.resize();
        }, 400);

        // setTimeout(function () {
        // populateCharts();
        // }, 2000);
      }
    });
  }
  var oper_tab = $('#operational_review_pills_tab [data-bs-toggle="pill"]');
  oper_tab.on('shown.bs.tab', function (event) {
    // if ($(event.target).data("bsTarget") == "#pills_1") {

    $(".tab-content iframe").each(function () {
      $(this).attr("src", "");
    })
    const targetIframe = $($(event.target).data("bsTarget")).find("iframe");
    targetIframe.attr("src", $(event.target).data("video"));
    // }
  })
  gsap.registerPlugin(ScrollTrigger);
  loading();
  if ($(".map_q").length > 0) {
    gsap.to([".map_q"], { duration: 50, ease: Linear.easeNone, rotation: "360", repeat: -1 }, "start")
  }

  $(".operations_map").on("mouseenter", "circle", function () {
    var target = $(this).data("target");
    $(".oprations_copy").find("#" + target)
      .addClass("active").siblings().removeClass("active");
  });
  $(".operations_map").on("mouseleave", "circle", function () {
    setTimeout(() => {
      $(".location").removeClass("active");
    }, 500);
  });

  $(".assets_map").on("mouseenter", ".circles circle", function () {
    var target = $(this).data("target");
    $(".locations_copy").find("#" + target)
      .addClass("active").siblings().removeClass("active");
  });
  $(".locations_copy .close").on("click", function () {
    console.log("close");
    $(".location").removeClass("active");
  });


  $(".assets_map").on("mouseleave", ".circles circle", function () {
    setTimeout(() => {
      $(".operation").removeClass("active");
    }, 500);
  });


  let scrollRef = 0;
  AOS.init();
  Waypoint.refreshAll();


  window.addEventListener("scroll", function () {
    // increase value up to 10, then refresh AOS
    scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    var scroll = $(window).scrollTop();
    if (scroll > 300) {
      $(".back-to-top").addClass("show");
    } else {
      $(".back-to-top").removeClass("show");
    }
  });





  document.addEventListener("aos:in", ({ detail }) => { });

  $("#download_form").submit(function () { return false; });
  $(".download-selected").click(function () {
    console.log($("#download_form").serializeArray());
    $(".alert").addClass("d-block");

    downloadRequest = 0;
    selectedFilesCount = 0;
    var lang = $("#download_form").data("lang");
    // load all select files from server to be sent to merger and keep track of count
    $.each($("#download_form").serializeArray(), function (i, field) {
      if (field.name == "section_pdf[]") {
        totalReq++;
        loadFile(selectedFilesCount, field.value, lang);
        selectedFilesCount++;
      }
    });

    // when all the ongoing files loading requests complete
    $(document).ajaxStop(function () {
      console.log("total req:", totalReq);
      if (totalReq == 0 && downloadRequest == 0) {
        // totalReq--;

        downloadRequest = 1;

        console.log("all completed", files);
        var fd = new FormData();
        for (var j = 0; j < selectedFilesCount; j++) {
          console.log(j, files[j]);
          fd.append("pdfs", files[j]);
        }
        fd.filename = "Custom_AR_2021.pdf";
        // if (isChapter) {
        //   for (var j = 1; j <= selectedFilesCount; j++) {
        //     fd.append("pdfs", files[j]);
        //   }
        // } else {
        //   for (var j = 0; j < selectedFilesCount; j++) {
        //     console.log(j, files[j]);
        //     fd.append("pdfs", files[j]);
        //   }
        // }
        console.log(fd);

        // send files to merger
        jQuery.ajax({
          // url: "http://localhost:3000/merge",
          url: "https://mergeit.lava-brands.com/merge",
          type: "POST",
          xhrFields: {
            responseType: "blob",
          },
          data: fd,
          processData: false,
          contentType: false,
          cache: false,
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IlJBSyIsInBhc3N3b3JkIjoiODI2MWU1OThjMzQ3MDllMTZmNDVmMzI3OWY5NGM2NzEifSwiaWF0IjoxNTc5NjE1NTY4fQ.Tbu8U32XToGCDvpmlpsEqu7vVOY_-S6-Qc1FheoEXH8"
            );
          },
          success: function (result) {
            // The actual download
            var blob = new Blob([result], {
              type: "application/pdf"
            });

            if (navigator.msSaveOrOpenBlob) {
              navigator.msSaveOrOpenBlob(blob, "Baladna_Annual_Report_2021_Customized.pdf");
            } else {
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = "Baladna_Annual_Report_2021_Customized.pdf";
              document.body.appendChild(link);
              link.click();
              link.remove();
            }

            console.log("came back merged");
            $(".alert").removeClass("d-block");
          },
          error: function (res) {
            console.log("error while mergin", res);
            $(".alert").removeClass("d-block");
          },
        });
      }
    });

    return false;
  });
  // download center checkboxes and stuff
  downloadCenter();

  // PAGE Loading done hide the loading screen
  // Pace.on("done", function () { // $(".loading .left,.loading .right").addClass("flip"); });


  $(".video-modal").on("shown.bs.modal", function (e) {
    $(".video-modal iframe").attr("src", $(e.relatedTarget).data("video-url"));
  });

  // Pause video when modal closes
  $(".video-modal").on("hidden.bs.modal", function (e) {
    $(".video-modal iframe").attr("src", "");
  });

  // Animate elements when they appear
  if ($(window).width() < 768) {
    $(".section h1").addClass("reveal");
  } else {
    var waypoints = $(
      ".arrows, .section h1, .section h3, .chair p, .director p, .cfo p, .leadership-title"
    ).waypoint({
      handler: function (dir) {
        if (dir === "down") {
          $(this[(0, "element")]).addClass("reveal");
        } else {
          $(this[(0, "element")]).removeClass("reveal");
        }
      },
      offset: "70%",
      // context: ".copy-body"
    });
  }
  if ($(window).width() < 768) {
    console.log('mobile');
    if ($(".graphs_container").length > 0) {
      populateCharts();
    }
  } else {
    var waypointsPillar = $(".graphs_container").waypoint({
      handler: function (dir) {
        if (dir === "down") {
          if ($(".graphs_container").length > 0) {
            populateCharts();
          }
        } else {
          if ($(window).width() > 992) {
            if ($(".graphs_container").length > 0) {
              destroyCharts();
            }
          }
        }
      },
      offset: "90%",
      // context: ".highlights",
    });
  }



  var $counters = $(".counter");
  /* Start counting, do this on DOM ready or with Waypoints. */
  $counters.each(function (ignore, counter) {
    new Waypoint({
      element: $(this),
      handler: function () {
        counterUp(counter, {
          // duration: 2000,
          // delay: 16
        });
        this.destroy();
      },
      offset: 'bottom-in-view',
    });
  });





  // UI Scroll to Sections
  if ($("[data-scrollto]").length) {
    $("[data-scrollto]").ui_scroll_to();
  }
});
/* 14 :: Scroll To Section */
$.fn.ui_scroll_to = function () {
  var link = $("[data-scrollto]");
  link.on("click", function (e) {
    e.preventDefault();
    var scroll_to = $(this).attr("data-scrollto");
    if ($("#" + scroll_to).length > 0 && scroll_to !== undefined) {
      var pos =
        $("#" + scroll_to).offset().top -
        ($(window).width() < breakPoint ? 72 : headerHeight);
      $("html, body").animate({
        scrollTop: pos,
      },
        500
      );
    }
  });
};

function downloadCenter() {
  var body = $("body");
  // toggle all sub checkboxes
  body.on("click", ".download-title input[type=checkbox]", function () {
    $("." + $(this).attr("class")).prop("checked", $(this).prop("checked"));
    isChapter = $(this).prop("checked");
  });

  //toggle the parent checkbox based on the selection of child checkboxes
  body.on("click", ".check-section input[type=checkbox]", function () {
    var block = $(this).closest(".download-section");
    var all_checked = false;

    block.find(".check-section input[type=checkbox]").each(function () {
      all_checked = $(this).prop("checked");
      if (!all_checked) return false;
    });
    isChapter = all_checked;

    block
      .find(".download-title input[type=checkbox]")
      .prop("checked", all_checked);

    $(this)
      .closest(".check-section")
      .find(".item-title")
      .toggleClass("active");
  });
}

function loadFile(i, name, lang) {
  lang = typeof lang === "undefined" ? "en" : lang;
  console.log(lang, "language is ");
  var url = "assets/img/pdfs/" + name;
  if (lang == "ar") {
    url = "assets/img/pdfs/ar/" + name;
  }
  jQuery.ajax({
    url: url,
    cache: false,
    // xhr: function () {
    //   // Seems like the only way to get access to the xhr object
    //   var xhr = new XMLHttpRequest();
    //   xhr.responseType = "blob";
    //   return xhr;
    // },
    xhrFields: {
      responseType: "blob",
    },
    beforeSend: function () {
      // totalReq++;
    },
    success: function (data) {
      console.log("idx", i, name);
      files[i] = data;
      totalReq--;
    },
    error: function (err) {
      totalReq--;

      console.log("error loading a file", err);
    },
  });
}


var mp = $(".load_svg");
mp.each(function (k, v) {
  $.get($(this).attr("src"), function (data) {
    v.replaceWith(data.documentElement);
  });
  setTimeout(() => {
    if ($(".operations_map .circle").length) {
      const op_tl = gsap.timeline();
      op_tl
        // .from(".operations_map .circle", { duration: 1, scale: 3, ease: "power2.in", stagger: 0.2 })
        // .delay(5)
        .fromTo(".operations_map .circle", 1, { scale: 1, opacity: 1 }, { opacity: 1, scale: 1.2, ease: "power4.inOur", transformOrigin: "center", repeat: -1, yoyo: true, stagger: .2 });
    }

    if ($(".assets_map svg").length) {

      gsap.fromTo(".assets_map .circles circle", .5, { scale: 1 }, { scale: 1.4, ease: "power4.inOur", transformOrigin: "center", repeat: -1, yoyo: true, stagger: .1 });
      assets_map()
    }

  }, 500);

});

// animations

const animationLeave = (container) => {
  var tl = gsap.timeline();
  return tl.to("nav", { duration: 1.8, scaleY: 5, transformOrigin: 'bottom left', stagger: .1 });
  // tl.to("nav", { duration: 0.8, ease: 'power3', opacity: 0});
}
// barba.init({
//   // sync: true,
//   views: [{
//     namespace: 'home',
//     beforeEnter() {
//     }
//   }],
//   transitions: [
//     // {
//     //   name: 'slider',
//     //   to: { namespace: 'home', },
//     //   once: ({ next }) => { console.log('once of slider'); sliderEnter(next.container); },
//     //   leave: ({ current }) => closePage(current.container),
//     //   // leave: ({ current }) => sliderLeave(current.container),
//     //   enter: ({ next }) => sliderEnter(next.container)
//     // },
//     // {
//     //   name: 'details',
//     //   to: { namespace: 'details', },
//     //   once: ({ next }) => { console.log('details page once'); openPage(); },
//     //   enter: ({ next }) => openPage(next.container),
//     //   // leave: ({ current }) => sliderLeave(current.container),
//     //   // leave: ({ current }) => { closePage(current.container); }
//     // },
//   ]
// })

