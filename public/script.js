const frm = document.querySelector('#frm');
const output = document.querySelector('#output');
const spinner = document.querySelector('#loading');
const qrcodeElement = document.querySelector('#qrcode');
const btnSave = document.querySelector('#btn-save');

function generateQRCode(e) {
	e.preventDefault();
	const url = document.querySelector('#url').value;
	const size = document.querySelector('#size').value;
	const clrDark = document.querySelector('#colorDark').value;
	const clrLight = document.querySelector('#colorLight').value;

	if (url === '') {
		alert('Please Enter Your Website Link');
	} else {
		// Show Spinner
		spinner.style.display = 'flex';

		setTimeout(() => {
			// Hide Spinner
			spinner.style.display = 'none';
			qrcodeElement.innerHTML = '';

			const qrcode = new QRCode('qrcode', {
				text: url,
				width: size,
				height: size,
				colorDark: clrDark,
				colorLight: clrLight,
				correctLevel: QRCode.CorrectLevel.H,
			});
		}, 1000);

		createDownloadLink();
	}
}

frm.addEventListener('submit', generateQRCode);

// Update color picker value when hex input changes for dark color
const hexDarkInput = document.querySelector('#hexDark');
const colorDarkInput = document.querySelector('#colorDark');

hexDarkInput.addEventListener('input', () => {
	const hexCode = hexDarkInput.value.trim().replace(/^#/, '');
	if (hexCode.length === 6 || hexCode.length === 3) {
		const hexColor = '#' + hexCode;
		colorDarkInput.value = hexColor;
	}
});

// Update hex input value when color picker changes for dark color
colorDarkInput.addEventListener('input', () => {
	const hexCode = colorDarkInput.value.trim().replace(/^#/, '');
	if (hexCode.length === 6 || hexCode.length === 3) {
		hexDarkInput.value = hexCode.toUpperCase();
	}
});

// Update color picker value when hex input changes for light color
const hexLightInput = document.querySelector('#hexLight');
const colorLightInput = document.querySelector('#colorLight');

hexLightInput.addEventListener('input', () => {
	const hexCode = hexLightInput.value.trim().replace(/^#/, '');
	if (hexCode.length === 6 || hexCode.length === 3) {
		const hexColor = '#' + hexCode;
		colorLightInput.value = hexColor;
	}
});

// Update hex input value when color picker changes for light color
colorLightInput.addEventListener('input', () => {
	const hexCode = colorLightInput.value.trim().replace(/^#/, '');
	if (hexCode.length === 6 || hexCode.length === 3) {
		hexLightInput.value = hexCode.toUpperCase();
	}
});

function createDownloadLink() {
	const imgSrc = qrcodeElement.querySelector('img').src;
	btnSave.href = imgSrc;
}

btnSave.addEventListener('click', () => {
	setTimeout(() => {
		btnSave.download = 'qrcode';
	}, 50);
});
