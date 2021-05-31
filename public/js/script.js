const cookie = document.getElementById("cookie");
const count = document.getElementById("count");
const result = document.getElementById("result");
const timer = document.getElementById("countdown");
const scores = document.getElementById("scores");
const filter = document.getElementById("timeframe-settings");
const range = document.getElementById("accuracy");
const difficulty = document.getElementById("difficulty");
const options = ["1", "5", "10", "15"];
// Click Speed Game
const game = {
  cps: 0,
  trial: 0,
  timeframe: 10,
  elapsed: 0,
  progress: true,
  difficulty: 400,
};

range.addEventListener("input", (e) => setDifficulty(e.target.value));

const setDifficulty = (value) => {
  cookie.style.height = `${value}px`;
  cookie.style.width = `${value}px`;
  if (value === "5") value = "impossible";
  else if (value === "600") value = "noob";
  else if (value === "400") value = "normal";
  game.difficulty = value;
  difficulty.innerHTML = `Difficulty: ${value}`;
};

setDifficulty(range.value);

const changecountdown = (countdown) =>
  (timer.innerHTML = `${countdown.toFixed(2)} Seconds Remaining`);

const Handler = (selected_option) => {
  game.timeframe = parseInt(selected_option, 10);
  changecountdown(game.timeframe);
};

filter.addEventListener("change", (e) =>
  Handler(options[options.indexOf(e.target.value)])
);

Handler(options[options.indexOf(filter.value)]);

const changecps = (cps) => (count.innerHTML = `${cps} clicks`);

const appendScores = (trial, score) => {
  scores.insertAdjacentHTML(
    "beforeend",
    `
    <div>
    <a>Trial: ${trial}<br>Score: ${score.toFixed(2)} cps</a>
    <br>
    <a>Setting: ${game.timeframe}s</a>
    <br>
    <a id="trial${trial}">Difficulty: ${game.difficulty}</a>
    </div>
    <br>
    `
  );
  document.getElementById(`trial${trial}`).scrollIntoView(true);
};

cookie.ondragstart = () => false;

const reset = (game, cps) => {
  ++game.trial;
  appendScores(game.trial, cps / game.timeframe);
  changecountdown(0);

  game.cps = 0;
  game.elapsed = 0;
  game.progress = true;
};

const clickerTimer = (countdown) => {
  if (!game.progress) return;
  game.progress = false;
  const run = setInterval(() => {
    changecountdown(countdown);
    countdown -= 0.1;
    if (countdown <= 0.1) {
      clearInterval(run);
      reset(game, game.cps);
      return;
    }

    game.elapsed += 0.1;
    result.innerHTML = `${(game.cps / game.elapsed).toFixed(
      2
    )} clicks per second`;
  }, 100);
};

cookie.addEventListener("click", (e) => {
  changecps(++game.cps);
  clickerTimer(game.timeframe);
});
