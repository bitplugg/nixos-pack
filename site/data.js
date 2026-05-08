var LANG = "en";
var ARTICLE = "nyx";

var DATA = { en: {}, ru: {} };

function art(lang, id, title, html) {
  DATA[lang][id] = { title: title, html: html };
}

var T = { en: {}, ru: {} };
T.en = {
  title: "nixos-pack", subtitle: "NixOS diagnostic & utility packages",
  docs: "Documentation", prev: "Prev", next: "Next",
  lang: "RU", langLabel: "Русский",
};
T.ru = {
  title: "nixos-pack", subtitle: "Пакеты диагностики и утилит для NixOS",
  docs: "Документация", prev: "Назад", next: "Вперёд",
  lang: "EN", langLabel: "English",
};

var ARTICLES = [
  { id: "nyx",                 en: "nyx",                 ru: "nyx" },
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
  { id: "plugins",            en: "Plugin Store",        ru: "Магазин плагинов" },
];

// ── English articles ──────────────────────────────────────

art("en", "nyx", "nyx", `
<p><strong>nyx</strong> — plugin-based NixOS toolkit. Zero alone, infinite with plugins.</p>
<p>Installed tools are exposed as subcommands. Any <code>.nyx</code> file in <code>~/.config/nyx/plugins/</code> becomes a command.</p>

<h2>Usage</h2>
<pre>nyx           # show available commands
nyx doctor    # system health check
nyx install   # install a nixos-pack package
nyx init      # scaffold a new .nyx plugin
nyx plugins   # list loaded plugins
nyx health    # run nixos-health
nyx graph     # run nixos-module-graph</pre>

<h2>Meta commands</h2>
<table>
  <tr><th>Command</th><th>Description</th></tr>
  <tr><td><code>doctor</code></td><td>Check nix version, installed packages, plugin status</td></tr>
  <tr><td><code>install</code></td><td>Install a nixos-pack package via <code>nix profile install</code> (<code>nyx install top</code>)</td></tr>
  <tr><td><code>init</code></td><td>Create a starter <code>~/.config/nyx/plugins/myplugin.nyx</code></td></tr>
  <tr><td><code>plugins</code></td><td>List all loaded .nyx plugins with metadata</td></tr>
</table>

<h2>Built-in tool commands</h2>
<table>
  <tr><th>Command</th><th>Alias</th><th>Runs</th></tr>
  <tr><td><code>health</code></td><td><code>h</code></td><td>nixos-health</td></tr>
  <tr><td><code>graph</code></td><td><code>g</code></td><td>nixos-module-graph</td></tr>
  <tr><td><code>build</code></td><td><code>b</code></td><td>nixos-build-tui</td></tr>
  <tr><td><code>diff-lock</code></td><td><code>dl</code></td><td>nix-diff-lock</td></tr>
  <tr><td><code>report</code></td><td><code>r</code></td><td>system-report</td></tr>
  <tr><td><code>update</code></td><td><code>u</code></td><td>nixos-flake-update</td></tr>
  <tr><td><code>switch-diff</code></td><td><code>sd</code></td><td>nixos-switch-diff</td></tr>
  <tr><td><code>clean</code></td><td><code>c</code></td><td>nixos-clean</td></tr>
  <tr><td><code>log</code></td><td><code>l</code></td><td>nixos-log</td></tr>
  <tr><td><code>top</code></td><td><code>t</code></td><td>nixos-top</td></tr>
  <tr><td><code>brrt</code></td><td></td><td>brrtfetch</td></tr>
  <tr><td><code>rkn</code></td><td></td><td>rkn-block-checker</td></tr>
</table>

<h2>.nyx plugin format</h2>
<p>Any executable file with <code>.nyx</code> extension in <code>~/.config/nyx/plugins/</code> becomes a <code>nyx &lt;name&gt;</code> command. Metadata is read from comment headers:</p>
<pre>#!/usr/bin/env python3
# description: What my plugin does
# version: 0.1.0
# author: me
import sys
print("hello from nyx plugin")</pre>
<p>Examples are installed at <code>$(dirname $(which nyx))/../share/nyx/examples/</code>.</p>
<h3>Bash example</h3>
<pre>#!/usr/bin/env bash
# description: Check disk usage
echo "Disk usage:"
df -h / /nix</pre>
<h3>Python example</h3>
<pre>#!/usr/bin/env python3
# description: Count installed packages
import subprocess
r = subprocess.run(["nix-env", "-q"], capture_output=True, text=True)
print(f"packages: {len(r.stdout.split())}")</pre>

<h2>Autocompletion</h2>
<p>Source the completion scripts:</p>
<pre>source $(dirname $(which nyx))/../share/nyx/completions/nyx.bash   # bash
source $(dirname $(which nyx))/../share/nyx/completions/nyx.zsh    # zsh</pre>

<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nyx</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nyx</pre>
`);

