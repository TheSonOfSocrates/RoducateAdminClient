import {Fragment, useContext, useState} from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import {useSkin} from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Slide, toast} from 'react-toastify'
import {handleLogin} from '@store/actions/auth'
import {AbilityContext} from '@src/utility/context/Can'
import {Link, useHistory} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {getHomeRouteForLoggedInUser, isObjEmpty} from '@utils'
import {Coffee} from 'react-feather'
import 'react-toastify/dist/ReactToastify.css'
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    CustomInput,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner
} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import OneMsg from "../../../../roducate/components/OneMsg/OneMsg"
import './Login.css'

const ToastContent = ({name, role}) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Coffee size={12}/>}/>
                <h6 style={{color: "white"}} className='toast-title font-weight-bold'>Welcome, {name}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span style={{color: "white"}}>You have successfully logged in as an {role} user to Roducate. Now you can start to explore. Enjoy!</span>
        </div>
    </Fragment>
)

const Login = props => {
    const [skin, setSkin] = useSkin()
    const ability = useContext(AbilityContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)

    const {register, errors, handleSubmit} = useForm()

    const back = require(`@src/assets/images/svg/login-back.svg`).default
    const midBack = require(`@src/assets/images/svg/login-mid-back.svg`).default
    const headBack = require(`@src/assets/images/svg/head-back.svg`).default
    const loginLogo = require(`@src/assets/images/svg/login-logo.svg`).default
    const head1 = require(`@src/assets/images/svg/head1.svg`).default

    const onSubmit = async data => {
        if (isObjEmpty(errors)) {
            try {
                const res = await useJwt.login({email, password, isEmail: true})
                setIsWaiting(false)
                if (res?.status === 200) {
                    const data = {
                        ...res.data.user,
                        accessToken: res.data?.token
                    }
                    dispatch(handleLogin(data))
                    ability.update(res.data.user.isOnline)
                    history.push(getHomeRouteForLoggedInUser(data.role[0]))
                    toast.success(
                        <ToastContent name={(data.firstName + data.lastName)} role={data.role[0] || 'admin'}/>,
                        {transition: Slide, hideProgressBar: true, autoClose: 2000}
                    )
                } else {
                    toast.error(<span style={{color: 'white'}}>{res}</span>, {
                        transition: Slide,
                        hideProgressBar: true,
                        autoClose: 2000
                    })
                    console.log(res)
                }
            } catch (e) {
                setIsWaiting(false)
                toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                })
            }
        }
    }

    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12' style={{
                    background: `url(${back})`,
                    backgroundRepeat: 'repeat'
                }}>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <div style={{background: `url(${headBack})`, position: "relative"}}>
                            <img src={midBack} style={{position: "absolute", top: 0, left: 0}}/>
                            <OneMsg msg="Yeah, There’s School" time="4mins ago"
                                    style={{position: "absolute", top: '20%', left: '-35%'}}/>
                            <OneMsg msg="Parental support 🤶🏾" time="4mins ago"
                                    style={{position: "absolute", top: '-18%', right: 0}}/>
                            <OneMsg msg="Teachers are not left behind" time="4mins ago"
                                    style={{position: "absolute", bottom: '8%', left: '-30%'}}/>
                            <OneMsg msg="Counsellors are here too 💁🏾" time="4mins ago"
                                    style={{position: "absolute", bottom: 0, right: '-15%'}}/>
                            <img src={head1} style={{position: "relative"}}/>
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
                                    Hi, Welcome
                                </CardTitle>
                                <CardText className='mb-2'>Please sign-in to your account and start your
                                    experience</CardText>
                                <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup>
                                        <Label className='form-label' for='login-email'>
                                            Email
                                        </Label>
                                        <Input
                                            autoFocus
                                            type='email'
                                            value={email}
                                            id='login-email'
                                            name='login-email'
                                            onChange={e => setEmail(e.target.value)}
                                            className={classnames({'is-invalid': errors['login-email']})}
                                            innerRef={register({required: true, validate: value => value !== ''})}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <div className='d-flex justify-content-between'>
                                            <Label className='form-label' for='login-password'>
                                                Password
                                            </Label>
                                        </div>
                                        <InputPasswordToggle
                                            value={password}
                                            id='login-password'
                                            name='login-password'
                                            className='input-group-merge'
                                            onChange={e => setPassword(e.target.value)}
                                            className={classnames({'is-invalid': errors['login-password']})}
                                            innerRef={register({required: true, validate: value => value !== ''})}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <div className='d-flex justify-content-between'>
                                            <CustomInput type='checkbox' className='custom-control-Primary'
                                                         id='remember-me'
                                                         label='Remember Me'/>
                                            <Link to='/forgot-password'>
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                    </FormGroup>
                                    <Button.Ripple style={{marginBottom: 20}} type='submit' onClick={() => {
                                        setIsWaiting(true)
                                    }} color='primary' block>
                                        {isWaiting && <Spinner className="mr-1" color='white' size='sm'/>}Login
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

export default Login
