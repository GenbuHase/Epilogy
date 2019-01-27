# 終学旅行 ―― Epilogy｜MenuLayoutオブジェクト


## 概要
MenuLayoutオブジェクトは、`MenuPanel`の配置を指定するための形式です。<Br />
サイズ等は全てパーセント(%)単位で取り扱われます。


## オブジェクト構造
```TypeScript
export type MenuLayout = {
	id: MenuID,

	left: Percentage,
	right: Percentage,
	top: Percentage,
	bottom: Percentage,

	items: Array<MenuItem>,
	hasBackButton: Boolean
}

export type MenuItem = MenuPagination;

export type MenuPagination = {
	type: "pagination",
	value: {
		message: String,
		to: MenuID,

		disabled: Boolean
	}
}



export type MenuID = String;

/** 0-100でパーセント指定 */
export type Percentage = String;
```