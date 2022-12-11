const allShareButtons = document.querySelectorAll('.share')
console.log(allShareButtons)

async function copyText(e) {
//prevent button going to the site
	e.preventDefault()
	const link = this.getAttribute('link')
	console.log(link)
	try {
		await navigator.clipboard.writeText(link)
		alert("The link has been copied succesfully :)")
	} catch (err) {
		console.error(err)
	}
}

allShareButtons.forEach(allShareButtons => allShareButtons.addEventListener('click', copyText))