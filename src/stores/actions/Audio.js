import {
	PREFIX,
	AUDIO_SEPLAYER_PLAY,
} from "../mutations/Audio";

export function playSE (store, src) {
	store.commit({
		type: PREFIX + AUDIO_SEPLAYER_PLAY,
		src
	});
}
