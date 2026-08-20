const AXES = ["verification", "question", "drive", "alignment"];

const scenarios = {
  planning: {
    mission: "MISSION 01", title: "출시 2주 전",
    role: "당신은 기획/운영 담당자입니다. 회의를 따라가며, 당신이라면 어떻게 대응할지 선택해주세요.",
    situation: "신규 기능 출시를 앞두고 마지막 범위를 조정하는 회의입니다.",
    questions: [
      { title: "신규 기능 출시 범위 조정", messages: [{ side: "right", who: "PM", text: "핵심 플로우는 구현할 수 있을 것 같습니다. 다만 자동화 방식으로 가려면 기존 API 구조를 조금 건드려야 합니다." }, { side: "left", who: "Developer", text: "기술적으로는 가능하지만 예외 케이스가 생길 수 있고, 나중에 구조를 다시 바꿔야 할 수도 있습니다." }], answers: [{ text: "일단 이번 릴리즈에 넣어보죠.", score: [0, 0, 3, 1] }, { text: "이후에 발생할 작업과 리스크부터 확인해보죠.", score: [3, 2, 0, 1] }] },
      { title: "신규 기능 출시 범위 조정", messages: [{ side: "right", who: "PM", text: "출시 일정은 이미 공유된 상태라, 가능한 한 이번 범위에 포함하고 싶습니다." }, { side: "left", who: "Developer", text: "정확한 작업량은 구조를 한번 확인해야 합니다. 지금 산정하면 실제 개발 과정에서 변수가 생길 가능성이 높아요." }], answers: [{ text: "일정을 먼저 정해서 공유받는다.", score: [0, 1, 3, 1] }, { text: "작업 범위와 발생 가능한 리스크를 먼저 확인한다.", score: [3, 2, 0, 1] }] },
      { title: "신규 기능 출시 범위 조정", messages: [{ side: "right", who: "PM", text: "이번 기능은 고객 요청이 많아서 가능하면 이번 릴리즈에 포함하고 싶습니다." }, { side: "left", who: "Developer", text: "가능 여부보다 현재 구조에서 어떤 방식으로 구현하느냐가 중요할 것 같습니다." }], answers: [{ text: "가능한 범위부터 정해서 이번 릴리즈에 진행한다.", score: [1, 0, 3, 2] }, { text: "기술적으로 안전한 범위를 먼저 합의한다.", score: [2, 1, 1, 3] }] },
    ],
  },
  design: {
    mission: "MISSION 02", title: "이 디자인, 정말 좋은 걸까?",
    role: "당신은 디자인/콘텐츠 담당자입니다. 회의를 따라가며, 당신이라면 어떻게 대응할지 선택해주세요.",
    situation: "신규 홈 화면을 개편했습니다. 사용자 반응과 실제 행동 데이터가 조금 다르게 나타나고 있습니다.",
    questions: [
      { title: "홈 화면 A/B 테스트 결과 리뷰", messages: [{ side: "right", who: "Design", text: "정보량을 줄이고 핵심 기능을 강조했습니다. 사용자 테스트에서도 화면이 깔끔해졌다는 반응이 많았습니다." }, { side: "left", who: "Data", text: "실제 행동 데이터는 조금 다릅니다. 클릭률은 올랐지만 다음 단계 이탈률도 증가했습니다." }], answers: [{ text: "첫 화면의 개선 효과는 확인됐으니 다음 단계부터 개선한다.", score: [0, 0, 3, 1] }, { text: "이탈이 증가한 이유부터 확인해본다.", score: [2, 3, 0, 1] }] },
      { title: "홈 화면 A/B 테스트 결과 리뷰", messages: [{ side: "left", who: "Data", text: "이번 테스트는 기존 사용자 비중이 높았습니다." }, { side: "right", who: "Design", text: "신규 사용자에게도 같은 결과가 나오는지는 아직 확인이 필요하겠네요." }], answers: [{ text: "현재 데이터로 우선 의사결정을 진행한다.", score: [0, 0, 3, 1] }, { text: "신규 사용자의 반응을 추가로 확인한다.", score: [3, 2, 0, 1] }] },
      { title: "홈 화면 A/B 테스트 결과 리뷰", messages: [{ side: "right", who: "Design", text: "추가 테스트를 하면 더 정확하게 볼 수 있을 것 같습니다." }, { side: "left", who: "Data", text: "다만 테스트 기간이 길어지면 이번 달 출시 일정에는 영향을 줄 수 있습니다." }], answers: [{ text: "일정을 우선해 현재 결과를 기준으로 출시한다.", score: [0, 0, 3, 1] }, { text: "출시에 영향을 최소화하며 추가 검증 방법을 찾아본다.", score: [3, 2, 0, 2] }] },
    ],
  },
  development: {
    mission: "MISSION 03", title: "고객이 원하는 건 기능 하나가 아닐지도 모릅니다.",
    role: "당신은 개발/기술 담당자입니다. 회의를 따라가며, 당신이라면 어떻게 대응할지 선택해주세요.",
    situation: "대형 고객사의 기능 요청이 들어왔습니다. 영업팀과 개발팀이 처음 요구사항을 맞추는 자리입니다.",
    questions: [
      { title: "고객사 자동화 기능 요청", messages: [{ side: "right", who: "Sales", text: "고객사에서 업무 자동화를 가장 우선적으로 원하고 있습니다. 매주 데이터를 입력하는 과정이 너무 번거롭다고 합니다." }, { side: "left", who: "Developer", text: "자동화라고 하면 범위가 넓습니다. 데이터를 가져오는 건지, 입력 자체를 자동화하는 건지 확인해야 합니다." }], answers: [{ text: "고객 요구사항을 다시 받아올 때까지 개발 검토를 보류한다.", score: [3, 2, 0, 1] }, { text: "현재 자동화할 수 있는 후보 업무부터 정리한다.", score: [1, 1, 3, 3] }] },
      { title: "고객사 자동화 기능 요청", messages: [{ side: "right", who: "Sales", text: "고객이 구체적인 기능까지 정리해서 말한 건 아닙니다. 반복 작업을 줄여달라는 요구가 가장 컸어요." }, { side: "left", who: "Developer", text: "그 정도 정보만으로는 개발 범위를 잡기가 어렵습니다." }], answers: [{ text: "요구사항을 다시 구체적으로 받아온다.", score: [3, 3, 0, 1] }, { text: "현재 상황에서 가능한 해결 방법부터 제안한다.", score: [1, 1, 3, 3] }] },
      { title: "고객사 자동화 기능 요청", messages: [{ side: "right", who: "Sales", text: "고객은 다음 미팅에서 바로 가능 여부와 일정을 듣고 싶어 합니다." }, { side: "left", who: "Developer", text: "가능한 범위부터 제안하는 편이 좋을 것 같습니다." }], answers: [{ text: "요구사항이 명확해질 때까지 일정을 약속하지 않는다.", score: [3, 2, 0, 1] }, { text: "기술적으로 가능한 범위를 정리해 고객에게 선택지를 제시한다.", score: [1, 1, 3, 3] }] },
    ],
  },
};

