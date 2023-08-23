import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showSearchMenuModal} from '@store/actions/modal'
import './SearchMenuModal.css'
import {X} from "react-feather";
import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {showCreateModal} from "../../../redux/actions/modal";

export const SearchMenuModal = ({syllabus, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const history = useHistory()

    const [menuList, setMenuList] = useState([
        {
            title: "DASHBOARD",
            mens: [
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM11 4.062C8.98271 4.31868 7.13885 5.33387 5.84319 6.90122C4.54752 8.46857 3.89728 10.4705 4.02462 12.5C4.15196 14.5296 5.04733 16.4345 6.52874 17.8276C8.01016 19.2207 9.96645 19.9975 12 20C13.9486 20 15.8302 19.2888 17.2917 18C18.7533 16.7112 19.6942 14.9333 19.938 13H12C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V4.062ZM13 4.062V11H19.938C19.7154 9.23761 18.9129 7.59934 17.6568 6.34324C16.4007 5.08713 14.7624 4.28459 13 4.062Z"
                            fill="#747474"/>
                    </svg>,
                    label: "Overview",
                    link: "/dashboard/overview"
                },
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M5.708 13.35C6.333 11.43 7.458 8.971 9.465 6.964C13.399 3.03 19.117 2.449 19.262 2.434C19.4459 2.41556 19.6313 2.44819 19.7978 2.52829C19.9644 2.60838 20.1056 2.73285 20.206 2.888C20.414 3.201 21.586 5.171 20.015 7.551C19.9328 7.67319 19.8405 7.78826 19.739 7.895C19.7523 8.01912 19.7421 8.14463 19.709 8.265C19.519 8.954 19.275 9.677 18.959 10.4C18.408 11.663 17.631 12.94 16.536 14.036C14.486 16.086 11.794 17.027 9.692 17.466C8.74184 17.6641 7.77812 17.7905 6.809 17.844C6.778 18.09 6.5 20.57 6.5 21C6.5 21.2652 6.39464 21.5196 6.20711 21.7071C6.01957 21.8946 5.76522 22 5.5 22C5.23478 22 4.98043 21.8946 4.79289 21.7071C4.60536 21.5196 4.5 21.2652 4.5 21C4.5 20.429 4.616 19.33 4.721 18.44C4.926 16.708 5.167 15.013 5.708 13.35ZM18.345 6.45C18.872 5.65 18.865 4.97 18.76 4.53C17.233 4.805 13.541 5.716 10.879 8.379C9.175 10.082 8.179 12.219 7.61 13.969C7.41217 14.5763 7.24726 15.1939 7.116 15.819C7.84412 15.7612 8.56788 15.6577 9.283 15.509C11.203 15.107 13.461 14.281 15.121 12.621C15.971 11.771 16.605 10.764 17.075 9.716C16.099 10.236 15.057 10.702 14.316 10.949C14.1914 10.9905 14.0598 11.007 13.9288 10.9977C13.7978 10.9883 13.6699 10.9533 13.5524 10.8945C13.3152 10.7758 13.1348 10.5677 13.051 10.316C12.9672 10.0643 12.9868 9.78963 13.1055 9.5524C13.2242 9.31517 13.4323 9.13481 13.684 9.051C14.358 8.826 15.442 8.338 16.438 7.786C16.932 7.512 17.384 7.233 17.739 6.978C18.123 6.702 18.299 6.518 18.345 6.449V6.45Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Create",
                    link: undefined
                }
            ]
        },
        {
            title: "APPS & PAGES",
            mens: [
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM13 4.062V5C12.9997 5.25488 12.9021 5.50003 12.7272 5.68537C12.5522 5.8707 12.313 5.98223 12.0586 5.99717C11.8042 6.01211 11.5536 5.92933 11.3582 5.76574C11.1627 5.60214 11.0371 5.3701 11.007 5.117L11 5V4.062C9.28177 4.27898 7.68025 5.04734 6.43578 6.25179C5.19131 7.45623 4.37102 9.03178 4.098 10.742L4.062 11H5C5.25488 11.0003 5.50003 11.0979 5.68537 11.2728C5.8707 11.4478 5.98223 11.687 5.99717 11.9414C6.01211 12.1958 5.92933 12.4464 5.76574 12.6418C5.60214 12.8373 5.3701 12.9629 5.117 12.993L5 13H4.062C4.30363 14.9112 5.22674 16.6711 6.66175 17.9564C8.09677 19.2417 9.94734 19.966 11.8735 19.9964C13.7998 20.0268 15.6723 19.3612 17.1471 18.1219C18.622 16.8825 19.6002 15.1527 19.902 13.25L19.938 13H19C18.7451 12.9997 18.5 12.9021 18.3146 12.7272C18.1293 12.5522 18.0178 12.313 18.0028 12.0586C17.9879 11.8042 18.0707 11.5536 18.2343 11.3582C18.3979 11.1627 18.6299 11.0371 18.883 11.007L19 11H19.938C19.7201 9.25614 18.9323 7.63308 17.697 6.383L15.273 11.142L15.118 11.436L14.808 12.046C14.438 12.766 14.036 13.5 13.485 14.051C12.513 15.022 10.897 15.14 9.879 14.121C8.86 13.103 8.978 11.487 9.949 10.515C10.421 10.043 11.027 9.68 11.645 9.353L12.564 8.882L13.413 8.438L17.616 6.303C16.3662 5.06794 14.7435 4.28016 13 4.062ZM13.162 10.838L12.952 10.95L12.736 11.063C12.334 11.272 11.914 11.489 11.564 11.761L11.363 11.931L11.29 12.015C11.097 12.275 11.155 12.569 11.293 12.707C11.431 12.845 11.725 12.903 11.985 12.71L12.071 12.636L12.239 12.436C12.456 12.156 12.639 11.831 12.81 11.506L12.937 11.264C13.012 11.118 13.087 10.974 13.162 10.838Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Activities",
                    link: "/apps/activities"
                },
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.935 2.87799L20.116 6.67399C21.182 7.23699 21.182 8.764 20.116 9.32599L18.842 9.99999L20.116 10.674C21.182 11.237 21.182 12.764 20.116 13.326L18.842 14L20.116 14.674C21.182 15.237 21.182 16.764 20.116 17.326L12.935 21.122C12.6469 21.2744 12.3259 21.354 12 21.354C11.6741 21.354 11.3531 21.2744 11.065 21.122L3.88397 17.326C2.81797 16.763 2.81797 15.237 3.88397 14.674L5.15897 14L3.88397 13.326C2.81797 12.763 2.81797 11.237 3.88397 10.674L5.15897 9.99999L3.88397 9.32599C2.81797 8.76299 2.81797 7.23699 3.88397 6.67399L11.065 2.87799C11.3531 2.72563 11.6741 2.64598 12 2.64598C12.3259 2.64598 12.6469 2.72563 12.935 2.87799ZM16.702 15.131L12.935 17.122C12.6469 17.2744 12.3259 17.354 12 17.354C11.6741 17.354 11.3531 17.2744 11.065 17.122L7.29797 15.132L5.65497 16L12 19.354L18.346 16L16.702 15.131ZM16.702 11.131L12.935 13.123C12.6737 13.261 12.3851 13.3393 12.09 13.3525C11.7948 13.3656 11.5005 13.3132 11.228 13.199L11.065 13.123L7.29797 11.131L5.65497 12.001L12 15.353L18.346 12L16.702 11.131ZM12 4.64599L5.65497 7.99999L12 11.354L18.346 7.99999L12 4.64599Z"
                            fill="#747474"/>
                    </svg>,
                    label: "Plans",
                    link: "/apps/plans"
                },
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M5.708 13.35C6.333 11.43 7.458 8.971 9.465 6.964C13.399 3.03 19.117 2.449 19.262 2.434C19.4459 2.41556 19.6313 2.44819 19.7978 2.52829C19.9644 2.60838 20.1056 2.73285 20.206 2.888C20.414 3.201 21.586 5.171 20.015 7.551C19.9328 7.67319 19.8405 7.78826 19.739 7.895C19.7523 8.01912 19.7421 8.14463 19.709 8.265C19.519 8.954 19.275 9.677 18.959 10.4C18.408 11.663 17.631 12.94 16.536 14.036C14.486 16.086 11.794 17.027 9.692 17.466C8.74184 17.6641 7.77812 17.7905 6.809 17.844C6.778 18.09 6.5 20.57 6.5 21C6.5 21.2652 6.39464 21.5196 6.20711 21.7071C6.01957 21.8946 5.76522 22 5.5 22C5.23478 22 4.98043 21.8946 4.79289 21.7071C4.60536 21.5196 4.5 21.2652 4.5 21C4.5 20.429 4.616 19.33 4.721 18.44C4.926 16.708 5.167 15.013 5.708 13.35ZM18.345 6.45C18.872 5.65 18.865 4.97 18.76 4.53C17.233 4.805 13.541 5.716 10.879 8.379C9.175 10.082 8.179 12.219 7.61 13.969C7.41217 14.5763 7.24726 15.1939 7.116 15.819C7.84412 15.7612 8.56788 15.6577 9.283 15.509C11.203 15.107 13.461 14.281 15.121 12.621C15.971 11.771 16.605 10.764 17.075 9.716C16.099 10.236 15.057 10.702 14.316 10.949C14.1914 10.9905 14.0598 11.007 13.9288 10.9977C13.7978 10.9883 13.6699 10.9533 13.5524 10.8945C13.3152 10.7758 13.1348 10.5677 13.051 10.316C12.9672 10.0643 12.9868 9.78963 13.1055 9.5524C13.2242 9.31517 13.4323 9.13481 13.684 9.051C14.358 8.826 15.442 8.338 16.438 7.786C16.932 7.512 17.384 7.233 17.739 6.978C18.123 6.702 18.299 6.518 18.345 6.449V6.45Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Resources",
                    link: "/apps/resources"
                }
            ]
        },
        {
            title: "USERS",
            mens: [
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M16 14C17.2885 14.0001 18.5272 14.4975 19.4578 15.3887C20.3884 16.2798 20.9391 17.4958 20.995 18.783L21 19V21C20.9997 21.2549 20.9021 21.5 20.7272 21.6854C20.5522 21.8707 20.313 21.9822 20.0586 21.9972C19.8042 22.0121 19.5536 21.9293 19.3582 21.7657C19.1627 21.6021 19.0371 21.3701 19.007 21.117L19 21V19C19 18.2348 18.7077 17.4985 18.1827 16.9417C17.6578 16.385 16.9399 16.0499 16.176 16.005L16 16H8C7.23479 16 6.49849 16.2923 5.94174 16.8173C5.38499 17.3422 5.04989 18.0601 5.005 18.824L5 19V21C4.99972 21.2549 4.90212 21.5 4.72715 21.6854C4.55218 21.8707 4.31305 21.9822 4.05861 21.9972C3.80416 22.0121 3.55362 21.9293 3.35817 21.7657C3.16271 21.6021 3.0371 21.3701 3.007 21.117L3 21V19C3.00007 17.7115 3.49754 16.4728 4.38866 15.5422C5.27978 14.6116 6.49575 14.0609 7.783 14.005L8 14H16ZM12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2ZM12 4C11.606 4 11.2159 4.0776 10.8519 4.22836C10.488 4.37913 10.1573 4.6001 9.87868 4.87868C9.6001 5.15726 9.37913 5.48797 9.22836 5.85195C9.0776 6.21593 9 6.60603 9 7C9 7.39397 9.0776 7.78407 9.22836 8.14805C9.37913 8.51203 9.6001 8.84274 9.87868 9.12132C10.1573 9.3999 10.488 9.62087 10.8519 9.77164C11.2159 9.9224 11.606 10 12 10C12.7956 10 13.5587 9.68393 14.1213 9.12132C14.6839 8.55871 15 7.79565 15 7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Users",
                    link: "/users"
                },
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M11.063 2.469C11.309 2.27225 11.6108 2.15796 11.9254 2.14234C12.2401 2.12673 12.5517 2.21058 12.816 2.382L12.937 2.469L17.249 5.919C17.4594 6.08715 17.6336 6.29605 17.7613 6.53319C17.889 6.77032 17.9675 7.0308 17.992 7.299L18 7.48V10H20C20.5046 9.99984 20.9906 10.1904 21.3605 10.5335C21.7305 10.8766 21.9572 11.3468 21.995 11.85L22 12V19.9C22.0001 20.1711 21.9002 20.4326 21.7193 20.6345C21.5385 20.8364 21.2894 20.9644 21.02 20.994L20.9 21H3.1C2.82894 21.0001 2.56738 20.9002 2.36548 20.7193C2.16358 20.5385 2.03557 20.2894 2.006 20.02L2 19.9V12C1.99984 11.4954 2.19041 11.0094 2.5335 10.6395C2.87659 10.2695 3.34684 10.0428 3.85 10.005L4 10H6V7.48C5.99998 7.21068 6.05436 6.94414 6.15987 6.69635C6.26537 6.44856 6.41984 6.22464 6.614 6.038L6.751 5.918L11.063 2.468V2.469ZM12 4.28L8 7.48V19H16V7.48L12 4.28ZM20 12H18V19H20V12ZM6 12H4V19H6V12ZM12 8C12.394 8 12.7841 8.0776 13.1481 8.22836C13.512 8.37912 13.8427 8.6001 14.1213 8.87868C14.3999 9.15725 14.6209 9.48797 14.7716 9.85195C14.9224 10.2159 15 10.606 15 11C15 11.394 14.9224 11.7841 14.7716 12.1481C14.6209 12.512 14.3999 12.8427 14.1213 13.1213C13.8427 13.3999 13.512 13.6209 13.1481 13.7716C12.7841 13.9224 12.394 14 12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11C9 10.2044 9.31607 9.44129 9.87868 8.87868C10.4413 8.31607 11.2044 8 12 8ZM12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11C11 11.2652 11.1054 11.5196 11.2929 11.7071C11.4804 11.8946 11.7348 12 12 12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Schools",
                    link: "/schools"
                },
                {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M10.537 2.164C10.9407 2.12726 11.3477 2.17274 11.7334 2.2977C12.1191 2.42265 12.4755 2.62448 12.781 2.891L12.931 3.031L20.753 10.854C21.2913 11.3924 21.6048 12.1154 21.6298 12.8763C21.6549 13.6373 21.3897 14.3793 20.888 14.952L20.753 15.096L15.096 20.753C14.5576 21.2913 13.8346 21.6048 13.0736 21.6298C12.3127 21.6549 11.5707 21.3897 10.998 20.888L10.854 20.753L3.02998 12.93C2.74346 12.6435 2.51795 12.3019 2.36705 11.9259C2.21615 11.5498 2.14299 11.1471 2.15198 10.742L2.16299 10.537L2.63498 5.352C2.69558 4.68378 2.97844 4.05517 3.43834 3.56662C3.89824 3.07808 4.50864 2.75781 5.17198 2.657L5.35098 2.636L10.536 2.164H10.537ZM10.845 4.153L10.718 4.156L5.53298 4.628C5.32034 4.6472 5.11943 4.73395 4.95965 4.87556C4.79986 5.01717 4.6896 5.20621 4.64498 5.415L4.62798 5.533L4.15599 10.718C4.13326 10.97 4.20687 11.2212 4.36198 11.421L4.44499 11.516L12.268 19.339C12.4402 19.5112 12.6693 19.6146 12.9123 19.6299C13.1553 19.6452 13.3956 19.5713 13.588 19.422L13.682 19.339L19.339 13.682C19.5112 13.5098 19.6146 13.2807 19.6299 13.0377C19.6452 12.7947 19.5712 12.5544 19.422 12.362L19.339 12.268L11.516 4.445C11.3372 4.26638 11.0975 4.16206 10.845 4.153ZM7.31699 7.318C7.59558 7.0394 7.92633 6.8184 8.29034 6.66763C8.65435 6.51685 9.04449 6.43924 9.43849 6.43924C9.83248 6.43924 10.2226 6.51685 10.5866 6.66763C10.9506 6.8184 11.2814 7.0394 11.56 7.318C11.8386 7.5966 12.0596 7.92734 12.2104 8.29135C12.3611 8.65536 12.4387 9.0455 12.4387 9.4395C12.4387 9.8335 12.3611 10.2236 12.2104 10.5876C12.0596 10.9517 11.8386 11.2824 11.56 11.561C10.9973 12.1237 10.2342 12.4398 9.43849 12.4398C8.64277 12.4398 7.87964 12.1237 7.31699 11.561C6.75433 10.9983 6.43823 10.2352 6.43823 9.4395C6.43823 8.64378 6.75433 7.88066 7.31699 7.318ZM10.146 8.732C10.0531 8.63909 9.9429 8.56538 9.82157 8.51507C9.70024 8.46476 9.57019 8.43884 9.43884 8.4388C9.30749 8.43875 9.17742 8.46457 9.05605 8.5148C8.93468 8.56502 8.8244 8.63865 8.73148 8.7315C8.63857 8.82434 8.56486 8.93458 8.51455 9.05591C8.46425 9.17724 8.43833 9.3073 8.43828 9.43864C8.43824 9.56999 8.46406 9.70006 8.51428 9.82143C8.56451 9.9428 8.63814 10.0531 8.73099 10.146C8.91849 10.3336 9.17286 10.4391 9.43813 10.4392C9.7034 10.4393 9.95784 10.334 10.1455 10.1465C10.3331 9.95899 10.4386 9.70462 10.4387 9.43935C10.4388 9.17408 10.3335 8.91964 10.146 8.732Z"
                              fill="#747474"/>
                    </svg>,
                    label: "Sponsors",
                    link: "/sponsors"
                }
            ]
        },
    ])

    const [searchStr, setSearchStr] = useState('')

    return (
        <Modal toggle={() => dispatch(showSearchMenuModal())}
               isOpen={store.showSearchMenuModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showSearchMenuModal())} style={{padding: 0}}>
                <div className="d-flex justify-content-between align-items-center pl-2 pr-2 pt-1 pb-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M10.5 2C9.1446 2.00012 7.80887 2.32436 6.60427 2.94569C5.39966 3.56702 4.3611 4.46742 3.57525 5.57175C2.78939 6.67609 2.27902 7.95235 2.08672 9.29404C1.89442 10.6357 2.02576 12.004 2.46979 13.2846C2.91382 14.5652 3.65766 15.7211 4.63925 16.6557C5.62084 17.5904 6.81171 18.2768 8.11252 18.6576C9.41333 19.0384 10.7864 19.1026 12.117 18.8449C13.4477 18.5872 14.6975 18.015 15.762 17.176L19.414 20.828C19.6026 21.0102 19.8552 21.111 20.1174 21.1087C20.3796 21.1064 20.6304 21.0012 20.8158 20.8158C21.0012 20.6304 21.1064 20.3796 21.1087 20.1174C21.111 19.8552 21.0102 19.6026 20.828 19.414L17.176 15.762C18.164 14.5086 18.7792 13.0024 18.9511 11.4157C19.123 9.82905 18.8448 8.22602 18.1482 6.79009C17.4517 5.35417 16.3649 4.14336 15.0123 3.29623C13.6597 2.44911 12.096 1.99989 10.5 2ZM4.00001 10.5C4.00001 8.77609 4.68483 7.12279 5.90382 5.90381C7.1228 4.68482 8.7761 4 10.5 4C12.2239 4 13.8772 4.68482 15.0962 5.90381C16.3152 7.12279 17 8.77609 17 10.5C17 12.2239 16.3152 13.8772 15.0962 15.0962C13.8772 16.3152 12.2239 17 10.5 17C8.7761 17 7.1228 16.3152 5.90382 15.0962C4.68483 13.8772 4.00001 12.2239 4.00001 10.5Z"
                              fill="#8840E6"/>
                    </svg>
                    <Input className="smm-search-input" type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}
                           style={{border: 0, background: 'transparent'}}/>
                    <div className="d-flex align-items-center">
                        <span>[esc]</span>
                        <Button.Ripple onClick={() => dispatch(showSearchMenuModal())}
                                       className='btn-icon rounded-circle'
                                       color='flat-danger'>
                            <X size={16}/>
                        </Button.Ripple>
                    </div>
                </div>
                <hr className="mt-0"/>
                <div className="pl-2 pr-2">
                    {
                        menuList.map(item => <div className="mb-1">
                            <p className="smm-menu-title" style={{marginBottom: 0}}>{item.title}</p>
                            {
                                item.mens.filter((item2) => item2.label.toLowerCase().includes(searchStr))
                                    .map(item1 => <div className="cursor-pointer d-flex align-items-center"
                                                       style={{height: 45}}
                                                       onClick={() => {
                                                           dispatch(showSearchMenuModal());
                                                           if (item1.link) {
                                                               history.push(item1.link)
                                                           } else {
                                                               dispatch(showCreateModal(true))
                                                           }
                                                       }}>
                                        {item1.icon}
                                        <span className="smm-menu-label" style={{marginLeft: 7}}>{item1.label}</span>
                                    </div>)
                            }
                        </div>)
                    }
                </div>

            </ModalBody>
        </Modal>
    );
};