var activeDiv = "Home";
var sections = [
  "Home",
  "Glance",
  "YearReview",
  "Statements",
  "StrategicReview",
  "BusinessReview"
];
var totalReq = 0;
var downloadRequest = 0;
var selectedFilesCount = 0;
var files = new Object();
var isChapter = false;
$(document).ready(function () {
  AOS.init();

  $("#download_form").submit(function () {
    return false;
  });

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
          fd.append("pdfs", files[j]);
        }
        // if (isChapter) {
        //   for (var j = 1; j <= selectedFilesCount; j++) {
        //     fd.append("pdfs", files[j]);
        //   }
        // } else {
        //   for (var j = 0; j < selectedFilesCount; j++) {
        //     fd.append("pdfs", files[j]);
        //   }
        // }
        console.log(fd);

        // send files to merger
        jQuery.ajax({
          // url: "http://localhost:3000/merge",
          // url: "https://mergeit.lava-brands.com/merge?_=" + $.now(),
          url: "https://mergeit.lava-brands.com/merge",
          type: "POST",
          xhrFields: {
            responseType: "blob"
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
            var blob = new Blob([result], { type: "application/pdf" });
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "Merged.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            console.log("came back merged");
            $(".alert").removeClass("d-block");
          },
          error: function (res) {
            console.log(res);
            $(".alert").removeClass("d-block");
          }
        });
      }
    });

    return false;
  });

  ScrollInteractions();

  $(".navbar-nav>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
  $(".video-modal").on("hidden.bs.modal", function (e) {
    $(".video-modal iframe").attr("src", $(".video-modal iframe").attr("src"));
  });
  // laod Business model SVG
  // var bm = $("#bm");
  // if ($(window).width() > 992) {
  //   var bm_file = bm.attr("src");
  // } else {
  //   var bm_file = "images/business_model_mobile.svg";
  //   // close business model
  //   $(".close-bm").click(function(e) {
  //     $(".bm_copy > div, .bm_copy_right > div").removeClass("reveal");
  //     $(".close-bm").hide();
  //     return false;
  //   });
  // }
  // $.get(bm_file + "?_=" + $.now(), function(data) {
  //   bm.replaceWith(data.documentElement);

  //   $("body").on("mouseover", ".bm_circle", function() {
  //     $(".bm_copy > div, .bm_copy_right > div").removeClass("reveal");
  //     $($(this).data("target")).addClass("reveal");
  //     $(".close-bm").show();
  //   });
  // });

  // laod Graphs SVGs
  // var graph_imgs = $(".graphs img");
  // $.each(graph_imgs, function(k, graph_img) {
  //   var graph = $(graph_img);
  //   $.get($(graph).attr("src"), function(data) {
  //     graph.replaceWith(data.documentElement);
  //   });
  // });
  // laod Graphs SVGs
  // var circle = $(".item__circle img");
  // $.each(circle, function(k, graph_img) {
  //   var graph = $(graph_img);
  //   $.get($(graph).attr("src"), function(data) {
  //     graph.replaceWith(data.documentElement);
  //   });
  // });

  // page Loading
  Pace.on("done", function () {
    $(".loading").addClass("flyout");
    $(".intro").addClass("show");
    setTimeout(function () {
      $(".intro").addClass("seq2");
    }, 1000);

    setTimeout(function () {
      $(".main-nav").addClass("show");
      $(".main-bg,.line-left").addClass("show");
    }, 2500);
  });

  // sticky navigation on scroll
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll > $(window).height() - $(".navbar").height()) {
      $(".main-nav").addClass("fix-nav");
      $(".ceo-nav").addClass("fix-ceo-nav");
    } else {
      $(".main-nav").removeClass("fix-nav");
      $(".ceo-nav").removeClass("fix-ceo-nav");
    }
  });

  // click on main navigation or arrow navigtions at the bottom of page
  $(".main-nav a:not('.skip'), .arrow-nav a").click(function (e) {
    if ($(this).hasClass("active")) {
      return false;
    }
    var targetSection = $(this).data("target");
    activateSection(targetSection);

    e.stopPropagation();
  });
  $(".close_section").click(function () {
    $(".close_section").hide();
    activateSection("Home");
    slide_idx = 0;
  });

  $(".ceo-nav a").click(function (e) {
    e.stopPropagation();
    $(".ceo-contents").fadeOut();
    $(".ceo-nav a").removeClass("active");
    $("#" + $(this).data("target")).fadeIn();
    $(this).addClass("active");
  });

  $(".side-content").click(function (e) {
    if (
      $(e.target)
        .closest(".main-text-page")
        .find("a").length
    ) {
      console.log("its link");
      return true;
    }
    $(this)
      .find(".main-bg-page")
      .addClass("full-page");
    $("body").css("overflow-y", "auto");
    $("." + activeDiv + "-detail").slideDown("slow");
    var sec = [
      "Glance",
      "YearReview",
      "Statements",
      "StrategicReview",
      "BusinessReview"
    ];
    if (sec.includes(activeDiv)) {
      $(".close_section").show();
    }

    setTimeout(function () {
      var wrapper = $("body,html");
      var details = $("." + activeDiv + "-detail");
      if (details.length && $(window).scrollTop() < 30) {
        wrapper.animate({ scrollTop: details.offset().top }, 1500);
      }
    }, 1500);

    waypoints();

    // $.fn.fullpage.setMouseWheelScrolling(false);
    // $.fn.fullpage.setAllowScrolling(false);
  });

  // START of download center hooks
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

    // return false;
  });
  //END of Download center

  // // year review animation
  // var svgNS = "http://www.w3.org/2000/svg";
  // var svgEl = document.createElementNS(svgNS, "svg");
  // var pathEl = document.createElementNS(svgNS, "path");

  // pathEl.setAttribute(
  //   "d",
  //   getSinPath({ curves: 8 })
  //   // "M0.4,17.7c0,0,97.8-47.3,171,17.3s91,86.6,201.2,73.8c162.2-17.5,181.7,124.9,326.7,126.5 c145.3,1.7,226.2-148.5,405.5-128.5c92.2,10.3,168.5,95.4,241.3,84.8s172.9-132.6,291.2-46.9s187.2,95.2,283.1,47.1"
  // );
  // pathEl.setAttribute("class", "path-slider__path");

  // svgEl.appendChild(pathEl);
  // $(".review-container").append(svgEl);

  // var options = {
  //   startLength: "center",
  //   paddingSeparation: 180,
  //   // duration: 2000, // animation duration (used by anime.js)
  //   // stagger: 0, // incrementally delays among items, producing an staggering effect
  //   // easing: "easeOutElastic", // easing function (used by anime.js)
  //   // easing: "easeOutCubic",
  //   elasticity: 100, // elasticity factor (used by anime.js)

  //   begin: function(params) {
  //     // if (params.selected) {
  //     // setImage(params.index);
  //     // }
  //   }
  // };

  // var slider = new PathSlider(pathEl, ".path-slider__item", options);

  // // Regenerate the SVG `path` and update items position on `resize` event (responsive behavior)
  // window.addEventListener("resize", function() {
  //   pathEl.setAttribute("d", getSinPath({ curves: 8 }));
  //   slider.updatePositions();
  // });


  var mp = $(".load_svg");
  mp.each(function (k, v) {
    $.get($(this).attr("src"), function (data) {
      v.replaceWith(data.documentElement);
    });

    setTimeout(() => {
      if ($(".timeling-svg").length) {
        $(
          ".strategy-svg .icon, .strategy-svg .lines, .strategy-svg .point"
        ).waypoint({
          handler: function (dir) {
            var el = $(this[(0, "element")]);
            if (dir === "down") {
              el.addClass("show");
            } else {
              el.removeClass("show");
            }
          },
          offset: "80%",
        });
      }
    }, 500);

  });

  // Activate bezierCanvas plugin on a #bg-canvas element
  // $("#bg-canvas").bezierCanvas({
  //   maxStyles: 1,
  //   maxLines: 20,
  //   lineSpacing: 0.07,
  //   spacingVariation: 0.08,
  //   colorBase: {
  //     r: 0,
  //     g: 255,
  //     b: 255
  //   },
  //   colorVariation: {
  //     r: 0,
  //     g: 196,
  //     b: 255
  //   },
  //   moveCenterX: 0,
  //   moveCenterY: 0,
  //   delayVariation: 3,
  //   globalAlpha: 0.4,
  //   globalSpeed: 100
  // });
});
function loadFile(i, name, lang) {
  lang = typeof lang === "undefined" ? "en" : lang;

  var url = "images/pdfs/" + name;
  if (lang == "ar") {
    url = "images/pdfs/ar/" + name;
  }
  jQuery.ajax({
    url: url,
    cache: false,
    xhr: function () {
      // Seems like the only way to get access to the xhr object
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      return xhr;
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

      console.log(err);
    }
  });
}
function activateSection(targetSection) {
  if ($(".main-bg-page").hasClass("full-page")) {
    $(".main-bg-page").removeClass("full-page");
    $("#" + targetSection)
      .find(".main-bg-page")
      .addClass("full-page");

    $("body").css("overflow-y", "auto");
    $("." + targetSection + "-detail").slideDown("slow");

    setTimeout(function () {
      var wrapper = $("body,html");
      var details = $("." + targetSection + "-detail");
      if (details.length && $(window).scrollTop() < 30) {
        wrapper.animate({ scrollTop: details.offset().top }, 1500);
      }
    }, 1500);
  } else {
    $(".main-bg-page").removeClass("full-page");
    $("body").css("overflow-y", "hidden");
  }

  $(".ceo-nav").removeClass("fix-ceo-nav");
  $("." + activeDiv + "-detail").fadeOut();
  $("#" + activeDiv).addClass("hidethis");
  $("#" + activeDiv).fadeOut(700, function () {
    $(".main-nav").removeClass("fix-nav");
    $("#" + targetSection).fadeIn(750);
    $("#" + targetSection)
      .delay(700)
      .removeClass("hidethis");
    // $(".right-side-line").css("height", "81vh");
    $(".main-nav").addClass("show");
  });
  $(".main-nav").removeClass("show");
  $(".main-nav a").removeClass("active");
  $('.nav-item[data-target="' + targetSection + '"]').addClass("active");
  // $(".right-side-line").css("height", "0vh");

  activeDiv = targetSection;
}

