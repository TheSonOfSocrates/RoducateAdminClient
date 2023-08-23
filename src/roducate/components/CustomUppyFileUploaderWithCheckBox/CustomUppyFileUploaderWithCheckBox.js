import {useState} from 'react'
import Uppy from '@uppy/core'
import {DragDrop} from '@uppy/react'
import AwsS3 from "@uppy/aws-s3";
import {Spinner} from "reactstrap";
import './CustomUppyFileUploaderWithCheckBox.css'

const CustomUppyFileUploaderWithCheckBox = ({
                                                onFileChange,
                                                multi = false,
                                                currentImgs,
                                                correctAnswers,
                                                currentOptionType,
                                                answerUpdated
                                            }) => {
    const [isUploading, setIsUploading] = useState(false)

    const uppy = new Uppy({
        meta: {type: 'avatar'},
        autoProceed: true,
        id: 'file-uploader-aws' + (Math.random() * Math.random() * Math.random()),
        restrictions: {
            allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif']
        }
    })

    uppy.use(AwsS3, {
        fields: [], // empty array
        shouldUseMultipart: (file) => file.size > 100 * 2 * 20,
        getUploadParameters(file) { // here we prepare our request to the server for the upload URL
            const userData = JSON.parse(localStorage.getItem('userData'));
            const accessToken = userData.accessToken;

            return fetch(`${process.env.REACT_APP_SERVER_URL}library/getSignedURL`, { // we'll send the info asynchronously via fetch to our nodejs server endpoint, '/uploader' in this case
                method: 'POST', // all the examples I found via the Uppy site used 'PUT' and did not work
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${accessToken.replace(/"/g, '')}`
                },
                body: JSON.stringify({
                    filename: file.name, // here we are passing data to the server/back end
                    contentType: file.type,
                    metadata: {
                        'name': file.meta['name'], // here we pass the 'name' variable to the back end, with 'file.meta['name']' referring to the 'name' from our metaFields id above
                        'caption': file.meta['caption'] // here we pass the 'caption' variable to the back end, with 'file.meta['caption']' referring to the 'caption' from our metaFields id above
                    },
                })
            }).then((response) => {
                return response.json(); // return the server's response as a JSON promise
            }).then((data) => {
                return {
                    method: data.method, // here we send method, url, fields and headers to the AWS S3 bucket
                    url: data.url,
                    fields: data.fields,
                    headers: data.headers,
                };
            });
        },
    })

    uppy.on('upload-success', (file) => {
        // Check if all files have been uploaded successfully
        const allFilesUploaded = uppy.getFiles().every((f) => f.progress.uploadComplete)

        if (allFilesUploaded) {
            setIsUploading(false)

            onFileChange(uppy.getFiles().filter((oItem) => !currentImgs.some((sItem) => sItem.fileName === oItem.name))
                .map((item) => ({fileName: item.data.name, title: item.uploadURL})))
        }
    })

    uppy.on("file-added", (file) => {
        setIsUploading(true)
    });

    const renderPreview = () => {
        if (isUploading) {
            return <div style={{margin: 'auto'}}>
                <div className="mb-1"><Spinner/></div>
                <span className="mt-1 mb-2">Uploading</span>
            </div>
        } else {
            return currentImgs.map((img, index) => <div className='col-4'
                                                        style={{position: 'relative', height: '150px', padding: 0}}>
                <img style={{height: '90%', width: '90%', objectFit: 'cover'}}
                     key={index}
                     className='rounded'
                     src={img.title}
                     alt='avatar'/>
                <input type='checkbox' style={{position: 'absolute', top: 10, right: 20}}
                       checked={correctAnswers.includes(index)} onChange={(e) => {
                    let tmpCorrectAnswers;
                    if (e.target.checked) {
                        if (currentOptionType === 'single' && correctAnswers.length === 1)
                            return
                        tmpCorrectAnswers = [...correctAnswers, index]
                    } else {
                        tmpCorrectAnswers = [...correctAnswers.filter((item) => item !== index)]
                    }
                    answerUpdated(tmpCorrectAnswers)
                }}/>
            </div>)
        }
    }

    return (
        <div>
            <div className="row" style={{textAlign: 'center', margin: 0}}>
                {renderPreview()}
            </div>
            <DragDrop uppy={uppy}/>
        </div>
    )
}

export default CustomUppyFileUploaderWithCheckBox
