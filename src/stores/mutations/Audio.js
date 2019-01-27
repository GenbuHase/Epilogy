export const PREFIX = "Audio/";
export const AUDIO_SEPLAYER_PLAY = "SEPLAYER_PLAY";
export const AUDIO_BGMPLAYER_PLAY = "BGMPLAYER_PLAY";
export const AUDIO_BGMPLAYER_STOP = "BGMPLAYER_STOP";

export default {
	[AUDIO_SEPLAYER_PLAY] (state, payload) {
		if (!payload.src) return;
		state.sePlayer.play(payload.src);
	},

	[AUDIO_BGMPLAYER_PLAY] (state, payload) {
		if (!payload.src) return;
		state.bgmPlayer.play(payload.src);
	}
}