function ScrollInteractions() {
  var scrolling = 0;
  var slide_idx = 0;
  var total_sections = 5;

  document.addEventListener;
  var ts;
  $(document).bind("touchstart", function (e) {
    ts = e.originalEvent.touches[0].clientY;
  });

  $(document).bind("touchend", function (e) {
    if (!$(".main-bg-page").hasClass("full-page")) {
      var te = e.originalEvent.changedTouches[0].clientY;
      if (scrolling) return false;

      if (ts > te + 5) {
        if (slide_idx < total_sections) {
          slide_idx++;
          var targetSection = sections[slide_idx];
          activateSection(targetSection);
        }
      } else if (ts < te - 5) {
        if (slide_idx > 0) {
          slide_idx--;
          sections;
          var targetSection = sections[slide_idx];
          activateSection(targetSection);
        }
      }
      scrolling = true;
      // wait to prevent unnecessary scroll (better UX)
      window.setTimeout(function () {
        scrolling = false;
      }, 1500);
    }
  });
  $("body").on(
    "mousewheel DOMMouseScroll wheel touchstart",
    "#sections-container",
    function (e) {
      // video_skipped
      if ($(".main-bg-page").hasClass("full-page")) {
        // $("html, body")
        //   .stop()
        //   .animate(
        //     {
        //       scrollTop: $(".projects").offset().top
        //     },
        //     1500,
        //     "easeInOutExpo"
        //   );
        // $("body").css("overflow", "auto");
        // page_section = 0;
      } else {
        if ($(window).width() > 991) {
          // already in scrolling state don't take any action
          if (scrolling) return false;

          //check the direction of scroll
          if (e.originalEvent.deltaY < 0) {
            if (slide_idx > 0) {
              slide_idx--;
              sections;
              var targetSection = sections[slide_idx];
              activateSection(targetSection);
            }
          } else {
            if (slide_idx < total_sections) {
              slide_idx++;
              var targetSection = sections[slide_idx];
              activateSection(targetSection);
            }
          }

          scrolling = true;
          // wait to prevent unnecessary scroll (better UX)
          window.setTimeout(function () {
            scrolling = false;
          }, 1500);

          return false;
        }
      }
    }
  );
}