art("en", "nixos-module-graph", "nixos-module-graph", `
<p>Walks the <code>imports = [...]</code> tree of a NixOS module and builds a dependency graph. Supports HTML (d3.js), DOT, JSON, and ASCII text output.</p>
<pre>nixos-module-graph --config /etc/nixos/configuration.nix
nixos-module-graph --config ./configuration.nix --output graph.html
nixos-module-graph --config ./configuration.nix --serve --port 8080
nixos-module-graph --config ./configuration.nix --option services.nginx.enable
nixos-module-graph --flake .#my-server --output graph.html</pre>
<table>
  <tr><th>Flag</th><th>Description</th></tr>
  <tr><td><code>--config</code></td><td>Path to a NixOS configuration.nix</td></tr>
  <tr><td><code>--flake</code></td><td>Flake URI (e.g. <code>.#hostname</code>)</td></tr>
  <tr><td><code>--option</code></td><td>Analyse a specific option</td></tr>
  <tr><td><code>--output</code></td><td>Write to file (.html / .dot / .json)</td></tr>
  <tr><td><code>--text</code></td><td>ASCII tree in terminal</td></tr>
  <tr><td><code>--serve</code></td><td>Start interactive d3.js web server</td></tr>
  <tr><td><code>--port</code></td><td>Port for <code>--serve</code> (default 8080)</td></tr>
  <tr><td><code>--max-depth</code></td><td>Limit import recursion depth</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-module-graph</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-module-graph</pre>
`);

art("en", "nixos-health", "nixos-health", `
<p>Runs a battery of health checks: channel age, disk space, journal errors, swap usage, DNS resolution, failed systemd units.</p>
<pre>nixos-health
nixos-health --check journal
nixos-health --check disk
nixos-health --check all</pre>
<table>
  <tr><th>Check</th><th>What it tests</th></tr>
  <tr><td>channel</td><td>Nixpkgs channel age / last update</td></tr>
  <tr><td>disk</td><td>Disk space on <code>/</code>, <code>/home</code>, <code>/nix</code></td></tr>
  <tr><td>journal</td><td>Recent errors and high-priority log entries</td></tr>
  <tr><td>swap</td><td>Swap usage percentage</td></tr>
  <tr><td>dns</td><td>DNS resolution test</td></tr>
  <tr><td>systemd</td><td>Failed or degraded systemd units</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-health</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-health</pre>
`);

art("en", "nixos-build-tui", "nixos-build-tui", `
<p>Interactive terminal UI for <code>nixos-rebuild</code> with action selection, build log streaming, rollback, and boot management.</p>
<pre>nixos-build-tui</pre>
<ul>
  <li>Select action (switch, boot, test, dry-activate)</li>
  <li>Live build log output</li>
  <li>Quick rollback to previous generation</li>
  <li>Boot entry management</li>
</ul>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-build-tui</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-build-tui</pre>
`);

art("en", "nix-diff-lock", "nix-diff-lock", `
<p>Compares two <code>flake.lock</code> files and shows what inputs changed, what commits came in, and which dependencies updated.</p>
<pre>nix-diff-lock old.lock new.lock
nix-diff-lock --json before.lock after.lock</pre>
<ul>
  <li>Added inputs (green)</li>
  <li>Removed inputs (red)</li>
  <li>Updated inputs with old → new revisions</li>
</ul>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nix-diff-lock</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nix-diff-lock</pre>
`);

art("en", "system-report", "system-report", `
<p>Collects system information into JSON: packages, systemd units, ports, mounts, kernel, hardware.</p>
<pre>system-report
system-report --output report.json
system-report --pretty</pre>
<table>
  <tr><th>Section</th><th>Description</th></tr>
  <tr><td>packages</td><td>Installed Nix packages with versions</td></tr>
  <tr><td>services</td><td>Enabled and active systemd units</td></tr>
  <tr><td>ports</td><td>Listening TCP/UDP ports</td></tr>
  <tr><td>mounts</td><td>Filesystem mount points</td></tr>
  <tr><td>kernel</td><td>Kernel version and parameters</td></tr>
  <tr><td>hardware</td><td>CPU, memory, disk info</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.system-report</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.system-report</pre>
`);

