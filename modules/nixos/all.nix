{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    brrtfetch
    rkn-block-checker
    nixos-module-graph
    nixos-health
    nix-diff-lock
    nixos-build-tui
    system-report
    nixos-flake-update
    nixos-switch-diff
    nixos-clean
    nixos-log
    nixos-top
    nyx
  ];
}
