import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showDateRangerPickerModal} from '@store/actions/modal'
import './DateRangePickerModal.css'
import React, {useState} from "react";
import {Dayjs} from 'dayjs';
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;

type
RangeValue = [Dayjs | null, Dayjs | null] | null;

export const DateRangePickerModal = ({onSelect}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [dates, setDates] = useState(null);
    const [value, setValue] = useState(null);

    const disabledDate = (current) => {
        const tooLate = current.diff(new Date(), 'days') > 0;
        return !!tooLate;
    };

    const onOpenChange = (open) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const onSelectClicked = () => {
        if (!value) {
            return
        }
        onSelect(value)
        dispatch(showDateRangerPickerModal())
    }

    return (
        <Modal toggle={() => dispatch(showDateRangerPickerModal())}
               isOpen={store.showDateRangerPickerModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showDateRangerPickerModal())}>
                <div className="d-flex justify-content-center mt-1">
                    <RangePicker
                        value={dates || value}
                        disabledDate={disabledDate}
                        onCalendarChange={(val) => {
                            setDates(val);
                        }}
                        onChange={(val) => {
                            setValue(val);
                        }}
                        onOpenChange={onOpenChange}
                        changeOnBlur
                    />
                </div>
                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onSelectClicked}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};