const hints = {
  planning: { icon: "</>", speaker: "Developer", quote: "현재 구조에서는 예외 케이스가 꽤 많이 생길 수 있습니다.", meaning: "현재 기능은 구현 가능하지만 추가적인 예외 처리가 필요합니다.", impact: "출시 일정과 기능 범위를 조정해야 할 수 있습니다.", question: "이번 릴리즈에서 반드시 포함할 범위는 어디까지인가요?" },
  design: { icon: "◎", speaker: "Data", quote: "클릭률은 올라갔지만 다음 단계 이탈 비율도 같이 증가했습니다.", meaning: "첫 화면의 관심은 높아졌지만 다음 단계에서 사용자가 이탈하고 있습니다.", impact: "첫 화면뿐 아니라 이후 사용자 흐름까지 개선해야 할 수 있습니다.", question: "사용자가 가장 많이 이탈하는 구간은 어디인가요?" },
  development: { icon: "▣", speaker: "Sales", quote: "고객이 반복 업무를 줄여달라고 했지만 구체적인 기능까지 정리한 건 아닙니다.", meaning: "고객의 핵심 요구는 반복 업무 감소이지만 구체적인 기능 범위는 정해지지 않았습니다.", impact: "요구사항이 불명확하면 개발 범위와 일정을 확정하기 어렵습니다.", question: "고객이 가장 먼저 줄이고 싶은 업무는 무엇인가요?" },
};

