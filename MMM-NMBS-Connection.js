Module.register("MMM-NMBS-Connection", {

	defaults: {
		from: "http://irail.be/stations/NMBS/008893120",
		humanizeDuration: true,
		initialLoadDelay: 1000, // 1 second delay
		language: "nl",
		results: 3,
		showStationNames: false,
		text: "Loading",
		to: "http://irail.be/stations/NMBS/008821196",
		updateInterval: 10 * 60 * 1000, // 10 * 60 * 1000 = every 10 minutes
		url: "https://api.irail.be/connections",
	},
	getScripts: function () {
		return ["moment.js"];
	},
	getStyles: function () {
		return ["MMM-NMBS-Connection.css", "font-awesome.css"];
	},
	getTranslations: function () {
		return {
			en: "translations/en.json",
			fr: "translations/fr.json",
			nl: "translations/nl.json",
		};
	},
	start: function () {
		Log.info("Starting module: " + this.name);

		this.loaded = false;
		this.forecast = this.config.text;
		this.updateTimer = null;
		this.scheduleUpdate(this.config.initialLoadDelay);
	},
	getDom: function () {
		let wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = this.forecast;
			wrapper.className = "MMM-NMBS-Connection dimmed light small";
			return wrapper;
		}

		wrapper = this.forecast;
		return wrapper;
	},
	updateTemp: function () {
		const self = this;
		const url = `${self.config.url}/?to=${self.config.to}&from=${self.config.from}&timeSel=depart&format=json&lang=${self.config.language}`;

		fetch(url, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Node.js) MagicMirror (https://github.com/MichMich/MagicMirror/)"
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				self.scheduleUpdate((self.loaded) ? -1 : self.config.updateInterval);

				return self.processConnections(json);
			})
			.catch(error => Log.error("Fetch Error =\n", error));
	},
	processConnections: function (data) {
		let table = document.createElement("table");
		table.className = "MMM-NMBS-Connection";
		let tHead = document.createElement("thead");
		let headerRow = document.createElement("tr");
		let headerDeparture = document.createElement("td");
		headerDeparture.innerHTML = this.translate("DEPARTURE");
		let headerLine = document.createElement("td");
		let headerArrival = document.createElement("td");
		headerArrival.innerHTML = this.translate("ARRIVAL");

		if (this.config.showStationNames && data && data.connection && data.connection[0]) {
			let departureStation = document.createElement("span");
			departureStation.className = "xsmall station-name";
			departureStation.innerHTML = data.connection[0].departure.station;
			headerDeparture.appendChild(departureStation);
		}

		if (this.config.showStationNames && data && data.connection && data.connection[0]) {
			let arrivalStation = document.createElement("span");
			arrivalStation.className = "xsmall station-name";
			arrivalStation.innerHTML = data.connection[0].arrival.station;
			headerArrival.appendChild(arrivalStation);
		}

		headerRow.appendChild(headerDeparture);
		headerRow.appendChild(headerLine);
		headerRow.appendChild(headerArrival);
		tHead.appendChild(headerRow);
		table.appendChild(tHead);

		let connections = data.connection;

		if (!Number.isFinite(this.config.results) || this.config.results > 6) {
			this.config.results = 6;
		}

		for (let i = 0; i < this.config.results; i++) {
			let connection = connections[i];
			let connectionRow = document.createElement("tr");
			let departureTime = document.createElement("td");
			departureTime.className = "title bright";
			if (parseInt(connection.departure.canceled, 10) > 0) {
				departureTime.className = "dimmed line-through";
			}
			departureTime.innerHTML = moment.unix(connection.departure.time).format("HH:mm");
			let departureDelay = document.createElement("span");
			departureDelay.className = "xsmall ontime";
			let delayMinutes = moment.utc(connection.departure.delay * 1000).format("m");
			departureDelay.innerHTML = ` +${delayMinutes}`;
			if (parseInt(delayMinutes, 10) > 0) {
				departureDelay.className = "xsmall delayed";
			}
			departureTime.appendChild(departureDelay);
			connectionRow.appendChild(departureTime);

			let line = document.createElement("td");
			line.className = "dimmed";
			let trainIcon = document.createElement("span");
			trainIcon.className = "fa fa-train";
			line.innerHTML = "&boxh;&boxh;&boxh;&boxh;&boxh;&boxh; ";
			connectionRow.appendChild(line);

			let arrivalTime = document.createElement("td");
			arrivalTime.className = "title bright";
			if (parseInt(connection.arrival.canceled, 10) > 0) {
				arrivalTime.className = "dimmed line-through";
			}
			arrivalTime.innerHTML = moment.unix(connection.arrival.time).format("HH:mm");
			let arrivalDelay = document.createElement("span");
			arrivalDelay.className = "xsmall ontime";
			let delayArrivalMinutes = moment.utc(connection.arrival.delay * 1000).format("m");
			arrivalDelay.innerHTML = ` +${delayArrivalMinutes}`;
			if (parseInt(delayArrivalMinutes, 10) > 0) {
				arrivalDelay.className = "xsmall delayed";
			}
			arrivalTime.appendChild(arrivalDelay);
			connectionRow.appendChild(arrivalTime);

			let infoRow = document.createElement("tr");
			let departurePlatform = document.createElement("td");
			departurePlatform.className = "xsmall";
			departurePlatform.innerHTML = `${this.translate("PLATFORM")} ${connection.departure.platform}`;
			infoRow.appendChild(departurePlatform);

			let emptyLine = document.createElement("td");
			infoRow.appendChild(emptyLine);

			let duration = document.createElement("td");
			let durationTime = moment.utc(connection.duration * 1000).format('HH:mm');
			if (this.config.humanizeDuration) {
				durationTime = moment.duration(connection.duration * 1000).humanize();
			}
			duration.className = "xsmall";
			duration.innerHTML = durationTime;

			if (connection.vias && parseInt(connection.vias.number, 10) > 0) {
				duration.innerHTML += `, ${connection.vias.number} ${this.translate("CHANGE")}`;
				line.innerHTML = "&boxh;&boxh; ";
				line.appendChild(trainIcon);
				line.innerHTML += " &boxh;&boxh; ";
			}

			infoRow.appendChild(duration);
			table.appendChild(connectionRow);
			table.appendChild(infoRow);
		}

		this.forecast = table;

		this.show(this.config.animationSpeed, { lockString: this.identifier });
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},
	scheduleUpdate: function (delay) {
		let nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		const self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function () {
			self.updateTemp();
		}, nextLoad);
	},

});