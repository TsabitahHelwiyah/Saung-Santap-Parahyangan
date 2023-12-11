document.addEventListener('DOMContentLoaded', async () => {
	fetch('http://localhost:3001/api/v1/dishes')
		.then((response) => response.json())
		.then((data) => {
			const container = document.querySelector('.dish__grid');
			renderDish(container, data);
		})
		.catch((err) => console.error(err));
});

const html = String.raw;

const renderDish = (container, dishes) => {
	container.innerHTML = '';

	dishes.forEach((dish) => {
		const node = document.createElement('div');
		node.classList.add('dish');

		node.innerHTML = html`
			<img src="${dish.image}" alt="${dish.name}" class="dish__image" />
			<div class="dish__detail">
				<div class="dish__header">
					<h3 class="dish__title">${dish.name}</h3>
					<span class="dish__price">Rp. ${dish.price}</span>
				</div>
				<p class="description">${dish.description}</p>
				<button class="button primary" data-id=${dish.id}>Order Now</button>
			</div>
		`;

		container.appendChild(node);
	});

	const buttons = document.querySelectorAll('.dish button');

	buttons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const id = event.target.dataset.id;

			fetch(`http://localhost:3001/api/v1/carts/add/${id}`)
				.then((response) => response.json())
				.then((data) => {
					alert(data.message);
				})
				.catch((err) => console.error(err));
		});
	});
};