const results = {
  risk: ["🛡️", "리스크 탐지형", "결정하기 전에 문제와 변수를 먼저 확인합니다.", "예상하지 못한 문제와 변수를 미리 발견하고 의사결정의 위험을 줄입니다.", "가능한 위험에 집중하다 보면 실행할 수 있는 기회까지 놓칠 수 있습니다.", "수많은 정보와 리스크 중 지금 내 역할에 필요한 핵심 맥락과 영향부터 확인할 수 있습니다."],
  confirm: ["🔍", "확인형", "애매한 부분을 그냥 넘기지 않습니다.", "중요한 정보와 리스크를 꼼꼼하게 확인하고 놓친 부분을 지나치지 않습니다.", "확인해야 할 정보가 많아질수록 결정이 늦어질 수 있습니다.", "회의 중 필요한 정보만 빠르게 확인하고 지금 내게 중요한 의미와 영향을 파악할 수 있습니다."],
  drive: ["⚡", "추진형", "일단 결정하고 앞으로 나아갑니다.", "빠르게 결정을 내리고 아이디어를 실제 행동으로 옮기는 데 강합니다.", "빠르게 결정하는 과정에서 중요한 리스크나 맥락을 놓칠 수 있습니다.", "빠르게 판단해야 하는 순간에도 놓치기 쉬운 핵심 맥락과 리스크를 확인할 수 있습니다."],
  alignment: ["🤝", "조율형", "서로 다른 의견을 맞추는 데 집중합니다.", "서로 다른 관점을 연결하고 팀이 함께 움직일 합의점을 찾습니다.", "다양한 의견을 고려하다 보면 결정해야 할 핵심이 흐려질 수 있습니다.", "다양한 의견 속에서 내 역할과 관련된 핵심 정보와 결정 포인트를 파악할 수 있습니다."],
  proposal: ["💡", "제안형", "회의에서 새로운 가능성을 빠르게 찾아냅니다.", "문제를 다양한 관점에서 바라보고 새로운 아이디어와 해결책을 제안합니다.", "아이디어가 많아질수록 지금 결정해야 할 핵심이 흐려질 수 있습니다.", "다양한 아이디어 속에서도 현재 회의의 핵심 맥락과 결정 내용을 놓치지 않도록 도와줍니다."],
};

const state = { role: null, question: 0, scores: [0, 0, 0, 0], locked: false };

let clickAudioContext;
let clickSoundIndex = 0;
let soundEnabled = true;
let resultCelebrationAnimation = null;
let resultCelebrationToken = 0;
try { soundEnabled = localStorage.getItem("synq-sfx") !== "off"; } catch {}
const clickSoundPool = typeof Audio === "undefined"
  ? []
  : Array.from({ length: 4 }, () => {
      const sound = new Audio("./assets/figma-2x/button-click.wav");
      sound.preload = "auto";
      sound.volume = 0.35;
      return sound;
    });

function playSynthClickSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    clickAudioContext ||= new AudioContextClass();
    if (clickAudioContext.state === "suspended") clickAudioContext.resume();
    const now = clickAudioContext.currentTime;
    const oscillator = clickAudioContext.createOscillator();
    const gain = clickAudioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(620, now);
    oscillator.frequency.exponentialRampToValueAtTime(330, now + 0.055);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    oscillator.connect(gain);
    gain.connect(clickAudioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  } catch {
    // Sound feedback is optional when the browser blocks Web Audio.
  }
}

function playClickSound() {
  if (!soundEnabled) return;
  if (!clickSoundPool.length) {
    playSynthClickSound();
    return;
  }
  const sound = clickSoundPool[clickSoundIndex % clickSoundPool.length];
  clickSoundIndex += 1;
  sound.currentTime = 0;
  const playback = sound.play();
  if (playback?.catch) playback.catch(playSynthClickSound);
}

function updateSoundToggle() {
  const toggle = document.getElementById("sound-toggle");
  toggle.setAttribute("aria-pressed", String(soundEnabled));
  toggle.setAttribute("aria-label", soundEnabled ? "효과음 끄기" : "효과음 켜기");
  toggle.querySelector(".sound-toggle__label").textContent = soundEnabled ? "효과음 켜짐" : "효과음 꺼짐";
  toggle.querySelector(".sound-toggle__mark").textContent = soundEnabled ? "♪" : "×";
}

function toggleSound() {
  if (soundEnabled) {
    playClickSound();
    soundEnabled = false;
  } else {
    soundEnabled = true;
    playClickSound();
  }
  try { localStorage.setItem("synq-sfx", soundEnabled ? "on" : "off"); } catch {}
  updateSoundToggle();
}

