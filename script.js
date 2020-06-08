var obj = calculate(0.5, 0.2, 100000);
var ctx = document.getElementById("chart1");
//ctx.clientHeight(700);
var chart1 = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",
  // The data for our dataset
  data: {
    labels: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "60",
      "65",
      "70",
      "75",
      "80",
      "85",
      "90",
      "95",
      "100",
      "105",
      "110",
      "115",
      "120",
      "125",
      "130",
    ],
    datasets: [
      {
        label: "Suseptible",
        borderColor: "#3e95cd",
        data: obj.Suseptible,
      },
      {
        label: "Infected",
        borderColor: "red",
        data: obj.Infected,
      },
      {
        label: "Recovered",
        borderColor: "green",
        data: obj.Recovered,
      },
    ],
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
            },
          },
        ],
      },
    },
  },
});

sliderBeta = document.getElementById("beta");
sliderGamma = document.getElementById("gamma");
sliderPopulation = document.getElementById("totalPop");
sliderBeta.addEventListener("input", function () {
  var obj = calculate(
    sliderBeta.value / 100,
    sliderGamma.value / 1000,
    sliderPopulation.value * 100000
  );
  updateChart1(obj, chart1);
});

sliderGamma.addEventListener("input", function () {
  var obj = calculate(
    sliderBeta.value / 100,
    sliderGamma.value / 1000,
    sliderPopulation.value * 100000
  );
  updateChart1(obj, chart1);
});

sliderPopulation.addEventListener("input", function () {
  var obj = calculate(
    sliderBeta.value / 100,
    sliderGamma.value / 1000,
    sliderPopulation.value * 100000
  );
  updateChart1(obj, chart1);
});

function calculate(b, y, n) {
  var sus = [];
  var inf = [];
  var rec = [];
  var io, so, ro, i, s, r;
  io = 2;
  so = n;
  ro = 0;
  //  0 - 1
  //  0 - 0.1
  sus.push(so);
  inf.push(io);
  rec.push(ro);
  for (var k = 0; k < 27; k++) {
    for (var j = 0; j < 5; j++) {
      s = so - (b * io * so) / n;
      i = io + (b * io * so) / n - y * io;
      r = ro + y * io;
      so = s;
      io = i;
      ro = r;
    }
    sus.push(so);
    inf.push(io);
    rec.push(ro);
  }
  return {
    Suseptible: sus,
    Infected: inf,
    Recovered: rec,
  };
}

function updateChart1(obj, chart) {
  chart.data["datasets"][0]["data"] = obj.Suseptible;
  chart.data["datasets"][1]["data"] = obj.Infected;
  chart.data["datasets"][2]["data"] = obj.Recovered;
  chart.update();
}
