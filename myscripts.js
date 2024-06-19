function oppdaterPoeng() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("besteKarakterMulig");
  var siste = document.getElementById("sistePoengSum");

  siste.innerHTML = slider.value;
  output.innerHTML = regnUtHøyestePoengMulig(slider.value) + "\n" + "Dette tilsvarer bokstavverdi: " + regnUtKarakterVerdi(regnUtHøyestePoengMulig(slider.value));


}

function regnUtKarakterVerdi(verdi) {

    if (verdi >= 92) return "A";
    if (verdi >= 77) return "B";
    if (verdi >= 58) return "C";
    if (verdi >= 46) return "D";
    if (verdi >= 40) return "E";
    return "F";

}

function regnUtHøyestePoengMulig(sistePoengSum) {
  if (oppnaddeKarakterer.length < 1 && !varslet) {
    alert("Husk å legge til oppnådd karakter fra midtveiseksamen!");
    varslet = true;
  }

  var totalVekting = 0;
  var totalSum = 0;

  oppnaddeKarakterer.forEach(myFunction);

  function myFunction(verdi) {
    totalSum += verdi.hentVektetKarakter();
    totalVekting += verdi.hentVekting();
  }

  var sistePoeng = new VektetKarakterer(sistePoengSum, 100 - totalVekting);
  return totalSum + sistePoeng.hentVektetKarakter();
}

function fjernKarakter() {
  if (oppnaddeKarakterer.length < 1) {
    alert(
      "Det finnes ingen karakterer å fjerne. Du må først bekrefte en poengsum!"
    );
  }

  var select = document.getElementById("lageVektetKarakter");
  select.removeChild(select.lastChild);

  oppnaddeKarakterer.pop();
  let list = document.getElementById("oversiktOverKarakterer");
  list.style.backgroundColor = "";

  skrivUtVektet();
}

function fjernKarakter() {
  if (oppnaddeKarakterer.length < 1) {
    alert(
      "Det finnes ingen karakterer å fjerne. Du må først bekrefte en poengsum!"
    );
  }

  var select = document.getElementById("lageVektetKarakter");
  select.removeChild(select.lastChild);

  oppnaddeKarakterer.pop();
  let list = document.getElementById("oversiktOverKarakterer");
  list.style.backgroundColor = "";

  skrivUtVektet();
}

function lagVektetKarakter() {
  var vekting = parseFloat(document.getElementById("vekting").value);
  var poeng = parseFloat(document.getElementById("poeng").value);

  if (
    vekting > 100 ||
    vekting < 0 ||
    poeng > 100 ||
    poeng < 0 ||
    isNaN(poeng)
  ) {
    alert("Poengsummen kan ikke være mindre enn 0 eller større enn 100!");
    return;
  }

  if (oppnaddeKarakterer.length > 0) {
    alert(
      "Du har allerede bekreftet din karakteren din for midtveiseksamen. For å endre må du fjerne karakteren først."
    );
    return;
  }

  var vk = new VektetKarakterer(poeng, vekting);
  oppnaddeKarakterer.push(vk);

  let knapp = document.createElement("button");
  knapp.onclick = fjernKarakter;
  knapp.type = "button";
  knapp.className = "btn btn-danger";
  knapp.textContent = "Fjern karakter";

  let buttonContainer = document.getElementById("lageVektetKarakter");
  buttonContainer.appendChild(knapp);

  skrivUtVektet();
}

function skrivUtVektet() {
  let list = document.getElementById("oversiktOverKarakterer");

  while (list.firstChild) {
    list.firstChild.remove();
  }

  if (oppnaddeKarakterer.length < 1) {
    return;
  }

  let karakter = oppnaddeKarakterer[0];
  let li = document.createElement("p");
  li.innerText = "Oppnådde poeng på midtveiseksamen: " + karakter.hentPoeng();
  list.appendChild(li);
  list.style.backgroundColor = "#fdb347CC";
  list.classList.add("rounded-lg");
}

class VektetKarakterer {
  constructor(poeng, vekting) {
    this.poeng = poeng;
    this.vekting = vekting;
  }

  hentVekting() {
    return this.vekting;
  }

  hentPoeng() {
    return this.poeng;
  }

  hentVektetKarakter() {
    return (this.poeng * this.vekting) / 100;
  }

  toString() {
    return "Poeng: " + this.poeng + ", vekting: " + this.vekting;
  }
}