function stopResultCelebration() {
  resultCelebrationToken += 1;
  if (resultCelebrationAnimation) {
    resultCelebrationAnimation.destroy();
    resultCelebrationAnimation = null;
  }
  const host = document.getElementById("result-celebration");
  if (!host) return;
  host.replaceChildren();
  host.hidden = true;
}

function playResultCelebration(resultKey) {
  stopResultCelebration();
  const host = document.getElementById("result-celebration");
  const resultScreen = document.querySelector('[data-screen="result"]');
  const token = resultCelebrationToken;
  if (!host || !window.lottie || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  host.hidden = false;
  host.dataset.result = resultKey;
  requestAnimationFrame(() => {
    if (token !== resultCelebrationToken || resultScreen.hidden) return;
    const animation = window.lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "./assets/Congratulation_vivid.json",
      rendererSettings: { preserveAspectRatio: "xMidYMid slice", progressiveLoad: true },
    });
    resultCelebrationAnimation = animation;
    animation.addEventListener("data_failed", () => {
      if (resultCelebrationAnimation === animation) stopResultCelebration();
    });
    window.setTimeout(() => {
      if (token !== resultCelebrationToken || resultCelebrationAnimation !== animation) return;
      animation.destroy();
      resultCelebrationAnimation = null;
      host.replaceChildren();
      host.hidden = true;
    }, 5600);
  });
}

function show(name) {
  let activeScreen;
  if (name !== "result") stopResultCelebration();
  document.getElementById("sound-toggle").hidden = name !== "start";
  document.querySelectorAll("[data-screen]").forEach((screen) => {
    const active = screen.dataset.screen === name;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
    if (active) activeScreen = screen;
  });
  requestAnimationFrame(() => {
    activeScreen.tabIndex = -1;
    activeScreen.focus({ preventScroll: true });
  });
}

function renderBriefing() {
  const item = scenarios[state.role];
  const branch = { planning: "a", design: "b", development: "c" }[state.role];
  const art = document.getElementById("briefing-art");
  art.src = `./assets/figma-clean/002-${branch}.png`;
  art.alt = `${item.mission}. ${item.title}. ${item.role} ${item.situation}`;
  document.getElementById("mission-label").textContent = item.mission;
  document.getElementById("briefing-title").textContent = item.title;
  document.getElementById("briefing-role").textContent = item.role;
  document.getElementById("briefing-situation").textContent = item.situation;
}

