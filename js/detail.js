document.addEventListener('DOMContentLoaded', async () => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get('id');

	fetch(`http://localhost:3001/api/v1/orders/${id}`)
		.then((res) => res.json())
		.then((data) => {
			const cartContainer = document.querySelector('.table__body');
			renderCart(cartContainer, data.items);
		})
		.catch((err) => {
			console.log(err);
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
			<td><span class="cart__price"> Rp. ${item.dish.price}</span></td>
			<td><span class="cart__price"> Rp. ${item.dish.price * item.quantity}</span></td>
		`;
		container.appendChild(tr);
	});

	const total = carts.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0);
	const node = document.querySelector('.table__total');
	node.innerText = `Rp. ${total}`;
};