art("en", "nixos-flake-update", "nixos-flake-update", `
<p>Interactive TUI that reads <code>flake.nix</code> inputs, shows locked revisions, and lets you pick which to update.</p>
<pre>nixos-flake-update</pre>
<table>
  <tr><th>Key</th><th>Action</th></tr>
  <tr><td><code>1-9</code></td><td>Update specific input</td></tr>
  <tr><td><code>a</code></td><td>Update all</td></tr>
  <tr><td><code>q</code></td><td>Quit</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-flake-update</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-flake-update</pre>
`);

art("en", "nixos-switch-diff", "nixos-switch-diff", `
<p>Builds a candidate and diffs its store closure against current generation — shows added, removed, or changed packages.</p>
<pre>nixos-switch-diff</pre>
<ul>
  <li><b style="color:#3fb950">+ added</b> — new packages</li>
  <li><b style="color:#f85149">- removed</b> — packages removed</li>
  <li>Build time summary</li>
</ul>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-switch-diff</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-switch-diff</pre>
`);

art("en", "nixos-clean", "nixos-clean", `
<p>Shows generations and nix store size, then runs GC. Supports dry-run and full cleanup modes.</p>
<pre>nixos-clean
nixos-clean --dry-run
nixos-clean --full</pre>
<table>
  <tr><th>Flag</th><th>Description</th></tr>
  <tr><td><code>--dry-run</code></td><td>Show what would be freed</td></tr>
  <tr><td><code>--full</code></td><td>Full historical cleanup</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-clean</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-clean</pre>
`);

art("en", "nixos-log", "nixos-log", `
<p>Wraps <code>journalctl</code> with syntax highlighting: errors in red, warnings in yellow, service starts in green.</p>
<pre>nixos-log
nixos-log -u nginx --follow
nixos-log --boot -1 --priority err</pre>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-log</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-log</pre>
`);

art("en", "nixos-top", "nixos-top", `
<p>Live-updating dashboard: load averages, memory usage, top systemd units by CPU, recent journal errors.</p>
<pre>nixos-top
nixos-top -n 5</pre>
<table>
  <tr><th>Flag</th><th>Description</th></tr>
  <tr><td><code>-n</code></td><td>Update interval in seconds (default 2)</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.nixos-top</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.nixos-top</pre>
`);

art("en", "brrtfetch", "brrtfetch", `
<p>Converts GIF into smooth ANSI animations. Integrates with neofetch, fastfetch, and other sysinfo tools.</p>
<pre>brrtfetch --gif dance.gif
brrtfetch --gif dance.gif --fetch fastfetch
brrtfetch --list-frames dance.gif</pre>
<table>
  <tr><th>Flag</th><th>Description</th></tr>
  <tr><td><code>--gif</code></td><td>Path to GIF file</td></tr>
  <tr><td><code>--fetch</code></td><td>Sysinfo fetcher</td></tr>
  <tr><td><code>--list-frames</code></td><td>Show all frames as text</td></tr>
  <tr><td><code>--fps</code></td><td>Animation speed</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.brrtfetch</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.brrtfetch</pre>
`);

art("en", "rkn-block-checker", "rkn-block-checker", `
<p>Multi-layer network block diagnostics: DNS → TCP → TLS → HTTP. Identifies where and how a resource is blocked.</p>
<pre>rkn-block-checker example.com
rkn-block-checker --dns 1.1.1.1 example.com
rkn-block-checker --json example.com</pre>
<table>
  <tr><th>Layer</th><th>What it checks</th></tr>
  <tr><td>DNS</td><td>Resolution, response time, spoofing</td></tr>
  <tr><td>TCP</td><td>Connection to port 80/443</td></tr>
  <tr><td>TLS</td><td>Handshake, certificate validity</td></tr>
  <tr><td>HTTP</td><td>Response code and body analysis</td></tr>
</table>
<h2>NixOS module</h2>
<pre>nixos-pack.nixosModules.rkn-block-checker</pre>
<h2>Home-Manager module</h2>
<pre>nixos-pack.homeManagerModules.rkn-block-checker</pre>
`);

