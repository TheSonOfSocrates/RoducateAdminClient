import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import './MockSingleSelect.css'
import {Spinner} from "reactstrap";

export const MockSingleSelect = ({
                                 selectedId,
                                 data,
                                 filter = '',
                                 onSelected
                             }) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        setId(selectedId)
    }, [data]);

    const [id, setId] = useState('');

    const onItemSelected = (item) => {
        setId(item._id)
        onSelected(item);
    }

    return (
        <div style={{maxHeight: 300, overflow: 'overlay', marginBottom: 20}}>
            {data.length > 0 && data.map((item) => item.subject.title.toLowerCase().includes(filter.toLowerCase()) &&
                <div className="mb-1 ml-1">
                    <div className="d-flex justify-content-between">
                        <span className="SingleSelect-sub-select">{item.subject.title}</span>
                        <div onClick={() => onItemSelected(item)}>
                            {id !== item['_id'] &&
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4Z"
                                        fill="#CACACC"/>
                                </svg>}
                            {id === item['_id'] &&
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM15.535 8.381L10.585 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.796C17.1376 9.60836 17.2431 9.35386 17.2431 9.0885C17.2431 8.82314 17.1376 8.56864 16.95 8.381C16.7624 8.19336 16.5079 8.08794 16.2425 8.08794C15.9771 8.08794 15.7226 8.19336 15.535 8.381V8.381Z"
                                        fill="#1E63EE"/>
                                </svg>
                            }
                        </div>
                    </div>
                        <span>{item.examCode}</span>
                </div>)}
            {data.length === 0 &&
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: 100}}><Spinner/>
                </div>}
        </div>
    );
};