function renderQuestion() {
  const item = scenarios[state.role].questions[state.question];
  const branch = { planning: "c", design: "b", development: "a" }[state.role];
  const frameNumber = String(state.question + 3).padStart(3, "0");
  const art = document.getElementById("question-art");
  art.src = `./assets/figma-2x/${frameNumber}-${branch}.png`;
  art.alt = `${item.title}. 질문 ${state.question + 1}/3. 두 선택지 중 나의 회의 방식에 가까운 답을 고르세요.`;
  const avatar = document.getElementById("question-avatar-svg");
  const avatarOverlays = {
    planning: [
      { file: "avatar-you.svg", left: 76.63, top: 36.23, width: 4.86, height: 7.23 },
      null,
      { file: "avatar-you.svg", left: 76.63, top: 29.79, width: 4.86, height: 7.23 },
    ],
    design: [
      { file: "avatar-researcher.svg", left: 17.78, top: 45.02, width: 5.42, height: 7.23 },
      { file: "avatar-researcher.svg", left: 17.78, top: 38.09, width: 5.42, height: 7.23 },
      { file: "avatar-researcher.svg", left: 17.78, top: 42.92, width: 5.42, height: 7.23 },
    ],
    development: [
      { file: "avatar-sales.svg", left: 19.44, top: 30.96, width: 4.86, height: 7.32 },
      { file: "avatar-sales.svg", left: 19.44, top: 33.06, width: 4.86, height: 7.32 },
      { file: "avatar-sales.svg", left: 19.44, top: 41.75, width: 4.86, height: 7.32 },
    ],
  };
  const avatarOverlay = avatarOverlays[state.role][state.question];
  const secondaryAvatar = document.getElementById("question-avatar-secondary-svg");
  const secondaryOverlays = {
    planning: [
      { file: "avatar-developer.svg", left: 18.61, top: 27.55, width: 4.86, height: 6.35 },
      { file: "avatar-developer.svg", left: 18.61, top: 39.02, width: 4.86, height: 6.35 },
      { file: "avatar-developer.svg", left: 18.61, top: 45.95, width: 4.86, height: 6.35 },
    ],
    design: [
      { file: "avatar-you-design.svg", left: 76.63, top: 29.70, width: 4.86, height: 7.32 },
      null,
      { file: "avatar-you-design.svg", left: 76.63, top: 29.70, width: 4.86, height: 7.32 },
    ],
    development: [
      { file: "avatar-you-code.svg", left: 76.63, top: 43.32, width: 4.86, height: 6.35 },
      { file: "avatar-you-code.svg", left: 76.63, top: 43.32, width: 4.86, height: 6.35 },
      null,
    ],
  };
  const setAvatarOverlay = (element, overlay) => {
    element.hidden = !overlay;
    if (!overlay) return;
    element.src = `./assets/figma-2x/${overlay.file}`;
    element.style.left = `${overlay.left}%`;
    element.style.top = `${overlay.top}%`;
    element.style.width = `${overlay.width}%`;
    element.style.height = `${overlay.height}%`;
  };
  setAvatarOverlay(avatar, avatarOverlay);
  setAvatarOverlay(secondaryAvatar, secondaryOverlays[state.role][state.question]);
  const tertiaryAvatar = document.getElementById("question-avatar-tertiary-svg");
  const tertiaryOverlays = {
    planning: [
      { file: "avatar-developer.svg", left: 18.61, top: 50.30, width: 4.86, height: 6.35 },
      null,
      null,
    ],
    design: [null, null, null],
    development: [null, null, null],
  };
  setAvatarOverlay(tertiaryAvatar, tertiaryOverlays[state.role][state.question]);
  document.getElementById("question-heading").textContent = item.title;
  document.getElementById("question-count").textContent = `${state.question + 1}/3`;
  document.getElementById("chat").innerHTML = item.messages.map((message) => `<div class="chat-row chat-row--${message.side}"><span class="avatar">${message.who.slice(0, 1)}</span><p>${message.text}</p><small>${message.who}</small></div>`).join("");
  document.getElementById("answer-list").innerHTML = item.answers.map((answer, index) => `<button class="answer-button" type="button" data-answer="${index}"><b>${index + 1}</b><span>${answer.text}</span></button>`).join("");
  document.getElementById("question-live").textContent = `질문 ${state.question + 1}/3`;
}

function classify([verification, question, drive, alignment]) {
  const max = Math.max(verification, question, drive, alignment);
  if (verification >= 8 && drive <= 4) return "risk";
  if (verification >= 6 && question >= 5) return "confirm";
  if (drive >= 7 && drive === max && alignment !== max) return "drive";
  if (question >= 4 && drive >= 5 && verification <= 5) return "proposal";
  if (alignment >= 7 && alignment === max) return "alignment";
  if (question >= 5 && drive >= 5) return "proposal";
  if (drive === alignment && drive === max) return "alignment";
  if (verification === max) return "confirm";
  if (question === max) return "proposal";
  if (alignment === max) return "alignment";
  return "drive";
}

function renderResult() {
  const resultKey = classify(state.scores);
  const result = results[resultKey];
  const resultFrame = { confirm: "006-d", drive: "006-e", risk: "006-f" }[resultKey];
  const resultScreen = document.querySelector('[data-screen="result"]');
  const resultArt = document.getElementById("result-art");
  const resultCard = resultScreen.querySelector(".result-card");
  resultScreen.classList.toggle("uses-figma-result", Boolean(resultFrame));
  resultArt.hidden = !resultFrame;
  resultCard.hidden = Boolean(resultFrame);
  if (resultFrame) {
    resultArt.src = `./assets/figma-clean/${resultFrame}.png`;
    resultArt.alt = `당신은 ${result[1]}. ${result[2]} ${result[3]} 주의할 점: ${result[4]} SynQ 도움: ${result[5]}`;
  }
  ["result-icon", "result-name", "result-tagline", "result-good", "result-watch", "result-help"].forEach((id, index) => { document.getElementById(id).textContent = result[index]; });
  const labels = ["검증", "질문", "추진", "조율"];
  const max = Math.max(...state.scores, 1);
  document.getElementById("trait-chart").innerHTML = state.scores.map((score, index) => { const percent = Math.round(score / max * 100); return `<div class="trait-row"><span>${labels[index]}</span><i><b style="width:${percent}%"></b></i><strong>${percent}%</strong></div>`; }).join("");
  return resultKey;
}

