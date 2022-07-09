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
    let roadmapwrapper = document.createElement("div");
    roadmapwrapper.classList.add("roadmap__wrapper");
    // for(let stop of this.stops) {
    //   let stopContainer = stop.getHTML();
    //   roadmapwrapper.appendChild(stopContainer);
    // }
    for(let i = 0; i < this.stops.length; i++) {
      let stopContainer = this.stops[i].getHTML();
      if(i % 2 != 0) {
        let emptyContainer = document.createElement("div");
        emptyContainer.classList.add("roadmap__empty-container");
        roadmapwrapper.appendChild(emptyContainer);
        roadmapwrapper.appendChild(emptyContainer.cloneNode(true));

        stopContainer.classList.add("right");
      }
      roadmapwrapper.appendChild(stopContainer);
    }
    this.htmlContainer.appendChild(roadmapwrapper);
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
      <div class="stop__name">
        <span>${this.name}</span>
      </div>
      <div class="stop__description">
        <span>${this.description}</span>
      </div>
      <div class="stop__expected-date">
        <span>${this.dateFormatter.format(this.expectedDate)}</span>
      </div>
      <div class="stop__subpoints">
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
      <div class="subpoint__name">
        <span>${this.name}</span>
      </div>
      <div class="subpoint__description">
        <span>${this.description}</span>
      </div>
    `;

    return this.htmlContainer;
  }
}
