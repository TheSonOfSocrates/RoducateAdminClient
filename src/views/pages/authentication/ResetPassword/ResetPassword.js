import {useSkin} from '@hooks/useSkin'
import InputPassword from '@components/input-password-toggle'
import {Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Label, Row} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import './ResetPassword.css'
import {Link} from "react-router-dom";
import {LightButtonWrapper} from "../../../../roducate/components/LightButton";

const ResetPassword = () => {
    const [skin, setSkin] = useSkin()

    const back = require(`@src/assets/images/svg/login-back.svg`).default
    const midBack = require(`@src/assets/images/svg/login-mid-back.svg`).default
    const headBack = require(`@src/assets/images/svg/head-back.svg`).default
    const loginLogo = require(`@src/assets/images/svg/login-logo.svg`).default
    const blueBox = require(`@src/assets/images/svg/blue-box.svg`).default
    const logo = require(`@src/assets/images/logo/logo.svg`).default

    const illustration = skin === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    return (
        <div className='auth-wrapper auth-v2'>
            <Link style={{top: 50, left: 'auto', right: 100}} className='brand-logo' to='/'>
                <LightButtonWrapper/>
            </Link>
            <Link style={{top: 70, left: 100}} className='brand-logo' to='/'>
                <img src={logo}/>
            </Link>
            <Row className='auth-inner m-0'>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12' style={{
                    background: `url(${back})`,
                    backgroundRepeat: 'repeat'
                }}>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <div style={{background: `url(${headBack})`, position: "relative"}}>
                            <img src={midBack} style={{position: "absolute", top: 0, left: 0}}/>
                            <img src={blueBox} style={{position: "relative"}}/>
                        </div>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Card className="mediaMinWidth">
                        <CardBody>
                            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                <div className='d-flex align-items-center' style={{marginBottom: 30, marginTop: 40}}>
                                    <img style={{margin: 'auto'}} src={loginLogo}/>
                                </div>
                                <CardTitle tag='h2' className='font-weight-bold mb-1' style={{textAlign: 'center'}}>
                                    Enter new password
                                </CardTitle>
                                <CardText style={{textAlign: 'center'}} className='mb-2'>Password should be a minimum of
                                    8 characters, and must contain an uppercase letter, a lowercase letter, a number,
                                    and a special character.</CardText>
                                <Form className='auth-reset-password-form mt-2' onSubmit={e => e.preventDefault()}>
                                    <FormGroup>
                                        <Label className='form-label' for='new-password'>
                                            New Password
                                        </Label>
                                        <InputPassword className='input-group-merge' id='new-password' autoFocus/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className='form-label' for='confirm-password'>
                                            Confirm Password
                                        </Label>
                                        <InputPassword className='input-group-merge' id='confirm-password'/>
                                    </FormGroup>
                                    <Button.Ripple color='primary' block>
                                        Confirm
                                    </Button.Ripple>
                                </Form>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ResetPassword
