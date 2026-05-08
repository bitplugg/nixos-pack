_nyx() {
  local cur="${COMP_WORDS[COMP_CWORD]}"
  local prev="${COMP_WORDS[COMP_CWORD-1]}"

  if [[ "$COMP_CWORD" == 1 ]]; then
    mapfile -t COMPREPLY < <(compgen -W "doctor install init plugins health graph build diff-lock report update switch-diff clean log top brrt rkn h g b dl r u sd c l t" -- "$cur")
    return
  fi

  if [[ "$COMP_CWORD" == 2 && "$prev" == "install" ]]; then
    mapfile -t COMPREPLY < <(compgen -W "nixos-health nixos-module-graph nixos-build-tui nix-diff-lock system-report nixos-flake-update nixos-switch-diff nixos-clean nixos-log nixos-top brrtfetch rkn-block-checker" -- "$cur")
    return
  fi
}
complete -F _nyx nyx
