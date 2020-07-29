export function downLoadFile(data: any, fileName: string) {
	try {
		let blob = new Blob([data]);
		let url = window.URL.createObjectURL(blob);
		let downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.setAttribute("download", fileName);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	} catch (error) {
		console.error(error);
	}
}
