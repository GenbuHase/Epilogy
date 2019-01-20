## Dialogueオブジェクト


### 概要
Dialogueオブジェクトは、会話を`Msgbox`が読み取れる形式に変換されたものです。


### オブジェクト構造
```TypeScript
/* type = "message" の場合 */
{
	type: "message",
	value: String | Array<String>,
	label: Label
}

/* type = "prompt" の場合 */
{
	type: "prompt",
	value: Array<{ message: String, label: Label }>
}

/* type = "input" の場合 */
{
	type: "input",
	value: {
		title: String,
		label: {
			default: Label,
			[x: String]: Label
		}
	}
}

/* type = "fade-in" の場合 */
{
	type: "fade-in",
	value: Number | { color: String, duration: Number }
}

/* type = "fade-out" の場合 */
{
	type: "fade-out",
	value: Number
}



export type Label = {
	chapter?: Number,
	section?: Number,
	dialogue?: Number
}
```