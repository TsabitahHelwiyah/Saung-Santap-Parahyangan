document.addEventListener('DOMContentLoaded', async () => {
	fetch('http://localhost:3001/api/v1/carts')
		.then((res) => res.json())
		.then((data) => {
			const cartContainer = document.querySelector('.table__body');
			renderCart(cartContainer, data.items);
		})
		.catch((err) => {
			console.log(err);
		});

	const table = document.querySelector('table');
	const parent = table.parentNode;

	const clear = document.querySelector('#clear');
	clear.addEventListener('click', (event) => {
		const errors = document.querySelectorAll('.form__error');
		errors?.forEach((error) => error.remove());

		fetch('http://localhost:3001/api/v1/carts/clear')
			.then((res) => {
				if (res.ok) window.location.href = '/cart.html';
				return res.json();
			})
			.then((data) => {
				const node = document.createElement('p');
				node.classList.add('form__error');
				node.innerText = data.message;
				parent.insertBefore(node, table.nextSibling);
			});
	});

	const checkout = document.querySelector('#checkout');
	checkout.addEventListener('click', (event) => {
		const errors = document.querySelectorAll('.form__error');
		errors?.forEach((error) => error.remove());

		fetch('http://localhost:3001/api/v1/carts/checkout')
			.then((res) => {
				if (res.ok) window.location.href = '/cart.html';
				return res.json();
			})
			.then((data) => {
				const node = document.createElement('p');
				node.classList.add('form__error');
				node.innerText = data.message;
				parent.insertBefore(node, table.nextSibling);
			});
	});
});

const html = String.raw;

const renderCart = (container, carts) => {
	if (carts.length === 0) {
		const node = document.createElement('tr');
		node.innerHTML = html` <td colspan="5" class="table__empty">No items in cart</td> `;
		container.appendChild(node);
		return;
	}

	carts.forEach((item) => {
		const tr = document.createElement('tr');
		tr.innerHTML = html`
			<td>
				<div class="cart">
					<img src="${item.dish.image}" alt="food" class="cart__image" />
					<div class="cart__detail">
						<h3 class="cart__title">${item.dish.name}</h3>
						<p class="description">${item.dish.description}</p>
					</div>
				</div>
			</td>
			<td><span class="cart__qty"> ${item.quantity}</span></td>
			<td>
				<div class="cart__action">
					<button id="add" class="button primary" data-id=${item.dish.id}>Add</button>
					<button id="remove" class="button secondary" data-id=${item.dish.id}>Remove</button>
				</div>
			</td>
			<td><span class="cart__price"> Rp. ${item.dish.price}</span></td>
			<td><span class="cart__price"> Rp. ${item.dish.price * item.quantity}</span></td>
		`;
		container.appendChild(tr);
	});

	const buttons = document.querySelectorAll('.cart__action button');

	buttons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const id = event.target.dataset.id;
			const action = event.target.id;

			fetch(`http://localhost:3001/api/v1/carts/${action}/${id}`)
				.then((res) => res.json())
				.then((data) => {
					alert(data.message);
					window.location.href = '/cart.html';
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});

	const total = carts.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0);
	const node = document.querySelector('.table__total');
	node.innerText = `Rp. ${total}`;
};
