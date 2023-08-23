import {useState} from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import {DragDrop} from '@uppy/react'

const FileUploader = ({onFileChange, multi = false}) => {
    const [img, setImg] = useState(null)
    const [previewArr, setPreviewArr] = useState([])
    const [imgs, setImgs] = useState([])

    const uppy = new Uppy({
        meta: {type: 'avatar'},
        autoProceed: true
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {
        const isExist = imgs.some((item) => item.name === file.data.name)
        if (isExist) return

        file.data.preview = preview

        if (multi) {
            const arr = previewArr
            arr.push(preview)
            setPreviewArr([...arr])

            imgs.push(file.data)
            setImgs([...imgs])

            onFileChange(imgs)
        } else {
            setImg(preview)
            onFileChange(file.data)
        }
    })

    const renderPreview = () => {
        if (previewArr.length) {
            return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src}
                                                       alt='avatar'/>)
        } else {
            return null
        }
    }

    return (
        <div>
            {!multi && img !== null ? <img className='rounded mt-2' src={img} alt='avatar'/> : null}
            <div style={{textAlign: 'center', marginBottom: 5}}>
                {multi && renderPreview()}
            </div>
            <DragDrop uppy={uppy}/>
        </div>
    )
}

export default FileUploader
