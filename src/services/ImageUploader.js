import { useState } from 'react';
import Uppy from '@uppy/core';
import thumbnailGenerator from '@uppy/thumbnail-generator';
import { DragDrop } from '@uppy/react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

const ImageUploader = ({ handleChangeImage, title = 'Add image', photo }) => {
	const [img, setImg] = useState(null);

	const uppy = new Uppy({
		meta: { type: 'avatar' },
		restrictions: { maxNumberOfFiles: 1 },
		autoProceed: true,
	});

	uppy.use(thumbnailGenerator);

	uppy.on('thumbnail:generated', async (file, preview) => {
		setImg(preview);
		await handleChangeImage(file.data);
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle tag="h4">{title} </CardTitle>
			</CardHeader>
			<CardBody>
				{photo && <img className="rounded mt-2" src={photo} alt="avatar" />}
				<DragDrop uppy={uppy} />
				{img !== null ? (
					<img className="rounded mt-2" src={img} alt="avatar" />
				) : null}
			</CardBody>
		</Card>
	);
};

export default ImageUploader;
