import "./hero-display.css"
import { useNavigate } from 'react-router-dom';
import alex from '../../img/Axel.png'
import nova from '../../img/Nova.png'
import luna from '../../img/luna.png'

export default function HeroDisplay({ hero }) {
    const navigate = useNavigate()
    const getImage = (hero) => {
        switch (hero?.name) {
            case 'Alex 7.2': return alex;
            case 'Nova 9.6': return nova;
            case 'LUNA 3.8': return luna
        }
    }
    console.log(hero?.image)
    return (

        < div className="hero-display" >
            <div className="hero-platform">
                <img src={getImage(hero)} className="hero-image" />
            </div>

        </div>
    )
}