// ── Russian articles ──────────────────────────────────────

art("ru", "nyx", "nyx", `
<p><strong>nyx</strong> — плагинный NixOS тулкит. Ноль без плагинов, бесконечен с ними.</p>
<p>Установленные утилиты становятся подкомандами. Любой <code>.nyx</code> файл в <code>~/.config/nyx/plugins/</code> становится командой.</p>

<h2>Использование</h2>
<pre>nyx           # показать команды
nyx doctor    # проверка системы
nyx install   # установка пакета
nyx init      # создать .nyx плагин
nyx plugins   # список плагинов
nyx health    # запустить nixos-health</pre>

<h2>Мета-команды</h2>
<table>
  <tr><th>Команда</th><th>Описание</th></tr>
  <tr><td><code>doctor</code></td><td>Проверка nix, установленных пакетов, плагинов</td></tr>
  <tr><td><code>install</code></td><td>Установить пакет из nixos-pack (<code>nyx install top</code>)</td></tr>
  <tr><td><code>init</code></td><td>Создать шаблон <code>~/.config/nyx/plugins/myplugin.nyx</code></td></tr>
  <tr><td><code>plugins</code></td><td>Список загруженных .nyx плагинов</td></tr>
</table>

<h2>Встроенные команды</h2>
<table>
  <tr><th>Команда</th><th>Псевдоним</th><th>Запускает</th></tr>
  <tr><td><code>health</code></td><td><code>h</code></td><td>nixos-health</td></tr>
  <tr><td><code>graph</code></td><td><code>g</code></td><td>nixos-module-graph</td></tr>
  <tr><td><code>build</code></td><td><code>b</code></td><td>nixos-build-tui</td></tr>
  <tr><td><code>diff-lock</code></td><td><code>dl</code></td><td>nix-diff-lock</td></tr>
  <tr><td><code>report</code></td><td><code>r</code></td><td>system-report</td></tr>
  <tr><td><code>update</code></td><td><code>u</code></td><td>nixos-flake-update</td></tr>
  <tr><td><code>switch-diff</code></td><td><code>sd</code></td><td>nixos-switch-diff</td></tr>
  <tr><td><code>clean</code></td><td><code>c</code></td><td>nixos-clean</td></tr>
  <tr><td><code>log</code></td><td><code>l</code></td><td>nixos-log</td></tr>
  <tr><td><code>top</code></td><td><code>t</code></td><td>nixos-top</td></tr>
  <tr><td><code>brrt</code></td><td></td><td>brrtfetch</td></tr>
  <tr><td><code>rkn</code></td><td></td><td>rkn-block-checker</td></tr>
</table>

<h2>Формат .nyx плагинов</h2>
<p>Любой исполняемый файл с расширением <code>.nyx</code> в <code>~/.config/nyx/plugins/</code> становится командой <code>nyx &lt;имя&gt;</code>. Метаданные читаются из комментариев в заголовке:</p>
<pre>#!/usr/bin/env python3
# description: Что делает плагин
# version: 0.1.0
# author: я
print("привет от nyx плагина")</pre>

<h3>Пример на bash</h3>
<pre>#!/usr/bin/env bash
# description: Проверка дисков
df -h / /nix</pre>

<h3>Пример на Python</h3>
<pre>#!/usr/bin/env python3
# description: Считает установленные пакеты
import subprocess
r = subprocess.run(["nix-env", "-q"], capture_output=True, text=True)
print(f"пакетов: {len(r.stdout.split())}")</pre>

<h2>Автодополнение</h2>
<pre>source $(dirname $(which nyx))/../share/nyx/completions/nyx.bash   # bash
source $(dirname $(which nyx))/../share/nyx/completions/nyx.zsh    # zsh</pre>

<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nyx</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nyx</pre>
`);

art("ru", "nixos-module-graph", "nixos-module-graph", `
<p>Обходит дерево <code>imports = [...]</code> NixOS модуля и строит граф зависимостей. HTML (d3.js), DOT, JSON, текст.</p>
<pre>nixos-module-graph --config /etc/nixos/configuration.nix
nixos-module-graph --config ./configuration.nix --output graph.html
nixos-module-graph --config ./configuration.nix --serve --port 8080</pre>
<table>
  <tr><th>Флаг</th><th>Описание</th></tr>
  <tr><td><code>--config</code></td><td>Путь к configuration.nix</td></tr>
  <tr><td><code>--flake</code></td><td>Flake URI</td></tr>
  <tr><td><code>--option</code></td><td>Анализ опции</td></tr>
  <tr><td><code>--output</code></td><td>Запись в файл</td></tr>
  <tr><td><code>--serve</code></td><td>Запуск d3.js сервера</td></tr>
</table>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-module-graph</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-module-graph</pre>
`);

