import './ResourceCard.css'

const ResourceCard = ({title, description, icon, onClick}) => {
    return (
        <div className="d-flex justify-content-between resource-card align-items-center" onClick={onClick}>
            <div style={{margin: '20px 0'}}>
                <p className="resource-card-title">{title}</p>
                <p className="resource-card-des">{description}</p>
                <div className="d-flex justify-content-center resource-card-add-content">
                    <span className="resource-card-btn">View</span>&nbsp;&nbsp;&nbsp;
                    <svg className="resource-card-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.03 9.41083C2.87377 9.5671 2.78601 9.77903 2.78601 10C2.78601 10.221 2.87377 10.4329 3.03 10.5892L7.74417 15.3033C7.90134 15.4551 8.11184 15.5391 8.33033 15.5372C8.54883 15.5353 8.75784 15.4477 8.91235 15.2932C9.06686 15.1387 9.1545 14.9297 9.15639 14.7112C9.15829 14.4927 9.0743 14.2822 8.9225 14.125L5.63083 10.8333H16.6667C16.8877 10.8333 17.0996 10.7455 17.2559 10.5893C17.4122 10.433 17.5 10.221 17.5 10C17.5 9.77898 17.4122 9.56702 17.2559 9.41074C17.0996 9.25446 16.8877 9.16666 16.6667 9.16666H5.63083L8.9225 5.875C9.0743 5.71783 9.15829 5.50733 9.15639 5.28883C9.1545 5.07033 9.06686 4.86132 8.91235 4.70682C8.75784 4.55231 8.54883 4.46467 8.33033 4.46277C8.11184 4.46087 7.90134 4.54487 7.74417 4.69666L3.03 9.41083Z"
                            fill="#8840E6"/>
                    </svg>
                    &nbsp;&nbsp;&nbsp;
                    <span className="resource-card-add-content-text">Add Content</span>
                </div>
            </div>
            <img src={icon}/>
        </div>
    )
}

export default ResourceCard