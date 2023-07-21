// Function to handle file drop event
function handleDrop(event) {
	event.preventDefault();
	const dropZone = document.getElementById('dropZone');
	dropZone.classList.remove('drag-over');

	const files = event.dataTransfer.files;
	addImagesToList(files);
}

// Function to handle file selection via file input
function handleFileInput(event) {
	const files = event.target.files;
	addImagesToList(files);
}

// Function to add uploaded images to the list
function addImagesToList(files) {
	const selectedImagesDiv = document.querySelector('.selected-images');
	for (const file of files) {
		const imageContainer = document.createElement('div');
		imageContainer.classList.add('image-container');
		// const image = document.createElement('img');
		// image.src = URL.createObjectURL(file);
		// image.classList.add('selected-image');
		// imageContainer.appendChild(image);
		imageContainer.setAttribute('data-image', URL.createObjectURL(file));
		imageContainer.setAttribute('style', 'background-image: url(' + URL.createObjectURL(file) + ')');
		selectedImagesDiv.appendChild(imageContainer);
	}
	updateFileCount();
}

// Event listener for file drop
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (event) => {
	event.preventDefault();
	dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (event) => {
	event.preventDefault();
	dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', handleDrop);

// Event listener for file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileInput);

fileInput.addEventListener('click', (event) => {
	event.stopPropagation();
});

dropZone.addEventListener('click', (event) => {
	event.preventDefault();
	fileInput.click();
});
