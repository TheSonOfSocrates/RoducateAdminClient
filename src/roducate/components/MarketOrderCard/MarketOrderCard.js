import './MarketOrderCard.css'
import {Item, Menu, useContextMenu} from "react-contexify";

const MarketOrderCard = () => {

    const {show} = useContextMenu({
        id: 'mrc-rating-menu'
    })

    const logo = require(`@src/assets/images/svg/market-order.svg`).default

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            padding: '20px 10px 10px 20px',
            borderRadius: '15px'
        }}>
            <div className="d-flex justify-content-between">
                <div>
                    <p className="mrc-title">Total Orders</p>
                    <div className="mrc-compare-back pl-1 pr-1 ml-0 cursor-pointer" onClick={show}>
                        <span className="mrc-compare-title">Last Month</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M10.0303 11.7803C9.88962 11.9209 9.69889 11.9999 9.50001 11.9999C9.30114 11.9999 9.11041 11.9209 8.96976 11.7803L4.72701 7.53751C4.65538 7.46833 4.59824 7.38557 4.55894 7.29407C4.51963 7.20256 4.49894 7.10415 4.49808 7.00456C4.49721 6.90498 4.51619 6.80622 4.5539 6.71405C4.59161 6.62188 4.6473 6.53814 4.71772 6.46772C4.78814 6.3973 4.87188 6.34161 4.96405 6.3039C5.05622 6.26619 5.15498 6.24721 5.25456 6.24808C5.35415 6.24894 5.45256 6.26963 5.54407 6.30894C5.63557 6.34824 5.71833 6.40538 5.78751 6.47701L9.50001 10.1895L13.2125 6.47701C13.354 6.34039 13.5434 6.2648 13.7401 6.26651C13.9367 6.26822 14.1248 6.34709 14.2639 6.48615C14.4029 6.6252 14.4818 6.81331 14.4835 7.00996C14.4852 7.20661 14.4096 7.39606 14.273 7.53751L10.0303 11.7803Z"
                                  fill="#8840E6"/>
                        </svg>
                    </div>
                    <div className="pt-1">
                        <span className="mrc-user-cont">4.25K</span>
                        <span className="mrc-percent">+15.6%</span>
                    </div>
                </div>

                <img src={logo}/>
            </div>
            <Menu id='mrc-rating-menu'>
                <Item>Today</Item>
                <Item>Last Week</Item>
                <Item>Last Month</Item>
                <Item>Last Yar</Item>
            </Menu>
        </div>
    )
}

export default MarketOrderCard