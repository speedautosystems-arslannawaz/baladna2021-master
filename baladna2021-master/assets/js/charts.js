var graphs = new Array(10),

  revenues,
  ebitda,
  net_income,
  capex;

var graph_values = $(this).data("values");
var lang = $('html').attr('lang');
function populateCharts() {
  $(".graphs_container .graph").each(function (i, v) {
    const colors = ($(this).data("colors"));
    // console.log(colors);
    const data_values = [];
    console.log($(this), $(this).data("values"));

    graph_values = $(this).data("values");
    $(graph_values).each(function (i, v) {
      const obj = {
        value: v,
        itemStyle: {
          color: colors[i],
        },
      };
      data_values.push(obj);
    });
    var lable_append = $(this).data("append");
    var graph_data = {
      series: [
        {
          name: $(this).data("name"),
          data: data_values,
          label: {

            formatter: function (params) {
              var data = parseFloat(params.value);
              if (params['seriesName'] == 'Common Dividend Per Share' && params['name'] == "2020") {
                return data.toLocaleString() + lable_append + '²';
              } else {
                return data.toLocaleString() + lable_append;
              }
            },
          },
        },
      ],
    };
    graphs[i].setOption(graph_data);
  });
}

function destroyCharts() {
  var empty_data = {
    series: [{ data: [] }],
  };
  $(".graphs_container .graph").each(function (i, v) {
    graphs[i].setOption(empty_data);
  });
}

function initCharts() {
  if (lang == 'ar') {
    var option = {
      // title: {
      //   text: "Total Sales (SAR million)",
      // },
      tooltip: {
        borderWidth: 1,
        borderColor: "#efefef",
        backgroundColor: "#ffffff",
        align: "right",
        textStyle: {
          color: "#4B0F1E",
          fontSize: 14,
          // align: "right",
        },
      },
      grid: {
        top: 10,
        left: 50,
        right: 5,
        containLabel: true,
      },
      yAxis: {
        data: ["2021", "2020"],
        position: "right",
        axisLine: {
          show: false,
        },
        axisTick: false,
        axisLabel: {
          color: "#4B0F1E",
          fontSize: 18,
        },
      },
      xAxis: {
        type: "value",
        inverse: true,
        grid: { containLabel: true },
        show: false,
        // max: 13000,
        showGrid: false,
        // grid: { show: false },

        splitLine: {
          show: false,
        },
      },
      animationDuration: 1850,
      // animationEasingUpdate: "easeInOutExpo",
      // animationEasing: "elasticOut",
      animationEasing: "easeInOutExpo",
      animationDelayUpdate: function (idx) {
        return idx * 100;
      },
      series: [
        {
          type: "bar",
          color: "#4B0F1E",
          itemStyle: {
            color: "#4B0F1E",
            emphasis: {
              // barBorderRadius: [50, 50],
            },
            normal: {
              // barBorderRadius: [50, 50, 50, 50],
            },
          },
          label: {
            show: true,
            // position: [5, 3],
            position: "left",
            valueAnimation: true,
            textStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            color: "#4B0F1E",
            formatter: function (params) {
              var data = parseFloat(params.value);
              return data.toLocaleString();
            },
          },
          // roundCap: true,
          barWidth: 25,
        },
      ],
      height: "150",
      width: "75%",
    };
  } else {
    var option = {
      tooltip: {
        borderWidth: 1,
        borderColor: "#efefef",
        backgroundColor: "#ffffff",
        textStyle: {
          color: "#4B0F1E",
          fontSize: 14,
        },
      },
      grid: {
        top: 10,
        left: 5,
        right: 30,
        containLabel: true,
      },
      yAxis: {
        data: ["2021", "2020"],
        position: "left",
        axisLine: {
          show: false,
        },
        axisTick: false,
        axisLabel: {
          color: "#4B0F1E",
          fontSize: 18,
        },
      },
      xAxis: {
        type: "value",
        // grid: { show: true, containLabel: true, left: -100, right: 100 },
        show: false,
        // max: 65000,
        showGrid: false,
        splitLine: {
          show: false,
        },
      },
      animationDuration: 1850,
      // animationEasingUpdate: "easeInOutExpo",
      // animationEasing: "elasticOut",
      animationEasing: "easeInOutExpo",
      animationDelayUpdate: function (idx) {
        return idx * 100;
      },
      series: [
        {
          type: "bar",
          color: "#4B0F1E",
          itemStyle: {
            color: "#4B0F1E",
            emphasis: {
              // barBorderRadius: [50, 50],
            },
            normal: {
              // barBorderRadius: [50, 50, 50, 50],
            },
          },
          label: {
            show: true,
            position: "right",
            // offset: [10, 0],
            valueAnimation: true,
            textStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            color: "#4B0F1E",
            formatter: function (params) {
              var data = parseFloat(params.value);
              return data.toLocaleString();
            },
          },
          // roundCap: true,
          barWidth: 25,
        },
      ],
      height: "150",
      width: "80%",
    };
  }
  if ($(".graphs_container").length > 0) {
    $(".graphs_container .graph").each(function (i, v) {
      // if (graphs[i] == undefined) {
      graphs[i] = echarts.init(document.getElementById(this.id));
      graphs[i].setOption(option);
      // }
    });
  }
}
function initChartsWaypoint() {
  // if ($(window).width() < 768) {
  //   if ($(".graphs_container").length > 0) {
  //     populateCharts();
  //   }
  // } else {
  var waypointsCharts = $(".graphs_container").waypoint({
    handler: function (dir) {
      if (dir === "down") {
        if ($(".graphs_container").length > 0) {
          initCharts();
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
  // }
}
(function (window, undefined) {
  initCharts();
  window.onresize = function () {
    $(".graphs_container .graph").each(function (i, v) {
      graphs[i].resize();
    });
  };
})(window);