function renderHint(role = state.role) {
  const hint = hints[role];
  const frame = { planning: "007-d", design: "007-e", development: "007-f" }[role];
  const art = document.getElementById("hint-art");
  art.src = `./assets/figma-clean/${frame}.png`;
  art.alt = `SynQ 힌트. ${hint.speaker}: ${hint.quote} 의미: ${hint.meaning} 내 영향: ${hint.impact} 팀 질문: ${hint.question}`;
  const avatar = document.getElementById("hint-avatar-svg");
  const avatarOverlay = {
    planning: { file: "avatar-developer.svg", left: 18.06, top: 35.90, width: 4.86, height: 6.35 },
    design: { file: "avatar-researcher.svg", left: 17.78, top: 35.45, width: 5.42, height: 7.23 },
    development: { file: "avatar-sales.svg", left: 18.06, top: 35.25, width: 4.86, height: 7.32 },
  }[role];
  avatar.hidden = !avatarOverlay;
  if (avatarOverlay) {
    avatar.src = `./assets/figma-2x/${avatarOverlay.file}`;
    avatar.style.left = `${avatarOverlay.left}%`;
    avatar.style.top = `${avatarOverlay.top}%`;
    avatar.style.width = `${avatarOverlay.width}%`;
    avatar.style.height = `${avatarOverlay.height}%`;
  }
  document.getElementById("hint-speaker-icon").textContent = hint.icon;
  document.getElementById("hint-speaker").textContent = hint.speaker;
  document.getElementById("hint-quote").textContent = hint.quote;
  document.getElementById("hint-meaning").textContent = hint.meaning;
  document.getElementById("hint-impact").textContent = hint.impact;
  document.getElementById("hint-question").textContent = hint.question;
  document.querySelectorAll("[data-hint-role]").forEach((tab) => { const active = tab.dataset.hintRole === role; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", String(active)); });
}

function reset() {
  state.role = null; state.question = 0; state.scores = [0, 0, 0, 0]; state.locked = false;
  document.getElementById("experience-notice").textContent = "";
  show("start");
}

document.addEventListener("click", (event) => {
  const clickedButton = event.target.closest("button:not(:disabled)");
  if (clickedButton) {
    if (clickedButton.dataset.action !== "toggle-sound") playClickSound();
    clickedButton.classList.remove("is-clicked");
    void clickedButton.offsetWidth;
    clickedButton.classList.add("is-clicked");
    window.setTimeout(() => clickedButton.classList.remove("is-clicked"), 150);
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  const role = event.target.closest("[data-role]")?.dataset.role;
  const answer = event.target.closest("[data-answer]")?.dataset.answer;
  const hintRole = event.target.closest("[data-hint-role]")?.dataset.hintRole;
  if (event.target.closest("a[data-action]")) event.preventDefault();
  if (action === "start" || action === "roles") show("role");
  if (action === "reset") reset();
  if (role) { state.role = role; state.question = 0; state.scores = [0, 0, 0, 0]; state.locked = false; renderBriefing(); show("briefing"); }
  if (action === "begin") { renderQuestion(); show("question"); }
  if (answer !== undefined && state.role && !state.locked) {
    state.locked = true;
    const selected = scenarios[state.role].questions[state.question].answers[Number(answer)];
    selected.score.forEach((score, index) => { state.scores[index] += score; });
    document.querySelectorAll("[data-answer]").forEach((button) => { button.disabled = true; });
    window.setTimeout(() => {
      state.question += 1;
      state.locked = false;
      if (state.question < 3) renderQuestion(); else {
        const resultKey = renderResult();
        show("result");
        playResultCelebration(resultKey);
      }
    }, 160);
  }
  if (action === "result") show("result");
  if (action === "hint") { renderHint(); show("hint"); }
  if (action === "cta") show("cta");
  if (hintRole) renderHint(hintRole);
  if (action === "experience") reset();
  if (action === "toggle-sound") toggleSound();
});

document.addEventListener("keydown", (event) => { if (event.key === "Escape") reset(); });

updateSoundToggle();

if (typeof Image !== "undefined") {
  ["003-a", "003-b", "003-c", "004-a", "004-b", "004-c", "005-a", "005-b", "005-c"]
    .forEach((name) => { const image = new Image(); image.src = `./assets/figma-2x/${name}.png`; });
  ["000", "001", "002-a", "002-b", "002-c", "006-d", "006-e", "006-f", "007-d", "007-e", "007-f", "008"]
    .forEach((name) => { const image = new Image(); image.src = `./assets/figma-clean/${name}.png`; });
}
