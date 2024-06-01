import { Link } from 'react-router-dom';
import './index.scss';
interface Actors {
    actor_id: number;
    name: string;
    character: string;
    avatar: string;
}

interface FilmDetailCastProps {
    filmDetail: {
        actors: Actors[];
    };
}

export const FilmDetailCast: React.FC<FilmDetailCastProps> = ({ filmDetail }) => {
    const actors = filmDetail.actors || [];
    return (
        <div className="actor text-base mt-8 ml-3">
            <ul className="grid grid-cols-5 gap-x-36 gap-y-12 ml-[-10px] mt-6">
                {actors.map((actor) => (
                    <Link to={`/actor/${actor.actor_id}`} key={actor.actor_id}>
                        <li className="flex gap-3 items-center">
                            <div className="shrink-0 max-w-[60px] h-[65px]">
                                <img
                                    className="object-cover w-[65px] h-[65px] rounded-full"
                                    src={actor.avatar}
                                    alt={actor.name}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="actor-name font-medium">{actor.name}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
