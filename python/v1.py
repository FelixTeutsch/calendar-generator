import os
from PIL import Image
from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from reportlab.platypus import Image as ReportLabImage
import calendar


def create_calendar(images_folder, output_pdf):
    # Open the PDF file
    c = canvas.Canvas(output_pdf, pagesize=landscape(letter))

    # Set page dimensions
    page_width, page_height = landscape(letter)
    weeks_per_page = 2
    image_width = page_width / weeks_per_page
    image_height = (
        page_height / 2
    ) - 100  # Adjust the height to leave some space for weekdays

    # Font styles
    c.setFont("Helvetica", 12)

    # Read images and place them in the PDF
    week_number = 1
    for image_filename in sorted(os.listdir(images_folder)):
        image_path = os.path.join(images_folder, image_filename)

        # Open the image to get its original size
        with Image.open(image_path) as image:
            original_width, original_height = image.size

            # Calculate the size to maintain aspect ratio and fit within the bottom half of the page
            if original_width > image_width or original_height > image_height:
                ratio_width = image_width / original_width
                ratio_height = image_height / original_height
                ratio = min(ratio_width, ratio_height)
                image_width = original_width * ratio
                image_height = original_height * ratio

        # Calculate the position to place the image on the page
        x = (week_number - 1) % weeks_per_page * image_width
        y = (page_height / 2) - image_height  # Position at the bottom half

        # Convert the PIL image object to a ReportLab Image object
        reportlab_image = ReportLabImage(
            image_path, width=image_width, height=image_height
        )

        # Draw the image on the PDF
        reportlab_image.drawOn(c, x, y)

        # Add month, dates, weekdays, and week number on top
        c.drawString(x + 10, page_height - 30, f"Week {week_number}")
        c.drawString(
            x + 10, page_height - 50, "Month: January"
        )  # Replace with the actual month
        c.drawString(
            x + 10, page_height - 70, "Dates: 01-Jan - 07-Jan"
        )  # Replace with the actual dates

        # Add weekdays
        weekdays = calendar.day_name
        for i, weekday in enumerate(weekdays):
            c.drawString(x + 10 + (i * (image_width / 7)), page_height - 100, weekday)

        # Move to the next week or new page if needed
        if week_number % weeks_per_page == 0:
            c.showPage()

        week_number += 1

    # Save the PDF
    c.save()


if __name__ == "__main__":
    images_folder = (
        "../images"  # or provide the absolute path if the images folder is elsewhere
    )
    output_pdf = "output_calendar.pdf"
    create_calendar(images_folder, output_pdf)
