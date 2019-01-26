export const AUDIO_SEPLAYER_PLAY = "AUDIO_SEPLAYER_PLAY";
export const AUDIO_BGMPLAYER_PLAY = "AUDIO_BGMPLAYER_PLAY";
export const AUDIO_BGMPLAYER_STOP = "AUDIO_BGMPLAYER_STOP";

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