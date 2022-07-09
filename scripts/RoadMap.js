class RoadMap {
  htmlContainer;
  stops;
  constructor(htmlContainer, stops) {
    this.htmlContainer = htmlContainer;
    this.stops = new Array();
    if (stops) {
      this.stops = stops.map((stop) => {
        let newStop = new Stop(stop.id, stop.name, stop.description, stop.expectedDate);
        newStop.subpoints = stop.subpoints.map(
          (subpoint) => new Subpoint(subpoint.id, subpoint.name, subpoint.description)
        );
        return newStop;
      });
    }
  }

  addStop() {
    this.stops.push(new Stop());
  }

  render() {
    for(let stop of this.stops) {
      let stopContainer = stop.getHTML();
      this.htmlContainer.appendChild(stopContainer);
    }
  }
}

class Stop {
  htmlContainer;
  subpoints;

  id;
  name;
  description;
  expectedDate;
  dateFormatter;
  constructor(id, name, description, expectedDate) {
    this.htmlContainer = document.createElement("div");
    this.htmlContainer.classList.add("stop");
    this.subpoints = new Array();
    this.id = id;
    this.name = name;
    this.description = description;
    this.expectedDate = expectedDate;
    this.dateFormatter = new Intl.DateTimeFormat("de-AT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    });
  }

  getHTML() {
    this.htmlContainer.innerHTML = `
      <div class="stop-name">
        <span>${this.name}</span>
      </div>
      <div class="stop-time">
        <span>${this.description}</span>
      </div>
      <div class="stop-expected-date">
        <span>${this.dateFormatter.format(this.expectedDate)}</span>
      </div>
      <div class="stop-subpoints">
        ${this.subpoints.map((subpoint) => subpoint.getHTML().outerHTML).join("")}
      </div>
    `;

    return this.htmlContainer;
  }
}

class Subpoint {
  htmlContainer;
  id;
  name;
  description;
  constructor(id, name, description) {
    this.htmlContainer = document.createElement("div");
    this.htmlContainer.classList.add("subpoint");

    this.description = description;
    this.name = name;
    this.id = id;
  }

  getHTML() {
    this.htmlContainer.innerHTML = `
      <div class="subpoint-name">
        <span>${this.name}</span>
      </div>
      <div class="subpoint-time">
        <span>${this.description}</span>
      </div>
    `;

    return this.htmlContainer;
  }
}
