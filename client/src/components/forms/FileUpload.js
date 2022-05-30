import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'

const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }))
	const fileUploadAndResize = (e) => {
		// console.log(e.target.files);
		//resize
		let files = e.target.files
		let allUploadedFiles = values.images
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					'WEBP',
					100,
					0,
					(uri) => {
						axios
							.post(
								`${process.env.REACT_APP_API}/uploadimages`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : '',
									},
								}
							)
							.then((res) => {
								setLoading(false)
								allUploadedFiles.push(res.data)
								setValues({ ...values, images: allUploadedFiles })
							})
							.catch((err) => {
								setLoading(false)
								console.log('cloudinary upload error', err)
							})
					},
					'base64'
				)
			}
		}
		//send back to server to upload to cloudinary
		//set url to state [ ] in the parent component state,createproducts
	}
	const handleRemoveImage = (public_id) => {
		setLoading(true)
		axios
			.post(
				`${process.env.REACT_APP_API}/removeimage`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : '',
					},
				}
			)
			.then((res) => {
				setLoading(false)
				const { images } = values
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id
				})
				setValues({ ...values, images: filteredImages })
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
			})
	}

	return (
		<>
			<div className='row'>
				{values.images &&
					values.images.map((image) => {
						return (
							<Badge
								count='X'
								key={image.public_id}
								onClick={() => handleRemoveImage(image.public_id)}
								style={{ cursor: 'pointer' }}>
								<Avatar
									src={image.url}
									size={100}
									shape='square'
									className='ml-3 mb-2'
								/>
							</Badge>
						)
					})}
			</div>
			<div className='row'>
				<label className='btn  btn-outline-info'>
					Choose File
					<input
						type='file'
						hidden
						multiple
						accept='images/*'
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</>
	)
}

export default FileUpload
