Module.register("mmm-nmbs-connection", {

	defaults: {
		initialLoadDelay: 1000, // 1 second delay
		text: "Loading",
		from: "http://irail.be/stations/NMBS/008893120",
		to: "http://irail.be/stations/NMBS/008821196",
		language: "nl",
		url: "https://api.irail.be/connections",
		results: 3,
		updateInterval: 10 * 60 * 1000, // 10 * 60 * 1000 = every 10 minutes
	},
	getScripts: function() {
		return ["moment.js"];
	},
	getStyles: function() {
		return ["mmm-nmbs-connection.css"];
	},
	getTranslations: function() {
		return {
			en: "translations/en.json",
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
			wrapper.className = "mmm-nmbs-connection dimmed light small";
			return wrapper;
		}

		wrapper = this.forecast;
		return wrapper;
	},
	updateTemp: function () {
		const self = this;
		const url = `${self.config.url}/?to=${self.config.to}&from=${self.config.from}&timeSel=depart&format=json&lang=${self.config.language}`;

		fetch(url, {headers: {
			"User-Agent": "Mozilla/5.0 (Node.js) MagicMirror (https://github.com/MichMich/MagicMirror/)"
		}})
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
		const wrapper = document.createElement("div");
		let connectionList = `<table class="normal small light"><thead><tr><td>${this.translate("DEPARTURE")}</td><td></td><td>${this.translate("ARRIVAL")}</td></tr></thead><tbody>`;
		let connections = data.connection;

		if (!Number.isFinite(this.config.results) || this.config.results > 6) {
			this.config.results = 6;
		}

		for (let i = 0; i < this.config.results; i++) {
			let connection = connections[i];
			connectionList+= `<tr><td class="title bright">${moment.unix(connection.departure.time).format("HH:mm")} <span class=\"xsmall ontime\">+${connection.departure.delay}</span></td><td> ---> </td><td>${moment.unix(connection.arrival.time).format("HH:mm")} <span class=\"xsmall ontime\">+${connection.arrival.delay}</span> </td></tr>`
			connectionList+= `<tr><td class="xsmall">${this.translate("PLATFORM")} ${connection.departure.platform} </td><td></td><td class="xsmall">${this.translate("PLATFORM")} ${connection.arrival.platform}</td></tr>`
		}

		connectionList+= "</tbody></table>";
		wrapper.innerHTML = connectionList;

		this.forecast = wrapper;

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