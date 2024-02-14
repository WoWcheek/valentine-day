import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
    const { width, height } = useWindowSize();

    const [noCount, setNoCount] = useState(0);
    const [answeredYes, setAnsweredYes] = useState(false);
    const [confettiComplete, setConfettiComplete] = useState(false);

    function handleYes(e) {
        e.preventDefault();
        setAnsweredYes(true);
    }

    function handleNo(e) {
        e.preventDefault();
        setNoCount((x) => x + 1);
    }

    useEffect(() =>
        document.addEventListener("keydown", (e) => {
            if (answeredYes && confettiComplete && e.key === "Escape")
                location.reload();
        })
    );

    const yesBtnStyles = {
        height: `${3 + noCount}rem`,
        width: `${5.5 + 1.5 * noCount}rem`,
        fontSize: `${1 + 0.5 * noCount}rem`
    };

    return (
        <>
            <Confetti
                numberOfPieces={5000}
                run={answeredYes}
                recycle={false}
                width={width}
                height={height - 1}
                onConfettiComplete={() => setConfettiComplete(true)}
            />
            <form>
                {answeredYes ? (
                    <img src="./img/happy-dog.gif" alt="happy dog" />
                ) : noCount === 0 ? (
                    <img src="./img/valentine-bear.gif" alt="valentine bear" />
                ) : noCount < 5 ? (
                    <img src="./img/sad-dog.gif" alt="sad dog" />
                ) : noCount < 10 ? (
                    <img src="./img/angry-dog.gif" alt="angry dog" />
                ) : (
                    <img src="./img/shocked-dog.gif" alt="shocked dog" />
                )}
                {answeredYes ? (
                    <>
                        <label>Of course you do 😼</label>
                        {noCount > 0 && (
                            <p className="mistakes">
                                (You were wrong {noCount}{" "}
                                {noCount === 1 ? "time" : "times"})
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <label>Will you be my Valentine ?</label>
                        {noCount >= 5 && noCount < 10 && (
                            <p className="details">You better say yes 😠</p>
                        )}
                        {noCount >= 10 && noCount < 15 && (
                            <p className="details">Really? 😲</p>
                        )}
                        {noCount >= 15 && (
                            <p className="details">Pleeease say yes 😭</p>
                        )}
                    </>
                )}
                <div
                    className="buttons"
                    style={{ display: `${answeredYes ? "none" : "flex"}` }}
                >
                    <button
                        id="yes-btn"
                        onClick={handleYes}
                        style={yesBtnStyles}
                    >
                        Yes
                    </button>
                    <button id="no-btn" onClick={handleNo}>
                        No
                    </button>
                </div>
            </form>
        </>
    );
}

export default App;
