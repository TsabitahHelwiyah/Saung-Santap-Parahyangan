document.addEventListener('DOMContentLoaded', async () => {
	fetch('http://localhost:3001/api/v1/orders')
		.then((res) => res.json())
		.then((data) => {
			const orderContainer = document.querySelector('.table__body');
			renderOrder(orderContainer, data);
		})
		.catch((err) => {
			console.log(err);
		});
});

const html = String.raw;

const formatDate = (date) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return new Date(date).toLocaleDateString('id-ID', options);
};

const renderOrder = (container, orders) => {
	if (orders.length === 0) {
		const node = document.createElement('tr');
		node.innerHTML = html` <td colspan="4" class="table__empty">No items in order</td> `;
		container.appendChild(node);
		return;
	}

	orders.forEach((order) => {
		const node = document.createElement('tr');
		node.innerHTML = html`
			<td>#${order.id.toString().padStart(5, '0')}</td>
			<td>${formatDate(order.createdAt)}</td>
			<td>${order.count}</td>
			<td>Rp. ${order.total}</td>
			<td>
				<a href="/detail.html?id=${order.id}" class="button primary">Detail</a>
			</td>
		`;
		container.appendChild(node);
	});
};
