const jsPDF = window.jspdf.jsPDF;
// Function to generate the calendar and save as PDF
function generateCalendar() {
	const images = document.querySelectorAll('.selected-image');
	const pageWidth = 800;
	const pageHeight = 600;
	const weeksPerPage = 2;
	const imageWidth = pageWidth / weeksPerPage;
	const imageHeight = pageHeight / 2 - 100;

	const pdf = new jsPDF();
	let currentWeek = 1;
	let x = 0;
	let y = 0;

	// Function to add an image and text to the PDF
	function addImageWithText(image, weekNumber) {
		pdf.addImage(image, 'JPEG', x, y, imageWidth, imageHeight);
		pdf.text(`Week ${weekNumber}`, x + 10, y + 20);
		pdf.text('Month: January', x + 10, y + 40); // Replace with the actual month
		pdf.text('Dates: 01-Jan - 07-Jan', x + 10, y + 60); // Replace with the actual dates

		// Add weekdays (Sunday to Saturday)
		const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		for (let i = 0; i < weekdays.length; i++) {
			pdf.text(weekdays[i], x + 10 + i * (imageWidth / 7), y + imageHeight - 30);
		}

		x += imageWidth;
		currentWeek++;

		// If a new page is needed
		if (currentWeek > weeksPerPage) {
			x = 0;
			y = pageHeight / 2;
			currentWeek = 1;
			pdf.addPage();
		}
	}

	// Load all images and add them to the PDF
	const imagePromises = Array.from(images).map((image) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = image.src;
			img.onload = () => resolve(img);
			img.onerror = (error) => reject(error);
		});
	});

	Promise.all(imagePromises)
		.then((loadedImages) => {
			loadedImages.forEach((img) => addImageWithText(img, currentWeek));

			// Save the PDF
			pdf.save('output_calendar.pdf');
		})
		.catch((error) => {
			console.error('Error loading images:', error);
		});
}

// Event listener for the "Generate Calendar" button
const generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', generateCalendar);
