const tabsData = [
  { title: "Home", content: "Welcome to the Home tab!" },
  { title: "Dashboard", content: "This is your dashboard" },
  { title: "Profile", content: "This is your Profile tab." },
  { title: "Settings", content: "Adjust your settings here." },
];

function handleClick(index) {
  const tab_buttons = document.getElementsByClassName("tab");
  const tab_contents = document.getElementsByClassName("content");

  for (let i = 0; i < tab_buttons.length; i++) {
    tab_buttons[i].classList.remove("active");
    tab_contents[i].classList.remove("active");
  }

  tab_buttons[index].classList.add("active");
  tab_contents[index].classList.add("active");
}

function renderTabs(root) {
  const tab_buttons = tabsData.reduce(
    (prev, curr, index) => {
      prev.tab_buttons.push(
        `<button id="tab-${index}" class="tab ${
          index === 0 ? "active" : ""
        }" onclick="handleClick(${index})">${curr.title}</button>`
      );
      prev.tab_contents.push(
        `<div id="content-${index}" class="content ${
          index === 0 ? "active" : ""
        }">${curr.content}</div>`
      );
      return prev;
    },
    { tab_buttons: [], tab_contents: [] }
  );

  const container = `<div class="tab-buttons">${tab_buttons.tab_buttons.join(
    ""
  )}</div><div class="tab-contents">${tab_buttons.tab_contents.join("")}</div>`;

  root.innerHTML = container;
}

function init() {
  const root = document.getElementById("root");

  renderTabs(root);
}

init();
