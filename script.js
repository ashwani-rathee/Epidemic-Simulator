var ctx = document.getElementById("chart1");
//ctx.clientHeight(700);
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",
  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        borderColor: "#3e95cd",
        data: [0, 10, 5, 2, 20, 30, 45],
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
