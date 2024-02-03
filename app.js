class ToDo {
	constructor() {
		this.addInput = document.querySelector(".search input");
		this.addButton = document.querySelector(".search button");
		this.list = document.querySelector("ul");
	}

	uid() {
		return Math.random().toString(32).slice(2);
	}

	setDefaultLS() {
		if (!JSON.parse(localStorage.getItem("list"))) {
			localStorage.setItem("list", "[]");
		}
	}

	listItemHTML(list) {
		list.forEach((listItem) => {
			this.list.insertAdjacentHTML(
				"beforeend",
				`
					<li data-id="${listItem.id}">
						<input type="text" value="${listItem.itemName}" />
						<img class="remove" src="./images/remove.png" alt="remove" />
					</li>
				`
			);
		});
	}

	showDefaultList() {
		const list = JSON.parse(localStorage.getItem("list"));
		this.listItemHTML(list);
	}

	setItem(item, list) {
		list.push(item);
		localStorage.setItem("list", JSON.stringify(list));
	}

	addItemToStorage() {
		this.addButton.addEventListener("click", () => {
			if (this.addInput.value.trim() !== "") {
				const list = JSON.parse(localStorage.getItem("list"));
				const item = {
					id: this.uid(),
					itemName: this.addInput.value.trim(),
				};

				this.setItem(item, list);
				this.addInput.value = "";
				this.updateList(list);
			}
		});
	}

	updateList(list) {
		this.list.innerHTML = "";
		this.listItemHTML(list);
	}

	removeItem() {
		this.list.addEventListener("click", (e) => {
			if (e.target.tagName === "IMG" && e.target.classList.contains("remove")) {
				const list = JSON.parse(localStorage.getItem("list"));
				const dataID = e.target.closest("li").getAttribute("data-id");
				const data = list.filter((item) => item.id != dataID);

				localStorage.setItem("list", JSON.stringify(data));

				e.target.closest("li").classList.add("removing");

				setTimeout(() => {
					e.target.closest("li").remove();
				}, 500);
			}
		});
	}

	editItem() {
		this.list.addEventListener("keyup", (e) => {
			const dataId = e.target.closest("li").getAttribute("data-id");
			const list = JSON.parse(localStorage.getItem("list"));

			list.map((item) => {
				if (item.id === dataId) {
					item.itemName = e.target.value;
				}
			});

			localStorage.setItem("list", JSON.stringify(list));
		});
	}

	init() {
		this.setDefaultLS();
		this.showDefaultList();
		this.addItemToStorage();
		this.removeItem();
		this.editItem();
	}
}

const todo = new ToDo();
todo.init();
