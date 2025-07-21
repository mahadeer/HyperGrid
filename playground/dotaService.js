// https://api.opendota.com/api/heroes

function getDotaHeroes() {
  return fetch("https://api.opendota.com/api/heroes")
    .then((response) => response.json())
    .then((data) => data);
}

window.onload = function () {
  const dotaHeroTable = document.getElementById("dotaHeroTable");
  getDotaHeroes().then((data) => {
    dotaHeroTable.config = {};
    dotaHeroTable.data = data;
  });
}