function waypoints() {
  // Animate elements when they appear
  var waypoints = $(".graphs-bars").waypoint({
    handler: function (dir) {
      var el = $(this[(0, "element")]);

      if (dir === "down") {
        el.find(".bar20").addClass("animate");
        el.find(".values, #Line").addClass("show");
      } else {
        el.find(".bar20").removeClass("animate");
        el.find(".values, #Line").removeClass("show");

      }
    },
    offset: "50%"
    // context: ".copy-body"
  });

  var highlights = $(".highlights-container").waypoint({
    handler: function (dir) {
      if (dir === "down") {
        $(".highlight").addClass("reveal");
      } else {
        $(".highlight").removeClass("reveal");
      }
    },
    offset: "60%"
    // context: ".copy-body"
  });
  var revBox = $(".rev-box").waypoint({
    handler: function (dir) {
      if (dir === "down") {
        $(".rev-box").addClass("reveal");
      } else {
        $(".rev-box").removeClass("reveal");
      }
    },
    offset: "60%"
    // context: ".copy-body"
  });

  var gainContainer = $(".gain-container").waypoint({
    handler: function (dir) {
      if (dir === "down") {
        $(".gain-container")
          .find("h1")
          .addClass("show");
      } else {
        $(".gain-container")
          .find("h1")
          .removeClass("show");
      }
    },
    offset: "60%"
  });
  var gainContainer = $(".timeline-svg").waypoint({
    handler: function (dir) {
      var el = $(this[(0, "element")]);

      if (dir === "down") {
        el.find("#Blue_line, #Icons .icon, #Text g").addClass("show");
      } else {
        el.find("#Blue_line, #Icons .icon, #Text g").removeClass("show");
      }
    },
    offset: "60%"
  });
  var gainContainer = $(".key-drivers .driver, .pillar-box, .strategy-img, .value").waypoint({
    handler: function (dir) {
      var el = $(this[(0, "element")]);

      if (dir === "down") {
        el.addClass("show");
      } else {
        el.removeClass("show");
      }
    },
    offset: "80%"
  });
  var gainContainer = $(".theme p, .theme h2, .theme img, .box, .inputs, .g-animation").waypoint({
    handler: function (dir) {
      var el = $(this[(0, "element")]);

      if (dir === "down") {
        el.addClass("show");
      } else {
        el.removeClass("show");
      }
    },
    offset: "80%"
  });

  var gainContainer = $(".purpose-container").waypoint({
    handler: function (dir) {
      if (dir === "down") {
        $(".purpose-container > div").addClass("show");
      } else {
        $(".purpose-container > div").removeClass("show");
      }
    },
    offset: "80%"
  });
}
