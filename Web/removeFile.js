// Function to remove an image
function removeImage(image) {
	const selectedImagesDiv = document.querySelector('.selected-images');
	selectedImagesDiv.removeChild(image);
	updateFileCount();
}

// Event delegation to handle image removal on click
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('image-container')) {
		removeImage(event.target);
	}
});

function updateFileCount() {
	const selectedImagesDiv = document.querySelector('.selected-images');
	const imageCount = document.getElementById('imageCount');
	imageCount.textContent = `${selectedImagesDiv.childElementCount}/50`;
}
