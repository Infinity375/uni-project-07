import { useState } from "react"
import { useParams } from "react-router-dom";
import commentsApi from "../../api/comments-api";
import { useGetOneGames } from "../../hooks/usegames";


export default function GameDetails() {
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const { gameId } = useParams();
    const [game, setGame] = useGetOneGames(gameId);

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentsApi.create(gameId, username, comment);

        setGame(prevState => ({
            ...prevState,
            comments: {
                ...prevState.comments,
                [newComment._id]: newComment,
            }
        }));

    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.description}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments && Object.values(game.comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p>User: {comment.username}</p>
                                <p>Content: {comment.text}</p>
                            </li>
                        ))}


                    </ul>

                </div>

                {/*<div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>*/}

            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Pwsho"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>

                    <input
                        className="btn
                    submit"
                        type="submit"
                        value="Add Comment" />
                </form>
            </article>

        </section>
    )
}