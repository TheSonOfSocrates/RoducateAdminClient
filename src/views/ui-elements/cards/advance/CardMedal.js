import {Button, Card, CardBody} from 'reactstrap'
import medal from '@src/assets/images/svg/congs.svg'
import {useState} from "react";
import './CardModal.css'
import {AdminAbstractModal} from "../../../../roducate/modals/AdminAbstractModal/AdminAbstractModal";
import {showAdminAbstractModal} from "../../../../redux/actions/modal";
import {useDispatch} from "react-redux";

const CardMedal = () => {

    const [isDismiss, setIsDismiss] = useState(false);

    const dispatch = useDispatch()

    if (!isDismiss) return (
        <Card className='card-congratulations-medal'>
            <CardBody>
                <h5 className="congs-name">Congratulations, John! 🎉</h5>
                {/*<CardText className='font-small-3 congs-recent-news'>You have won gold medal</CardText>*/}
                <div style={{marginTop: 20, marginBottom: 20}}>
                    <Button.Ripple color='primary' outline onClick={() => dispatch(showAdminAbstractModal(true))}>View
                        Profile</Button.Ripple>&nbsp;&nbsp;&nbsp;
                    <Button.Ripple color='secondary' style={{backgroundColor: 'red'}}
                                   onClick={() => setIsDismiss(true)}>Dismiss</Button.Ripple>
                </div>
                <img style={{height: '100%'}} className='congratulation-medal' src={medal} alt='Medal Pic'/>
            </CardBody>

            <AdminAbstractModal/>
        </Card>
    )
    else return <div/>
}

export default CardMedal
