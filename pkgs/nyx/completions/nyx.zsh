#compdef nyx

_nyx() {
  local -a cmds
  cmds=(
    "doctor:system and plugin health check"
    "install:install a nixos-pack package"
    "init:scaffold a new .nyx plugin"
    "plugins:list available .nyx plugins"
    "health:run nixos-health"
    "graph:run nixos-module-graph"
    "build:run nixos-build-tui"
    "diff-lock:run nix-diff-lock"
    "report:run system-report"
    "update:run nixos-flake-update"
    "switch-diff:run nixos-switch-diff"
    "clean:run nixos-clean"
    "log:run nixos-log"
    "top:run nixos-top"
    "brrt:run brrtfetch"
    "rkn:run rkn-block-checker"
  )

  _arguments \
    "1: :{_describe 'command' cmds}" \
    "*::arg:->args"

  case "$state" in
    args)
      case "$words[1]" in
        install)
          local -a pkgs
          pkgs=(
            "nixos-health:NixOS health checks"
            "nixos-module-graph:module import graph"
            "nixos-build-tui:rebuild TUI"
            "nix-diff-lock:flake.lock diff"
            "system-report:system inventory"
            "nixos-flake-update:flake update TUI"
            "nixos-switch-diff:switch diff"
            "nixos-clean:GC TUI"
            "nixos-log:journalctl browser"
            "nixos-top:system monitor"
            "brrtfetch:ASCII art"
            "rkn-block-checker:block diagnostics"
          )
          _describe 'package' pkgs
          ;;
      esac
      ;;
  esac
}

_nyx