art("ru", "nixos-health", "nixos-health", `
<p>Проверки: возраст каналов, диски, journald, swap, DNS, systemd юниты.</p>
<pre>nixos-health
nixos-health --check journal
nixos-health --check all</pre>
<table>
  <tr><th>Проверка</th><th>Описание</th></tr>
  <tr><td>channel</td><td>Возраст nixpkgs канала</td></tr>
  <tr><td>disk</td><td>Место на /, /home, /nix</td></tr>
  <tr><td>journal</td><td>Ошибки в логах</td></tr>
  <tr><td>swap</td><td>Использование swap</td></tr>
  <tr><td>dns</td><td>Резолюция DNS</td></tr>
  <tr><td>systemd</td><td>Упавшие юниты</td></tr>
</table>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-health</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-health</pre>
`);

art("ru", "nixos-build-tui", "nixos-build-tui", `
<p>TUI для nixos-rebuild: выбор действия, лог сборки, откат, управление загрузкой.</p>
<pre>nixos-build-tui</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-build-tui</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-build-tui</pre>
`);

art("ru", "nix-diff-lock", "nix-diff-lock", `
<p>Сравнивает flake.lock файлы: какие входы изменились, коммиты, добавлено/удалено.</p>
<pre>nix-diff-lock old.lock new.lock</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nix-diff-lock</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nix-diff-lock</pre>
`);

art("ru", "system-report", "system-report", `
<p>JSON инвентаризация: пакеты, systemd, порты, монтирования, ядро, железо.</p>
<pre>system-report --output report.json</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.system-report</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.system-report</pre>
`);

art("ru", "nixos-flake-update", "nixos-flake-update", `
<p>TUI для обновления inputs flake. Показывает ревизии, выбираешь что обновить.</p>
<pre>nixos-flake-update</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-flake-update</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-flake-update</pre>
`);

art("ru", "nixos-switch-diff", "nixos-switch-diff", `
<p>Собирает кандидат и сравнивает с текущей генерацией: добавлено, удалено, изменено.</p>
<pre>nixos-switch-diff</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-switch-diff</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-switch-diff</pre>
`);

art("ru", "nixos-clean", "nixos-clean", `
<p>GC store с обзором поколений. Dry-run и полная очистка.</p>
<pre>nixos-clean
nixos-clean --dry-run
nixos-clean --full</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-clean</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-clean</pre>
`);

art("ru", "nixos-log", "nixos-log", `
<p>journalctl с подсветкой: ошибки красным, предупреждения жёлтым, запуски зелёным.</p>
<pre>nixos-log
nixos-log -u nginx --follow</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-log</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-log</pre>
`);

art("ru", "nixos-top", "nixos-top", `
<p>Дашборд: нагрузка, память, systemd по CPU, ошибки journald. Обновление каждые 2с.</p>
<pre>nixos-top
nixos-top -n 5</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.nixos-top</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.nixos-top</pre>
`);

art("ru", "brrtfetch", "brrtfetch", `
<p>GIF → ANSI анимации в терминале. Интеграция с neofetch, fastfetch.</p>
<pre>brrtfetch --gif dance.gif</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.brrtfetch</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.brrtfetch</pre>
`);

art("ru", "rkn-block-checker", "rkn-block-checker", `
<p>Диагностика блокировок: DNS → TCP → TLS → HTTP.</p>
<pre>rkn-block-checker example.com</pre>
<h2>Модуль NixOS</h2>
<pre>nixos-pack.nixosModules.rkn-block-checker</pre>
<h2>Модуль Home-Manager</h2>
<pre>nixos-pack.homeManagerModules.rkn-block-checker</pre>
`);

// ── Plugins article ────────────────────────────────────────

art("en", "plugins", "Plugin Store", `
<p>The nyx CLI ships with <strong id="plugin-count-en"></strong> built-in .nyx plugins covering system info, network diagnostics, NixOS management, security auditing, and more.</p>
<div id="plugin-table-container"></div>
`);

