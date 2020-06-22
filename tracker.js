var url = "https://api.covid19api.com/";
var total = document.getElementById("total");
var recovered = document.getElementById("recovered");
var dead = document.getElementById("dead");
var active = document.getElementById("active");
axios
  .get(url + "summary")
  .then((data) => {
    total.innerHTML = data.data.Global.TotalConfirmed;
    recovered.innerHTML = data.data.Global.TotalRecovered;
    dead.innerHTML = data.data.Global.TotalDeaths;
    active.innerHTML =
      data.data.Global.TotalConfirmed -
      data.data.Global.TotalRecovered -
      data.data.Global.TotalDeaths;

    x = "<option value='World'>World</option>";
    for (countries in data.data.Countries) {
      x =
        x +
        "<option value=" +
        data.data.Countries[countries].Country +
        ">" +
        data.data.Countries[countries].Country +
        "</option>";
    }
    document.getElementById("select-country").innerHTML = x;
  })
  .catch((err) => console.log(err));

function select() {
  var sel = document.getElementById("select-country").value;
  var obj;
  axios
    .get(url + "summary")
    .then((data) => {
      if (sel == "World") {
        obj = data.data.Global;
      } else {
        for (countries in data.data.Countries) {
          if (sel == data.data.Countries[countries].Country) {
            obj = data.data.Countries[countries];
            break;
          }
        }
      }

      total.innerHTML = obj.TotalConfirmed;
      recovered.innerHTML = obj.TotalRecovered;
      dead.innerHTML = obj.TotalDeaths;
      active.innerHTML =
        obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths;
    })
    .catch((err) => console.log(err));
}
