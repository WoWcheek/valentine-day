import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
    const { width, height } = useWindowSize();

    const [answeredYes, setAnsweredYes] = useState(false);
    const [noCount, setNoCount] = useState(0);

    function handleYes(e) {
        e.preventDefault();
        setAnsweredYes(true);
    }

    function handleNo(e) {
        e.preventDefault();
        setNoCount((x) => x + 1);
    }

    useEffect(
        function () {
            var yesBtn = document.getElementById("yes-btn");

            yesBtn.style.height = `${3 + noCount}rem`;
            yesBtn.style.width = `${5.5 + noCount}rem`;

            yesBtn.style.fontSize = `${1 + 0.5 * noCount}rem`;
        },
        [noCount]
    );

    return (
        <>
            <Confetti
                numberOfPieces={5000}
                run={answeredYes}
                recycle={false}
                width={width}
                height={height - 1}
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
                        {noCount > 0 && <p>(You were wrong {noCount} times)</p>}
                    </>
                ) : (
                    <label>Will you be my Valentine ?</label>
                )}
                <div
                    className="buttons"
                    style={{ display: `${answeredYes && "none"}` }}
                >
                    <button id="yes-btn" onClick={handleYes}>
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
