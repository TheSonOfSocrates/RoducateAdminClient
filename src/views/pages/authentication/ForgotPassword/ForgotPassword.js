import {isUserLoggedIn} from '@utils'
import {Link, Redirect} from 'react-router-dom'
import {Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import './ForgotPassword.css'
import {useState} from 'react'
import {LightButton, LightButtonWrapper} from "../../../../roducate/components/LightButton";
import axios from "../../../../utility/axios";

const ForgotPassword = () => {

    // ** State
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState('')

    const back = require(`@src/assets/images/svg/login-back.svg`).default
    const midBack = require(`@src/assets/images/svg/login-mid-back.svg`).default
    const headBack = require(`@src/assets/images/svg/head-back.svg`).default
    const loginLogo = require(`@src/assets/images/svg/login-logo.svg`).default
    const resetHappy = require(`@src/assets/images/svg/reset-happy.svg`).default
    const logo = require(`@src/assets/images/logo/logo.svg`).default
    const key = require(`@src/assets/images/svg/key.svg`).default

    const resetPassword = () => {
        if (email === "") {
            alert('input email')
            return
        }

        axios.post('/auth/forgotpassword', {
            email
        })

        setIsSubmitted(true)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    if (!isUserLoggedIn()) {
        return (
            <div className='auth-wrapper auth-v2'>
                {isSubmitted && <Link style={{top: 50, left: 'auto', right: 100}} className='brand-logo' to='/'>
                    <LightButtonWrapper/>
                </Link>}
                <Link style={{top: 70, left: 100}} className='brand-logo' to='/'>
                    <img src={logo}/>
                </Link>
                <Row className='auth-inner m-0'>
                    <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12' style={{
                        background: `url(${back})`,
                        backgroundRepeat: 'repeat'
                    }}>
                        <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                            <div style={{position: "relative"}}>
                                <img src={midBack} style={{position: "absolute", top: 0, left: '-20%'}}/>
                                <img src={key} style={{position: "relative"}}/>
                            </div>
                        </div>
                    </Col>
                    <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                        <Card className="mediaMinWidth">
                            <CardBody>
                                <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                    <div className='d-flex align-items-center'
                                         style={{marginBottom: 30, marginTop: 40}}>
                                        {!isSubmitted && <img style={{margin: 'auto'}} src={loginLogo}/>}
                                        {isSubmitted && <img style={{margin: 'auto'}} src={resetHappy}/>}
                                    </div>
                                    {!isSubmitted && <CardTitle style={{textAlign: 'center'}} tag='h2'
                                                                className='font-weight-bold mb-1'>
                                        Let’s reset your account password
                                    </CardTitle>}

                                    {isSubmitted && <CardTitle style={{textAlign: 'center'}} tag='h2'
                                                               className='font-weight-bold mb-1'>
                                        Reset password link sent to your email
                                    </CardTitle>}

                                    {!isSubmitted && <CardText className='mb-2' style={{textAlign: 'center'}}>
                                        Enter your registered email address
                                    </CardText>}

                                    {isSubmitted && <CardText className='mb-2' style={{textAlign: 'center'}}>
                                        To proceed with your password reset, please click on the link sent to your email
                                        address: <span style={{color: '#6c07bc'}}>[{email}]</span>.
                                    </CardText>}

                                    {!isSubmitted && <Form className='auth-forgot-password-form mt-2'
                                                           onSubmit={e => e.preventDefault()}>
                                        <FormGroup>
                                            <Label className='form-label' for='login-email'>
                                                Email
                                            </Label>
                                            <Input onChange={changeEmail} value={email} type='email' id='login-email'
                                                   placeholder='admin@domain.com'
                                                   autoFocus/>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className='d-flex justify-content-end'>
                                                <Link to='/login'>
                                                    <small>Cancel</small>
                                                </Link>
                                            </div>
                                        </FormGroup>
                                        <Button.Ripple onClick={resetPassword} style={{marginBottom: 20}}
                                                       color='primary' block>
                                            Reset
                                        </Button.Ripple>
                                    </Form>}
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    } else {
        return <Redirect to='/'/>
    }
}

export default ForgotPassword
