export class SEPlayer extends AudioContext {
	constructor () {
		super();

		this.audios = {};
	}

	load (src) {
		return new Promise((resolve, reject) => {
			if (this.audios[src]) resolve(this.audios[src]);

			const audio = new Audio(src);

			audio.addEventListener("loadstart", () => {
				this.audios[src] = audio;
				resolve(audio);
			});

			audio.addEventListener("error", err => reject(err));
		});
	}

	play (src) {
		this.load(src).then(audio => audio.play());
	}
}

export class BGMPlayer extends AudioContext {

}