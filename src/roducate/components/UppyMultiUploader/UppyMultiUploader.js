import React from 'react';
import Uppy from '@uppy/core';
import {Dashboard} from '@uppy/react';

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

import AwsS3 from '@uppy/aws-s3';

export const UppyMultiUploader = ({type = undefined, onFileUploaded}) => {

    let allowedFileTypes;
    if (type) {
        switch (type) {
            case 'document':
                allowedFileTypes = ['.pdf', '.doc', '.docx']
                break
            case 'video':
                allowedFileTypes = ['.mp4', '.mpg', '.avi']
                break
            case 'podcast':
                allowedFileTypes = ['.mp3', '.wav']
        }
    }

    const uppy = new Uppy({
        id: 'file-uploader-aws' + (Math.random() * Math.random() * Math.random()),
        autoProceed: false,
        debug: true,
        showSelectedFiles: true,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: type ? allowedFileTypes : null
        },
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

    uppy.on('upload-success', (file, response) => {
        onFileUploaded({fileName: file.name, s3Link: response.uploadURL})
    });

    return <Dashboard uppy={uppy}/>;
}