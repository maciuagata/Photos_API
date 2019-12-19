//initialize 
const sidebar = document.querySelector('.sidebar');
const section = document.querySelector('section');
const auth = document.querySelector('.Author');
const wdth = document.querySelector('.Width');
const htht = document.querySelector('.Height');

const resizedImageUrl = (originalUrl, w, h) => {
	const ratio = w / h;
	let resH;
	let resW;

	if (section.offsetWidth > section.offsetHeight) {
		//screen is horizonal
		resH = section.offsetHeight;
		resW = Math.round(resH * ratio);
	} else {
		//screen is vertical
		resW = section.offsetWidth;
		resH = Math.round(resW / ratio);
	}

	let optimizedUrl = originalUrl.slice(0, -9) + `${resW}/${resH}`;

	return optimizedUrl;
}

const displayImage = (url, a, w, h) => {

	//download resized image
	section.style.backgroundImage = `url(${resizedImageUrl(url, w, h)})`;
	auth.textContent = `Author: ${a}`;
	wdth.textContent = `Width: ${w} px`;
	htht.textContent = `Height: ${h} px`;

}

//fetch data
fetch('https://picsum.photos/v2/list')
	.then(resp => resp.json())
	.then(urls => {

		//return data
		return urls;
	})
	.then(urls => urls.map(url => {

		//create image elements and show in to sidebar
		let img = document.createElement("img");
		sidebar.appendChild(img);

		//slicing the original resolution
		let smallImg = url.download_url.slice(0, -9) + '200/200';
		img.src = smallImg;

		//onclick event 
		img.addEventListener('click', () => {
			displayImage(url.download_url, url.author, url.width, url.height);
		});

	}))
	.catch(console.log);