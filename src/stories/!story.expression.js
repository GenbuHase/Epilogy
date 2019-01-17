/**
 * テスト
 */
"テスト",

/**
 * 〇〇
 * 「テストメッセージ」
 */
[
	"〇〇",
	"テストメッセージ"
],

/**
 * 〇〇
 * 「非省略記法メッセージボックス」
 */
{
	"type": "message",
	"value": [
		"〇〇",
		"「非省略記法メッセージボックス」"
	]
},

/**
 * ▶ 選択肢1
 * ▶ 選択肢2
 * ▶ 選択肢3
 */
{
	"type": "prompt",
	"value": [
		"選択肢1",
		"選択肢2",
		"選択肢3"
	]
},

/**
 * メッセージ + プロンプトです
 * ▶ 1
 * ▶ 2
 * ▶ 3
 */
[
	"メッセージ + プロンプトです",
	{
		"type": "prompt",
		"value": [
			"1",
			"2",
			"3"
		]
	}
],

/**
 * 非省略記法です
 * ▶ 1
 */
{
	"type": "message",
	"value": [
		"非省略記法です",
		{
			"type": "prompt",
			"value": ["1"]
		}
	]
},

{
	"type": "message",
	"value": [
		"〇〇",
		"「2章へ移動します」"
	],

	"label": { "chapter": 2 }
},

{
	"type": "message",
	"value": [
		"〇〇",
		"「2節へ移動します」"
	],

	"label": { "section": 2 }
},

{
	"type": "message",
	"value": [
		"〇〇",
		"「2章2節へ移動します」"
	],

	"label": { "chapter": 2, "section": 2 }
},

/* 省略記法 */
{
	"type": "prompt",
	"value": [
		["2章へ", { "chapter": 2 }],
		["3節へ", { "section": 3 }],
		["2章3節へ", { "chapter": 2, "section": 3 }],
		["8メッセージ目へ", { "dialogue": 8 }]
	]
},

/* 非省略記法 */
{
	"type": "prompt",
	"value": [
		{ "message": "2章へ", "label": { "chapter": 2 } },
		{ "message": "3節へ", "label": { "section": 3 } },
		{ "message": "2章3節へ", "label": { "chapter": 2, "section": 3 } },
		{ "message": "8メッセージ目へ", "label": { "dialogue": 8 } }
	]
}