import Peep from './Peep';

const Home = ({ peepData }) => {
    const { peeps, getError } = peepData;

    if (peeps.length > 0) {
        return (
            peeps.slice(0).reverse().map(peep => {
                const { _id, namePeep, lastNamePeep, username, timePeep, textPeep } = peep;

                const props = {
                    namePeep,
                    lastNamePeep,
                    username,
                    timePeep,
                    textPeep
                };

                return (
                    <Peep
                        key={_id}
                        props={props}
                    />
                );
            })
        );
    } else {
        return (
            <>
                <h1 className="error">{getError.message}</h1>
            </>
        );
    };
};


export default Home;


