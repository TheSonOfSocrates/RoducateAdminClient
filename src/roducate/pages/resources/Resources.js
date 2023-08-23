import {useState} from "react";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import {useHistory} from 'react-router-dom';

const Resources = () => {
    const history = useHistory();

    const icon_study = require(`@src/assets/images/svg/resource-study.svg`).default
    const icon_mock = require(`@src/assets/images/svg/resource-mock.svg`).default
    const icon_video = require(`@src/assets/images/svg/resource-video.svg`).default
    const icon_exam = require(`@src/assets/images/svg/resource-exam.svg`).default
    const icon_podcast = require(`@src/assets/images/svg/resource-podcast.svg`).default
    const icon_dig = require(`@src/assets/images/svg/resource-dig.svg`).default
    const icon_game = require(`@src/assets/images/svg/resource-game.svg`).default
    const icon_life = require(`@src/assets/images/svg/resource-life.svg`).default

    const [items, setItems] = useState([
        {
            title: "Study",
            description: "Create and manage study content.",
            icon: icon_study,
            onClick: () => history.push('/apps/resources/study')

        },
        {
            title: "Mock Exams",
            description: "Set mock exam questions.",
            icon: icon_mock,
            onClick: () => history.push('/apps/resources/mock_exams')
        },
        {
            title: "Videos",
            description: "Upload and manage video content.",
            icon: icon_video,
            onClick: () => history.push('/apps/resources/videos')
        },
        {
            title: "Exam Success",
            description: "Prepare study plans for exam.",
            icon: icon_exam,
            onClick: () => history.push('/apps/resources/exam_success')
        }, {
            title: "Podcasts",
            description: "Upload and manage podcast content.",
            icon: icon_podcast,
            onClick: () => history.push('/apps/resources/podcasts')
        }, {
            title: "Digiprenuer",
            description: "Create and manage courses and plans.",
            icon: icon_dig,
            onClick: () => history.push('/apps/resources/videos')
        },
        {
            title: "Games",
            description: "Add and manage games",
            icon: icon_game,
            onClick: () => history.push('/apps/resources/games')
        },
        {
            title: "Life Skills",
            description: "Manage life skills video content.",
            icon: icon_life,
            onClick: () => history.push('/apps/resources/lifeskills')
        }
    ])

    return (
        <div>
            <div className="row">
                {items.map((item) => <div className="col-4">
                    <ResourceCard title={item.title} description={item.description}
                                  icon={item.icon} onClick={item.onClick}/>
                </div>)}
            </div>
        </div>
    )
}

export default Resources
