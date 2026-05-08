var ARTICLES = [
  { id: "nixos-module-graph", en: "nixos-module-graph", ru: "nixos-module-graph" },
  { id: "nixos-health",       en: "nixos-health",       ru: "nixos-health" },
  { id: "nixos-build-tui",    en: "nixos-build-tui",    ru: "nixos-build-tui" },
  { id: "nix-diff-lock",      en: "nix-diff-lock",      ru: "nix-diff-lock" },
  { id: "system-report",      en: "system-report",      ru: "system-report" },
  { id: "nixos-flake-update", en: "nixos-flake-update", ru: "nixos-flake-update" },
  { id: "nixos-switch-diff",  en: "nixos-switch-diff",  ru: "nixos-switch-diff" },
  { id: "nixos-clean",        en: "nixos-clean",        ru: "nixos-clean" },
  { id: "nixos-log",          en: "nixos-log",          ru: "nixos-log" },
  { id: "nixos-top",          en: "nixos-top",          ru: "nixos-top" },
  { id: "brrtfetch",          en: "brrtfetch",          ru: "brrtfetch" },
  { id: "rkn-block-checker",  en: "rkn-block-checker",  ru: "rkn-block-checker" },
];

var LANG = document.documentElement.lang;

function buildSidebar() {
  var current = location.pathname.split("/").pop();
  var html = '<div class="sidebar-header"><a href="../index.html">nixos-pack</a></div><nav><ol>';
  var activeIdx = -1;
  for (var i = 0; i < ARTICLES.length; i++) {
    var a = ARTICLES[i];
    var name = a[LANG] || a.en;
    var file = a.id + ".html";
    var active = file === current ? ' class="active"' : '';
    if (file === current) activeIdx = i;
    html += '<li' + active + '><a href="' + file + '">' + (i + 1) + '. ' + name + '</a></li>';
  }
  html += '</ol></nav>';
  if (activeIdx !== -1) {
    var prev = activeIdx > 0 ? ARTICLES[activeIdx - 1].id + ".html" : null;
    var next = activeIdx < ARTICLES.length - 1 ? ARTICLES[activeIdx + 1].id + ".html" : null;
    var pLabel = LANG === "ru" ? "Назад" : "Prev";
    var nLabel = LANG === "ru" ? "Вперёд" : "Next";
    html += '<div class="sidebar-bottom">';
    if (prev) html += '<a href="' + prev + '" class="nav-prev">← ' + pLabel + '</a>';
    if (next) html += '<a href="' + next + '" class="nav-next">' + nLabel + ' →</a>';
    html += '<a href="../' + (LANG === "ru" ? "en" : "ru") + '/' + current + '" class="lang-switch">' + (LANG === "ru" ? "EN" : "RU") + '</a>';
    html += '</div>';
  }
  document.getElementById("sidebar").innerHTML = html;
}
