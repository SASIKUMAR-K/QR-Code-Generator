import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import './App.css';

const App = () => {
	const defaultUrl = 'sasiportfolio.web.app'; // Default text for the input
	const [url, setUrl] = useState(defaultUrl);
	const [size, setSize] = useState(300); // default to 300x300

	const [colorDark, setColorDark] = useState('#000000');
	const [hexDark, setHexDark] = useState('000000');

	const [colorLight, setColorLight] = useState('#ffffff');
	const [hexLight, setHexLight] = useState('ffffff');

	const handleColorChange = (colorType, value) => {
		if (colorType === 'dark') {
			setColorDark(value);
			setHexDark(value.slice(1).toUpperCase());
		} else if (colorType === 'light') {
			setColorLight(value);
			setHexLight(value.slice(1).toUpperCase());
		}
	};

	const handleHexChange = (colorType, hex) => {
		if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
			if (colorType === 'dark') {
				setHexDark(hex.toUpperCase());
				setColorDark(`#${hex.toUpperCase()}`);
			} else if (colorType === 'light') {
				setHexLight(hex.toUpperCase());
				setColorLight(`#${hex.toUpperCase()}`);
			}
		} else {
			if (colorType === 'dark') {
				setHexDark(hex);
			} else if (colorType === 'light') {
				setHexLight(hex);
			}
		}
	};

	const handleDownload = (e) => {
		e.preventDefault();
		const svg = document.querySelector('svg');
		const svgData = new XMLSerializer().serializeToString(svg);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = document.createElement('img');

		img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));

		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const pngFile = canvas.toDataURL('image/png');

			const downloadLink = document.createElement('a');
			downloadLink.href = pngFile;
			downloadLink.download = 'qrcode.png';
			downloadLink.click();
		};
	};

	return (
		<>
			<div className='navbar'>Build QR</div>
			<div className='containerWhole'>
				<div className='code'>
					<form id='frm'>
						<div className='form-group'>
							<label htmlFor='url'>Enter the Text</label>
							<input
								type='text'
								id='url'
								placeholder='Type Here'
								required
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='size'>Select Your Size</label>
							<select
								id='size'
								value={size}
								onChange={(e) => setSize(parseInt(e.target.value))}
							>
								<option value='100'>100x100</option>
								<option value='200'>200x200</option>
								<option value='300'>300x300</option>
								<option value='400'>400x400</option>
								<option value='500'>500x500</option>
								<option value='600'>600x600</option>
								<option value='700'>700x700</option>
								<option value='800'>800x800</option>
								<option value='900'>900x900</option>
								<option value='1000'>1000x1000</option>
							</select>
						</div>
						<div className='form-single-group'>
							<label htmlFor='colorDark'>Color Dark</label>
							<input
								type='color'
								value={colorDark}
								onChange={(e) => handleColorChange('dark', e.target.value)}
							/>
							<div className='hashDiv'>
								<span className='hashTag'>#</span>
								<input
									type='text'
									value={hexDark}
									onChange={(e) => handleHexChange('dark', e.target.value)}
								/>
							</div>
						</div>

						<div className='form-single-group'>
							<label htmlFor='colorLight'>Color Light</label>
							<input
								type='color'
								value={colorLight}
								onChange={(e) => handleColorChange('light', e.target.value)}
							/>
							<div className='hashDiv'>
								<span className='hashTag'>#</span>
								<input
									type='text'
									value={hexLight}
									onChange={(e) => handleHexChange('light', e.target.value)}
								/>
							</div>
						</div>
					</form>

					<a href='#' id='btn-save' onClick={handleDownload}>
						Save Picture
					</a>
				</div>
				<div className='output' style={{ backgroundColor: colorLight }}>
					<div
						style={{
							height: 'auto',
							margin: '0 auto',
							maxWidth: size,
							width: '100%',
						}}
					>
						<QRCode
							size={size}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={url}
							fgColor={colorDark}
							bgColor={colorLight}
							viewBox={`0 0 ${size} ${size}`}
						/>
					</div>
				</div>
			</div>
			<div className='copyright'>
				<div className='copyContent'>&copy; All Rights Reserved @2024</div>
				<div className='myCopyContent'>
					Design and Developed by{' '}
					<a href='https://sasiportfolio.web.app/' target='_blank'>
						Sasikumar K
					</a>
				</div>
			</div>
		</>
	);
};

export default App;
