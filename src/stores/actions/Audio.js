import {
	AUDIO_SEPLAYER_PLAY,
} from "../mutations/Audio";

export function playSE (store, src) {
	store.commit({
		type: AUDIO_SEPLAYER_PLAY,
		src
	});
}
