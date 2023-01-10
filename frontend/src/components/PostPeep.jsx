import { useState } from 'react';
import PeepModel from '../utils/PeepModel';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const PostPeep = ({ setPeeps, getPeeps, user, url }) => {

    const [peepText, setPeepText] = useState(``);
    const [postError, setPostError] = useState({ message: `` });
    const [postedPeep, setPostedPeep] = useState(false);
    const namePeep = user.namePeep;
    const lastNamePeep = user.lastNamePeep;
    const username = user.username;

    const textHandler = e => {
        setPeepText(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        const date = new Date().toISOString();
        let postingPeep = new PeepModel(namePeep, lastNamePeep, username, date, peepText);
        postPeep(postingPeep);
    };

    const postPeep = async peep => {
        try {
            await axios.post(`${url}/post`, peep);
            setPostedPeep(true);
            resetPeep();
        }
        catch (err) {
            setPostError({ message: `Peep failed to post: ${err.message}` });
            alert(postError);
        }
        finally {
            setPeeps(await getPeeps());
        }
    };

    const resetPeep = () => setPeepText(``);

    return (
        <>
            {postedPeep && <Navigate to={'/'} />}
            <h3 className="Auth-form-title">What's on your mind?</h3>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={submitHandler} data-testid="form">
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <textarea
                                className="form-control mt-1"
                                placeholder="Type your peep here..."
                                data-testid="peep" id="create-peep" name="peep" variant="outlined" onChange={textHandler} required
                            />
                            <br />
                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Peep!
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
};

export default PostPeep;