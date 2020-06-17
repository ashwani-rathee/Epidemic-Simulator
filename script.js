// code for layer1 chart initiation

var obj = calculate(0.5, 0.05, 50000000);
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
        borderColor: "rgb(235, 89, 52)",
        data: obj.Infected,
      },
      {
        label: "Recovered",
        borderColor: "rgb(143, 235, 52)",
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

// code for layer2 chart initiation
// b, g, m, n, a
var layer2obj = calculateSEIR(0.5, 0.05, 0.002, 100000, 0.05);
var layer2ctx = document.getElementById("chart2");
//ctx.clientHeight(700);
var chart2 = new Chart(layer2ctx, {
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
        data: layer2obj.Suseptible,
      },
      {
        label: "Infected",
        borderColor: "rgb(235, 89, 52)",
        data: layer2obj.Infected,
      },
      {
        label: "Recovered",
        borderColor: "rgb(143, 235, 52)",
        data: layer2obj.Recovered,
      },
      {
        label: "Exposed",
        borderColor: "black",
        data: layer2obj.Exposed,
      },
      {
        label: "Dead",
        borderColor: "orange",
        data: layer2obj.Dead,
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

// layer1 sliders

sliderBetalayer1 = document.getElementById("beta");
sliderGammalayer1 = document.getElementById("gamma");
sliderPopulationlayer1 = document.getElementById("totalPop");
layer1Population = document.getElementById("layer1-population");
layer1InfectionRate = document.getElementById("layer1-infectionrate");
layer1RecoveryRate = document.getElementById("layer1-recoveryrate");
layer1InfectionRate.innerHTML = sliderBetalayer1.value / 100;
layer1RecoveryRate.innerHTML = sliderGammalayer1.value / 1000;
layer1Population.innerHTML = sliderPopulationlayer1.value * 1000000;
sliderBetalayer1.addEventListener("input", function () {
  layer1InfectionRate.innerHTML = sliderBetalayer1.value / 100;
  var obj = calculate(
    sliderBetalayer1.value / 100,
    sliderGammalayer1.value / 1000,
    sliderPopulationlayer1.value * 100000
  );
  updateChart1(obj, chart1);
});

sliderGammalayer1.addEventListener("input", function () {
  layer1RecoveryRate.innerHTML = sliderGammalayer1.value / 1000;
  var obj = calculate(
    sliderBetalayer1.value / 100,
    sliderGammalayer1.value / 1000,
    sliderPopulationlayer1.value * 1000000
  );
  updateChart1(obj, chart1);
});

sliderPopulationlayer1.addEventListener("input", function () {
  layer1Population.innerHTML = sliderPopulationlayer1.value * 1000000;
  obj = calculate(
    sliderBetalayer1.value / 100,
    sliderGammalayer1.value / 1000,
    sliderPopulationlayer1.value * 100000
  );
  updateChart1(obj, chart1);
});

// layer1 functions

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

// layer2 sliders

sliderBetalayer2 = document.getElementById("layer2beta");
sliderGammalayer2 = document.getElementById("layer2gamma");
sliderMuelayer2 = document.getElementById("layer2mue");
slideralphalayer2 = document.getElementById("layer2alpha");
layer2Exposure = document.getElementById("layer2-exposure");
layer2Recovery = document.getElementById("layer2-recovery");
layer2Death = document.getElementById("layer2-death");
layer2Infection = document.getElementById("layer2-infection");
layer2Exposure.innerHTML = sliderBetalayer2.value / 100;
layer2Recovery.innerHTML = sliderGammalayer1.value / 1000;
layer2Death.innerHTML = sliderMuelayer2.value / 10000;
layer2Infection.innerHTML = slideralphalayer2.value / 1000;

sliderBetalayer2.addEventListener("input", function () {
  layer2Exposure.innerHTML = sliderBetalayer2.value / 100;
  layer2obj = calculateSEIR(
    sliderBetalayer2.value / 100,
    sliderGammalayer2.value / 1000,
    sliderMuelayer2.value / 10000,
    100000,
    slideralphalayer2.value / 1000
  );
  updateChart2(layer2obj, chart2);
});

sliderGammalayer2.addEventListener("input", function () {
  layer2Recovery.innerHTML = sliderGammalayer2.value / 1000;
  layer2obj = calculateSEIR(
    sliderBetalayer2.value / 100,
    sliderGammalayer2.value / 1000,
    sliderMuelayer2.value / 10000,
    100000,
    slideralphalayer2.value / 1000
  );
  updateChart2(layer2obj, chart2);
});

sliderMuelayer2.addEventListener("input", function () {
  layer2Death.innerHTML = sliderMuelayer2.value / 10000;
  layer2obj = calculateSEIR(
    sliderBetalayer2.value / 100,
    sliderGammalayer2.value / 1000,
    sliderMuelayer2.value / 10000,
    100000,
    slideralphalayer2.value / 1000
  );
  updateChart2(layer2obj, chart2);
});

slideralphalayer2.addEventListener("input", function () {
  layer2Infection.innerHTML = slideralphalayer2.value / 1000;
  layer2obj = calculateSEIR(
    sliderBetalayer2.value / 100,
    sliderGammalayer2.value / 1000,
    sliderMuelayer2.value / 10000,
    100000,
    slideralphalayer2.value / 1000
  );
  updateChart2(layer2obj, chart2);
});

// layer2 functions

function calculateSEIR(b, g, m, n, a) {
  var sus = [];
  var inf = [];
  var rec = [];
  var exp = [];
  var dead = [];
  var io, so, ro, eo, deo, i, s, r, e, de;
  so = n;
  io = 1;
  ro = 0;
  eo = 4;
  deo = 0;
  sus.push(so);
  inf.push(io);
  rec.push(ro);
  exp.push(eo);
  dead.push(deo);
  for (var k = 0; k < 27; k++) {
    for (var j = 0; j < 10; j++) {
      s = so - (b * io * so) / n - m * so;
      e = eo + (b * io * so) / n - (m + a) * eo;
      i = io + a * eo - (g + m) * io;
      r = ro + g * io - m * ro;
      de = deo + m * so + m * eo + m * io + m * ro;
      so = s;
      io = i;
      ro = r;
      eo = e;
      deo = de;
    }
    sus.push(so);
    inf.push(io);
    rec.push(ro);
    exp.push(eo);
    dead.push(deo);
  }
  return {
    Suseptible: sus,
    Infected: inf,
    Recovered: rec,
    Exposed: exp,
    Dead: dead,
  };
}

function updateChart2(obj, chart) {
  chart.data["datasets"][0]["data"] = obj.Suseptible;
  chart.data["datasets"][1]["data"] = obj.Infected;
  chart.data["datasets"][2]["data"] = obj.Recovered;
  chart.data["datasets"][3]["data"] = obj.Exposed;
  chart.data["datasets"][4]["data"] = obj.Dead;
  chart.update();
}
