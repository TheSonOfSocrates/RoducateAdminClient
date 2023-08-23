import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddProduct} from '@store/actions/modal'
import './AddProduct.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";

export const AddProduct = ({product, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [productName, setProductName] = useState('');
    const [selectedProductType, setSelectedProductType] = useState(undefined);
    const [quantity, setQuantity] = useState(undefined)
    const [price, setPrice] = useState(undefined);
    const [des, setDes] = useState('');
    const [imageList, setImageList] = useState([]);

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (product) {
            setProductName(product.productName)
        } else {
            setProductName('')
        }
    }, [product])

    const addProduct = async () => {
        let link = '/product';
        if (product)
            link = `/product/${product._id}`

        let result;
        try {
            result = await axios.post(link, {
                title: productName,
                description: des,
                productType: selectedProductType.value,
                price,
                stockAmount: quantity,
                images: imageList.map(item => item.title.split('/')[item.title.split('/').length - 1])
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${product ? 'updated' : 'created'} product successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showAddProduct());
                })
            } else {
                await MySwal.fire({
                    title: 'Error',
                    text: 'Something went wrong.',
                    icon: 'error',
                    timer: 2000,
                    position: 'center',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
            }
        } catch (e) {
            await MySwal.fire({
                title: 'Error',
                text: e.toString(),
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }
    }

    const transitionOptions = [
        {value: 'Device', label: 'Device'},
        {value: 'Merchandize', label: 'Merchandize'},
        {value: 'Virtual Product', label: 'Virtual Product'}
    ]

    const onOptionImgAttached = (images) => {
        setImageList([...imageList, ...images])
    }

    return (
        <Modal toggle={() => dispatch(showAddProduct())}
               isOpen={store.showAddProduct}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddProduct())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddProduct())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{product ? 'EDIT' : 'ADD'} PRODUCT</h1>
                <FormGroup>
                    <Input placeholder='Product Name' value={productName}
                           onChange={e => setProductName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={selectedProductType}
                        options={transitionOptions}
                        isClearable={false}
                        onChange={(value) => setSelectedProductType(value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input placeholder='Quantity' value={quantity} type='number'
                           onChange={e => setQuantity(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder='Price' value={price} type='number' onChange={e => setPrice(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Input type="textarea" rows="3" placeholder='Description' value={des}
                           onChange={(e) => setDes(e.target.value)}/>
                </FormGroup>

                <br/>

                <CustomUppyFileUploader currentImgs={imageList} onFileChange={onOptionImgAttached} multi={true}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addProduct}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};