art("ru", "plugins", "Магазин плагинов", `
<p>nyx поставляется с <strong id="plugin-count-ru"></strong> встроенными .nyx плагинами для диагностики системы, сети, NixOS, безопасности и многого другого.</p>
<div id="plugin-table-container"></div>
`);

// ── Render ─────────────────────────────────────────────────

function render() {
  var t = T[LANG];
  document.getElementById("title").textContent = t.title + " — " + DATA[LANG][ARTICLE].title;

  var sidebar = '<div class="sidebar-header">' + t.title + '</div><nav><ol>';
  var activeIdx = -1;
  for (var i = 0; i < ARTICLES.length; i++) {
    var a = ARTICLES[i];
    var name = a[LANG];
    var active = a.id === ARTICLE ? ' class="active"' : "";
    if (a.id === ARTICLE) activeIdx = i;
    sidebar += '<li' + active + '><a href="#' + LANG + '/' + a.id + '" onclick="navigate(\'' + a.id + '\')">' + (i + 1) + ". " + name + "</a></li>";
  }
  sidebar += '</ol></nav>';

  if (activeIdx !== -1) {
    var prev = activeIdx > 0 ? ARTICLES[activeIdx - 1].id : null;
    var next = activeIdx < ARTICLES.length - 1 ? ARTICLES[activeIdx + 1].id : null;
    sidebar += '<div class="sidebar-bottom">';
    if (prev) sidebar += '<a href="#" onclick="navigate(\'' + prev + '\')" class="nav-prev">← ' + t.prev + '</a>';
    if (next) sidebar += '<a href="#" onclick="navigate(\'' + next + '\')" class="nav-next">' + t.next + ' →</a>';
    sidebar += '<a href="#" onclick="switchLang()" class="lang-switch">' + t.lang + '</a>';
    sidebar += '</div>';
  }

  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("article-title").textContent = DATA[LANG][ARTICLE].title;
  document.getElementById("article-body").innerHTML = DATA[LANG][ARTICLE].html;
  document.documentElement.lang = LANG;

  if (ARTICLE === "plugins") {
    renderPluginStore();
  }
}

function renderPluginStore() {
  var countEl = document.getElementById("plugin-count-" + LANG);
  if (countEl) countEl.textContent = PLUGINS.length;

  var container = document.getElementById("plugin-table-container");
  if (!container) return;

  var html = '<table class="plugin-table"><thead><tr>';
  if (LANG === "en") {
    html += '<th>Plugin</th><th>Description</th><th>Language</th><th>Rating</th><th>Downloads</th><th></th>';
  } else {
    html += '<th>Плагин</th><th>Описание</th><th>Язык</th><th>Рейтинг</th><th>Скачивания</th><th></th>';
  }
  html += '</tr></thead><tbody>';

  for (var i = 0; i < PLUGINS.length; i++) {
    var p = PLUGINS[i];
    var stars = "";
    for (var s = 0; s < Math.floor(p.r); s++) stars += "★";
    if (p.r - Math.floor(p.r) >= 0.5) stars += "½";
    var url = 'https://raw.githubusercontent.com/bitplugg/nixos-pack/master/pkgs/nyx/plugins/' + p.name + '.nyx';
    html += '<tr>';
    html += '<td><code>' + p.name + '</code></td>';
    html += '<td>' + p.desc + '</td>';
    html += '<td>' + p.lang + '</td>';
    html += '<td class="stars">' + stars + '</td>';
    html += '<td>' + p.dl + '</td>';
    html += '<td><a href="' + url + '" class="dl-btn" download>' + (LANG === "en" ? '⬇' : '⬇') + '</a></td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  container.innerHTML = html;
}

function navigate(id) {
  ARTICLE = id;
  window.location.hash = LANG + "/" + id;
  render();
  window.scrollTo(0, 0);
}

function switchLang() {
  LANG = LANG === "en" ? "ru" : "en";
  window.location.hash = LANG + "/" + ARTICLE;
  render();
}

function fromHash() {
  var h = window.location.hash.replace(/^#/, "");
  if (!h) return;
  var parts = h.split("/");
  if (parts.length === 2 && (parts[0] === "en" || parts[0] === "ru")) {
    var found = ARTICLES.some(function(a) { return a.id === parts[1]; });
    if (found) {
      LANG = parts[0];
      ARTICLE = parts[1];
    }
  }
}
