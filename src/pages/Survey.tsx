import { useNavigate } from "react-router-dom";

export function Survey() {
  const navigate = useNavigate();

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.target;
    let answer1 = form.question1.value;
    let answer2 = form.question2.value;
    let answer3 = form.question3.value;
    let answer4 = form.question4.value;
    let answer5 = form.question5.value;
    let answer6 = form.question6.value;

    let survey = {
      userId: localStorage.id,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
    };

    fetch(`http://localhost:3005/characteristics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survey),
    })
      .then((response) => response.json())
      .then((survey) => {
        console.log(survey);
        navigate("/home");
      });
  }

  return (
    <div>
      <h2>Survey</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="question1">What is your dream pet?</label>
        <select name="question1" id="question1" required>
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
        </select>

        <label htmlFor="question2">What is your favorite rainbow color?</label>
        <select name="question2" id="question2" required>
          <option value="">--Please choose an option--</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>

        <label htmlFor="question3">
          From one to five, how attractive do you consider yourself?
        </label>
        <select name="question3" id="question3" required>
          <option value="">--Please choose an option--</option>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
          <option value="four">Four</option>
          <option value="five">Five</option>
        </select>

        <label htmlFor="question4">Are you spontaneous or disciplined?</label>
        <select name="question4" id="question4" required>
          <option value="">--Please choose an option--</option>
          <option value="disciplined">
            I always plan everything in advance
          </option>
          <option value="spontaneous">
            I have a daily routine, but I'm always in for a new adventure
          </option>
          <option value="crazy">
            Always lose my way on purpose so I can experience new things
          </option>
          <option value="craycray">Adventure? Thats my middle name...</option>
        </select>

        <label htmlFor="question5">What is your love language?</label>
        <select name="question5" id="question5" required>
          <option value="">--Please choose an option--</option>
          <option value="ew">Receiving gifts</option>
          <option value="cuddles">Cuddles</option>
          <option value="olaf">Hugss</option>
          <option value="parrot">Talking</option>
        </select>

        <label htmlFor="question6">
          What would be your ideal location for a date?
        </label>
        <select name="question6" id="question6" required>
          <option value="">--Please choose an option--</option>
          <option value="expensive">Expensive restaurant</option>
          <option value="romantic">Rooftop candlelit dinner</option>
          <option value="adventurous">The beach</option>
          <option value="oldtimer">Walk in the park</option>
          <option value="nerd">Bookstore</option> {/* but in a good way xp */}
          <option value="boring">Museum</option>
        </select>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
